"use client";
import React from "react";
import Chat from "./Components/Chat";
import { useChat } from "ai/react";

const Page: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">AI Chatbot</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Chat
            input={input}
            handleInputChange={handleInputChange}
            handleMessageSubmit={handleSubmit}
            messages={messages}
          />
        </div>
      </main>
    </div>
  );
};

export default Page;
