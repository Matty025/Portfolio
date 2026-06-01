import { NextResponse } from "next/server";

// Simple in-memory quota for demo purposes.
// Configure initial quota with GEMINI_DEMO_QUESTIONS in .env.local (defaults to 5).
let remaining = Number(process.env.GEMINI_DEMO_QUESTIONS ?? 5);

export function GET() {
	return NextResponse.json({ remaining });
}

export function decrement() {
	if (remaining > 0) remaining -= 1;
	return remaining;
}

export function setQuota(n: number) {
	remaining = Math.max(0, Math.floor(n));
	return remaining;
}
