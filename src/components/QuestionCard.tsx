// src/components/QuestionCard.tsx
import React from "react";
import type { Question } from "../lib/questions";

type Props = {
  question: Question;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
};

export default function QuestionCard({ question, selectedIndex, onSelect }: Props) {
  return (
    <div style={{ padding: 20, borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.06)", background: "white" }}>
      <h3 style={{ margin: 0, marginBottom: 12 }}>{question.prompt}</h3>
      <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
        {question.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 10,
                border: isSelected ? "2px solid #4f46e5" : "1px solid #e5e7eb",
                background: isSelected ? "rgba(79,70,229,0.06)" : "white",
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              <span style={{ fontSize: 20 }}>{opt.emoji ?? ""}</span>
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
