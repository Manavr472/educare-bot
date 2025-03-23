// c:/Users/Dell/Desktop/biochat/src/app/config/genai/route.ts
"use server"
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config()


const apiKey: string | undefined = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Google API key is missing. Please set it in the .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);


  

export async function generateContent(prompt: string): Promise<string | null> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction:""});
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", (error as Error).message);
    return null;
  }
}
