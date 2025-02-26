import React, { FormEvent, ChangeEvent } from "react";
import { Message } from "ai/react";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
}) => {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                msg.role === "assistant"
                  ? "bg-white text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="font-bold mb-1">
                {msg.role === "assistant" ? "🤖 AI" : "🧑‍💻 You"}
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleMessageSubmit} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Send
          </button>
        </form>
        <span className="text-xs text-gray-500 mt-2 block text-center">
          Press Enter to send
        </span>
      </div>
    </div>
  );
};

export default Chat;
