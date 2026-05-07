import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const fixedBody = { ...body, model: "claude-sonnet-4-5" };
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(fixedBody),
    });
    const data = await response.json();
    console.log("Anthropic response status:", response.status);
    return NextResponse.json(data);
  } catch (err) {
    console.log("Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}