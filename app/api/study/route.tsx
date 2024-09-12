import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API??"");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", 
    systemInstruction: "You are Sanskriti, a story-teller and a historian. Do not reveal that you're an AI. Keep your stories simple and basic. You narrate the history of monuments to the viewers"
 });

async function generate(prompt: string) {
    try{
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        return text;
    } catch (e) {
        return null;
    }
}

export async function POST(req:NextRequest, res:NextResponse) {
    let body = await req.json();

    let result = await generate(body['prompt']);
    return NextResponse.json({
        status: result === null ? 500 : 200,
        result: result === null ? "" : result
    });
}