// src/app/page.tsx
"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center p-5 font-sans h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <div className="w-full max-w-5xl text-center py-20">
      <h1 className="text-6xl rekalgera font-bold text-white mb-6 ">
        Welcome to EducARe.
      </h1>
      <p className="text-lg studio-sans text-gray-300 mb-4">
        Transforming medical education with immersive, AI-powered learning experiences. Begin your journey into the future of healthcare today!
      </p>
      </div>

      {/* Details Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      <div className="bg-teal-900 p-6 rounded-lg shadow-md text-center">
        <Link href="/chatbot">
        <h2 className="text-xl milker text-white mb-4">Gen AI Chatbot</h2>
        <p className="minigap text-gray-300">
        Discover how our AI-powered chatbot can assist you with personalized, real-time medical education.
        </p>
        </Link>
      </div>
      <div className="bg-teal-900 p-6 rounded-lg shadow-md text-center">
        <Link href="/models">
        <h2 className="text-xl milker text-white mb-4">Immersive 3D Models</h2>
        <p className="minigap text-gray-300">
        Explore complex medical concepts with interactive and immersive 3D models.
        </p>
        </Link>
      </div>
      </div>
    </div>
  );
}
