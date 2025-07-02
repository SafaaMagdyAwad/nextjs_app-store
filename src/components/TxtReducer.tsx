'use client';
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
    <span className="text-gray-800">
      {displayedText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:underline ml-2"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </span>
  );
}
