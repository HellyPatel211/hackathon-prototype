import React, { useState } from "react";
import { analyzeServer, analyzeLocal } from "@/lib/analyzer";
import { useNavigate } from "react-router-dom";

type Question = {
  text: string;
  options: string[];
};

const questions: Question[] = [
  {
    text: "You wake up on a day where everything feels wrong. Your alarm didn't go off, you spilled coffee, and you're running late. What's your most likely reaction?",
    options: [
      "Just accept it's a bad day and try to get through it. ",
      "Get frustrated and irritable, letting it affect the rest of your day. ",
      "Stop, take a deep breath, and try to find one positive thing to focus on.",
      "Feel overwhelmed and want to give up on the day entirely."
    ],
  },
  {
    text: "A friend asks you to join them for a spontaneous evening out, something you'd normally enjoy. What's your first thought?",
    options: ["That sounds great! I could really use a change of pace.",
      "I'm too tired. I'd rather stay home and be alone.",
      "I have too much to do. I can't spare the time.",
      "Will it even be worth it? It feels like too much effort."],
  },
  {
    text: "You're working on a difficult project, and you hit a major roadblock that you can't figure out. How do you respond?",
    options: ["You feel a surge of frustration and want to abandon the project.",
      "You take a break, work on something else, and come back to it later with a fresh mind.",
      "You keep pushing, even if you feel stuck, and become increasingly stressed. ",
      "You feel like a failure and lose confidence in your ability to complete the project."],
  },
];  

type Props = {
  onCancel: () => void;
  onComplete: (result: any) => void;
};

const WellnessCheck: React.FC<Props> = ({ onCancel, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (index: number) => {
    const updated = [...answers, index];
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      finishCheck(updated);
    }
  };

  const finishCheck = async (finalAnswers: number[]) => {
    setLoading(true);
    const answers = finalAnswers;
    console.log("Final answers (number):", finalAnswers);
    // 🔹 Convert indexes → full "Q: ... → selected answer" strings
    const responses = finalAnswers.map((ansIndex, i) => {
      const q = questions[i];
      const answerText = q.options[ansIndex];
      return `Q${i + 1}: ${q.text} → ${answerText}`;
    });

    console.log("Responses (strings):", responses);

    try {
      const result = await analyzeServer(responses); // call backend
      console.log("Server result:", result);
      onComplete(result);
      navigate("/result");
    } catch (err) {
      console.error("Server failed, using fallback:", err);
      const fallback = analyzeLocal(finalAnswers);
      console.log("Fallback result:", fallback);
      onComplete(fallback);
      navigate("/result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      {loading ? (
        <p className="text-lg font-medium animate-pulse">
          ✨ Checking in with your wellness...
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {questions[current].text}
          </h2>
          <div className="space-y-3">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full px-4 py-3 rounded-lg border bg-white hover:bg-gray-100 shadow-sm transition"
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            onClick={onCancel}
            className="mt-6 text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default WellnessCheck;
