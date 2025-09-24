"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      console.log(res)

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 border rounded-2xl shadow-md flex flex-col space-y-3 bg-white">
      <div className="flex-1 overflow-y-auto h-96 border p-2 rounded-lg space-y-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg ${
              m.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="text-gray-400 italic">Thinking...</p>}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 border rounded-lg p-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
