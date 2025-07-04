import { GoogleGenAI } from "@google/genai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
});
