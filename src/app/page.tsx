"use client";
import React, { useState } from "react";
import Chat from "./Components/Chat";
import { Message } from "ai/react";

const Page: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });
      const data = await response.json();
      setMessages([...messages, newMessage, ...data.messages]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
