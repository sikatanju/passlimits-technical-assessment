import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: NextRequest) {
    try {
        const { task, prompt } = await request.json();
        if (!task || !prompt) {
            return NextResponse.json(
                { error: "Task and Prompt are required" },
                { status: 400 }
            );
        }
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });

        const response = result.text;
        return NextResponse.json({
            subtasks: response,
            task: task,
        });
    } catch (error) {
        console.error("Error generating subtasks:", error);
        return NextResponse.json(
            { error: "Failed to generate subtasks" },
            { status: 500 }
        );
    }
}
