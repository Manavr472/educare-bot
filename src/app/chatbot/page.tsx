// src/app/page.tsx
"use client"
import Link from "next/link";
import { generateContent } from "../config/genai/route";
import { useState } from "react";


export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState<
    { user: string; ai: string | null }[]
  >([]);

  const handleGenerate = async () => {
    const aiResponse = await generateContent(prompt);
    setConversation((prev) => [
      ...prev,
      { user: prompt, ai: aiResponse },
    ]);
    setPrompt("");
  };

  return (
    <div className="flex flex-col items-center p-5 font-sans h-screen bg-black text-white">
      <div className="w-full max-w-5xl text-center py-5">
        <Link href="/" className="text-6xl rekalgera font-bold text-white mb-6">
        EducARe.</Link>
      </div>
      <div className="w-full max-w-3xl flex flex-col flex-grow bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="flex-grow p-5 overflow-y-auto">
        {conversation.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-start justify-end mb-2">
          <div className="bg-blue-700 text-white p-3 rounded-lg max-w-xs">
            <p className="text-sm">{entry.user}</p>
          </div>
          </div>
          <div className="flex items-start">
          <div className="bg-gray-800 text-gray-300 p-3 rounded-lg max-w-md">
            <p className="text-sm">{entry.ai || "Waiting for response..."}</p>
          </div>
          </div>
        </div>
        ))}
      </div>
      <div className="border-t border-gray-800 p-4">
        <textarea
        className="w-full h-20 p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message here..."
        />
        <button
        className="mt-3 w-full px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-base"
        onClick={handleGenerate}
        >
        Send
        </button>
      </div>
      </div>
    </div>
  );
}
