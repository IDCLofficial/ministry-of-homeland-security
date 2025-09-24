"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react"; 

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className="fixed bottom-4 right-4">
      {/* Floating button when closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`w-full max-w-md h-[400px] z-20 bg-white border rounded-2xl shadow-lg flex flex-col p-4 transform transition-transform duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg">Chatbot</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto border p-2 rounded-lg space-y-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] ${
                  m.role === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-gray-400 italic">Thinking...</p>}
          </div>

          {/* Input */}
          <div className="flex space-x-2 mt-3">
            <input
              className="flex-1 border rounded-lg p-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
