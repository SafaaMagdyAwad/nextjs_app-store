"use client";
import { useState, ReactNode } from "react";

type TextReducerProps = {
  children: ReactNode;
  limit?: number;
};

export default function TextReducer({ children, limit = 100 }: TextReducerProps) {
  const [expanded, setExpanded] = useState(false);
  const text = typeof children === "string" ? children : "";

  const isLong = text.length > limit;
  const displayedText = expanded || !isLong ? text : text.slice(0, limit) + "...";

  return (
    <div className="text-gray-800">
      <p>{displayedText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:underline mt-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
