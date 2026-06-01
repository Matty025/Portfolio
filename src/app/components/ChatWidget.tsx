"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

type ChatMessage = {
	id: string;
	role: "user" | "assistant";
	text: string;
};

const quickPrompts = [
	"Tell me about Mathew's background.",
	"What projects has Mathew built?",
	"What skills does Mathew use most?",
	"What work experience does Mathew have?",
	"How can I contact Mathew?",
];

const portfolioContext = [
	"Name: Mathew Rafael Bulawan.",
	"Age: 23.",
	"Date of birth: October 11, 2002.",
	"Role: Full-Stack Developer.",
	"Address: Primeworld, Rafaela Homes, Baliwag, Bulacan 3006.",
	"Home address: Naga City, Camarines Sur.",
	"Phone: 0969-406-3677.",
	"Email: mathewbulawan@gmail.com.",
	"GitHub: github.com/Matty025.",
	"Education: Baliwag University, Bachelor of Science in Information Technology, Major in Web and App Development.",
	"Relevant coursework and certifications: React.js, Next.js, iOS and Android Programming, MySQL, PostgreSQL, InfluxDB, Cybersecurity Fundamentals, CCNA Introduction to Networks, AWS Academy Cloud Foundations, and Microsoft Office Specialist Excel Associate.",
	"Experience: Full-stack Developer Intern at School Division Office City of Baliwag from Oct 2025 to Feb 2026; built MSSS, a procurement web app, across 600 hours.",
	"Previous experience: Customer Service Representative at Sutherland Global Services in Pili, Camarines Sur from Nov 2021 to Aug 2022.",
	"Technical skills: JavaScript, Python, TypeScript, Java (familiar), React.js, Next.js, Node.js, Express.js, Flask, PostgreSQL, MySQL, InfluxDB, Supabase, scikit-learn, pandas, Docker, Vercel, Render, AWS, Microsoft Azure, Git, GitHub, Postman, and MQTT.",
	"Projects: EIMCognito is a web-based gamified learning platform for EIM and solar PV students with roles for superadmin, teachers/admins, and students, plus missions, quizzes, leaderboards, coin rewards, and a reward shop.",
	"Projects: Market Scoping & Survey System is a full-stack procurement platform for the Baliwag School Division Office with vendor management, purchase request processing, JWT auth, role-based access control, email notifications, and document workflows.",
	"Projects: Fuel Injected Motorcycle Maintenance Device is an IoT predictive maintenance platform using OBD-II data, MQTT streaming, Python ML anomaly detection, Flask API, InfluxDB storage, and a React dashboard for multi-motorcycle management.",
	"Certifications and recognition: AWS Academy Graduate Cloud Foundations, CCNA Introduction to Networks, Network Addressing and Basic Troubleshooting, Introduction to Cybersecurity, Data Science Essentials with Python, Microsoft Office Specialist Excel Associate, and Certificate of Utilization.",
].join(" ");

const initialMessages: ChatMessage[] = [
	{
		id: "welcome",
		role: "assistant",
		text: "Hi, I am E.D.I.TH. I can answer questions about Mathew, his resume, projects, skills, work experience, and contact details.",
	},
];

