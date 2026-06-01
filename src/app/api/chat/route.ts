import { NextResponse } from "next/server";
import * as quota from "./quota";

type ChatRequestBody = {
	message?: unknown;
	context?: unknown;
	history?: unknown;
};

export async function POST(request: Request) {
	const apiKey = process.env.HF_TOKEN;
	const modelName = process.env.HF_MODEL ?? "meta-llama/Meta-Llama-3.1-8B-Instruct";

	if (!apiKey) {
		return NextResponse.json(
			{ error: "Missing HF_TOKEN on the server." },
			{ status: 500 },
		);
	}

	let body: ChatRequestBody;

	try {
		body = (await request.json()) as ChatRequestBody;
	} catch {
		return NextResponse.json(
			{ error: "Invalid JSON body." },
			{ status: 400 },
		);
	}

	const message = typeof body.message === "string" ? body.message.trim() : "";
	const context = typeof body.context === "string" ? body.context.trim() : "";
	const history = Array.isArray(body.history)
		? body.history
			.filter(
				(entry): entry is { role: string; text: string } =>
					Boolean(
						entry &&
						typeof entry === "object" &&
						"role" in entry &&
						"text" in entry &&
						typeof entry.role === "string" &&
						typeof entry.text === "string",
					),
			)
			.slice(-6)
		: [];

	if (!message) {
		return NextResponse.json(
			{ error: "Message is required." },
			{ status: 400 },
		);
	}

	const prompt = [
		"You are a concise portfolio assistant for a personal developer website.",
		"Answer using only the supplied portfolio context when possible.",
		"If the answer is not in the context, say you do not have that detail yet and keep the tone helpful.",
		context ? `Portfolio context:\n${context}` : "",
		history.length
			? `Conversation so far:\n${history
				.map((entry) => `${entry.role === "assistant" ? "Assistant" : "User"}: ${entry.text}`)
				.join("\n")}`
			: "",
		`User question: ${message}`,
	].filter(Boolean).join("\n\n");

	const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			method: "POST",
			headers: {
				"Authorization": `Bearer ${apiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: modelName,
				messages: [{ role: "user", content: prompt }],
				max_tokens: 256,
				temperature: 0.4,
			}),
		},
	);

	if (!response.ok) {
		const errorText = await response.text();
		let errorDetails = errorText;

		try {
			const parsed = JSON.parse(errorText) as {
				error?: {
					message?: string;
				};
			};

			errorDetails = parsed.error?.message ?? errorText;
		} catch {
			// Keep the raw response when HF does not return JSON.
		}

		return NextResponse.json(
			{
				error: "Hugging Face request failed.",
				details: errorDetails,
			},
			{ status: response.status },
		);
	}

	const data = (await response.json()) as {
		choices?: Array<{
			message?: {
				content?: string;
			};
		}>;
	};

	let reply = data.choices?.[0]?.message?.content?.trim();

	if (!reply) {
		return NextResponse.json(
			{ error: "Hugging Face returned an empty response." },
			{ status: 502 },
		);
	}

	// If the assistant explicitly says it doesn't have the detail, try a lightweight
	// Wikipedia lookup and re-prompt the model with the web summary. This keeps
	// portfolio-first behavior but allows answering general-knowledge questions.
	const needsWebLookup =
		/i do not have|i don't have|i do not know|i don't know|i have no information/i.test(reply) ||
		reply.length < 30;

	async function tryWikipediaLookup(query: string, ctxt: string | undefined) {
		const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&srlimit=1`;
		const searchRes = await fetch(searchUrl);
		if (!searchRes.ok) return null;
		const searchJson = await searchRes.json();
		const first = searchJson?.query?.search?.[0];
		if (!first || !first.title) return null;
		const title = first.title as string;
		const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
		const summaryRes = await fetch(summaryUrl);
		if (!summaryRes.ok) return null;
		const summaryJson = await summaryRes.json();
		const extract = summaryJson?.extract;
		if (!extract || typeof extract !== "string") return null;

		const webPrompt = [
			"You are a concise portfolio assistant for a personal developer website.",
			"Use the supplied portfolio context when possible. If additional public information is provided from a web source, use it to answer the user succinctly and cite the source.",
			ctxt ? `Portfolio context:\n${ctxt}` : "",
			`Web source (Wikipedia): ${title} — ${extract}`,
			`User question: ${query}`,
		].filter(Boolean).join("\n\n");

		const webResponse = await fetch(
			"https://router.huggingface.co/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Authorization": `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: modelName,
					messages: [{ role: "user", content: webPrompt }],
					max_tokens: 300,
					temperature: 0.35,
				}),
			},
		);

		if (!webResponse.ok) return null;
		const webJson = await webResponse.json() as {
			choices?: Array<{ message?: { content?: string } }>;
		};
		const webReply = webJson?.choices?.[0]?.message?.content?.trim();

		return webReply ?? null;
	}

	if (needsWebLookup && message) {
		try {
			const webReply = await tryWikipediaLookup(message, context || undefined);
			if (webReply) reply = webReply;
		} catch {
			// ignore and keep original reply
		}
	}

	// Decrement demo quota on success and return remaining to client
	const remaining = quota.decrement();
	return NextResponse.json({ reply, remaining });
}