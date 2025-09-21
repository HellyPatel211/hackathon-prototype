import React, { useState } from "react";
import type { AnalysisResult } from "../lib/analyzer";

type Props = {
  result: AnalysisResult;
  onRestart: () => void;
};

type ChatMessage = { from: "user" | "bot"; text: string };

export default function Result({ result, onRestart }: Props) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: "Hi — I’m here to support you. Tell me how you’re feeling, or ask for a quick coping tip.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { from: "user" as const, text: input.trim() };
    setChatMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] }),
      });

      const data = await res.json();
      const botMsg = {
        from: "bot" as const,
        text: data.reply || "I'm here 💙",
      };
      setChatMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "⚠️ Sorry, I couldn't connect. Try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ LOW-RISK UI
  if (result.riskLevel === "low") {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">
          You're in the low-risk range 💙
        </h2>
        <p className="text-gray-700 mb-4">
          Based on your answers, you’re showing signs of coping. Below is a
          friendly chat assistant for quick tips and journaling.
        </p>

        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
          <div className="max-h-60 overflow-y-auto space-y-2">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    m.from === "bot"
                      ? "bg-indigo-50 text-gray-800"
                      : "bg-green-100 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-lg text-sm bg-indigo-50 text-gray-500 italic animate-pulse">
                  typing...
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write to the assistant…"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onRestart}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Take the check again
          </button>
        </div>
      </div>
    );
  }

  // ✅ HIGH-RISK UI
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-2">
        We recommend seeking extra support ❤️
      </h2>
      <p className="mb-4">{result.feedback}</p>
      <p className="text-gray-700 mb-4">
        Your answers indicate you may be at higher risk. This prototype is not a
        diagnosis. If you are in danger or have thoughts of harming yourself,
        please contact local emergency services immediately.
      </p>

      <div className="bg-orange-50 border border-yellow-300 rounded-lg p-4">
        <h4 className="font-semibold mb-2">Immediate resources</h4>
        <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
          <li>
            <strong>Emergency (India example)</strong>: 112 (or local emergency
            number)
          </li>
          <li>
            National helpline / mental health organizations (add
            local/region-specific helplines in final app)
          </li>
        </ul>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Contact a professional (demo)
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Take the check again
          </button>
        </div>
      </div>
    </div>
  );
}