export default function ChatWidget() {
	const [open, setOpen] = useState(false);
	const [remaining, setRemaining] = useState<number | null>(null);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
	const messageListRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const history = useMemo(
		() =>
			messages.map((message) => ({
				role: message.role,
				text: message.text,
			})),
		[messages],
	);

	function handleQuickPrompt(prompt: string) {
		setOpen(true);
		setInput(prompt);
		setError(null);
		inputRef.current?.focus();
	}

	useEffect(() => {
		if (!open) return;
		inputRef.current?.focus();
	}, [open]);

	useEffect(() => {
		async function loadQuota() {
			try {
				const res = await fetch("/api/chat/quota");
				if (res.ok) {
					const data = await res.json();
					setRemaining(typeof data.remaining === "number" ? data.remaining : null);
				}
			} catch {
				// ignore
			}
		}

		loadQuota();
	}, []);

	useEffect(() => {
		const el = messageListRef.current;
		if (el) {
			el.scrollTop = el.scrollHeight;
		}
	}, [messages, open]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const trimmed = input.trim();
		if (!trimmed || loading) return;

		setError(null);
		setLoading(true);
		setInput("");

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			text: trimmed,
		};

		setMessages((current) => [...current, userMessage]);

		function formatChatError(rawMessage: string) {
			const normalized = rawMessage.toLowerCase();
			if (
				normalized.includes("quota") ||
				normalized.includes("rate limit") ||
				normalized.includes("too many requests") ||
				normalized.includes("free tier")
			) {
				return "Try again tomorrow. This model uses the free tier and has limited usage.";
			}

			return rawMessage;
		}

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: trimmed,
					context: portfolioContext,
					history,
				}),
			});

			const data = (await response.json()) as { reply?: string; error?: string; details?: string; remaining?: number };

			if (!response.ok) {
				throw new Error(formatChatError(data.details ?? data.error ?? "Unable to reach the chatbot."));
			}

			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					text: data.reply ?? "I can help with Mathew's background, projects, skills, work experience, certifications, and contact details. Try one of the prompts below.",
				},
			]);

			if (typeof data.remaining === "number") setRemaining(data.remaining);
		} catch (submitError) {
			const message = submitError instanceof Error ? submitError.message : "Something went wrong.";
			setError(message);
			setMessages((current) => [
				...current,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					text: "I could not get a response right now, but you can still ask about Mathew's projects, skills, experience, education, or contact details using the prompts below.",
				},
			]);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className={styles.widget}>
			{open ? (
				<section className={styles.panel} aria-label="EDITH portfolio assistant">
					<div className={styles.panelHeader}>
						<div>
							<p className={styles.panelTitle}>E.D.I.TH</p>
                            <p className={styles.panelSubtitle}>I answer questions about Mathew and his portfolio and search the web if needed.</p>							{remaining !== null ? (
								<p className={styles.quota}>Questions left: {remaining}</p>
							) : null}
						</div>
						<button
							type="button"
							className={styles.closeButton}
							onClick={() => setOpen(false)}
							aria-label="Close chat"
						>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
							</svg>
						</button>
					</div>

					<div className={styles.messages} ref={messageListRef}>
						{messages.map((message) => (
							<div
								key={message.id}
								className={`${styles.messageRow} ${
									message.role === "user" ? styles.userRow : styles.assistantRow
								}`}
							>
								<div className={`${styles.bubble} ${message.role === "user" ? styles.userBubble : styles.assistantBubble}`}>
									{message.text}
								</div>
							</div>
						))}
						{loading ? <div className={styles.typing}>Thinking...</div> : null}

						<div className={styles.promptGroup}>
							<p className={styles.promptLabel}>Try asking</p>
							<div className={styles.promptGrid}>
								{quickPrompts.map((prompt) => (
									<button
										key={prompt}
										type="button"
										className={styles.promptChip}
										onClick={() => handleQuickPrompt(prompt)}
									>
										{prompt}
									</button>
								))}
							</div>
						</div>
					</div>

					{error ? <p className={styles.error}>{error}</p> : null}

					<form className={styles.form} onSubmit={handleSubmit}>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(event) => setInput(event.target.value)}
							placeholder="Ask something..."
							className={styles.input}
							aria-label="Chat message"
						/>
						<button type="submit" className={styles.sendButton} disabled={loading || !input.trim()}>
							Send
						</button>
					</form>
				</section>
			) : null}

			<button
				type="button"
				className={styles.launcher}
				onClick={() => setOpen((current) => !current)}
				aria-label={open ? "Close chat" : "Open chat"}
				aria-expanded={open}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<path
						d="M7 18.5 4 20V6.8A2.8 2.8 0 0 1 6.8 4h10.4A2.8 2.8 0 0 1 20 6.8v6.4A2.8 2.8 0 0 1 17.2 16H9.2L7 18.5Z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.7"
						strokeLinejoin="round"
					/>
					<path d="M8.3 8.9h7.4M8.3 11.8h5.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
				</svg>
			</button>
		</div>
	);
}