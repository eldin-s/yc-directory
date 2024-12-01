"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

type Props = {
  text: string;
  className?: string;
  wordDisplayStyle?: "inline-block" | "block";
};

export function SplitText({
  text,
  className,
  wordDisplayStyle = "inline-block",
}: Props) {
  if (!text) return null;

  useGSAP(() => {
    gsap.fromTo(
      ".split-char",
      { visibility: "hidden" },
      {
        visibility: "visible",
        stagger: 0.06,
        delay: 0.5,
      }
    );
  }, []);

  const words = text.split(" ");

  return (
    <div className={clsx("split-text-container", className)}>
      {words.map((word, wordIndex) => (
        <span
          className="split-word"
          style={{ display: wordDisplayStyle, whiteSpace: "pre" }}
          key={`${wordIndex}-${word}`}
        >
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className={`split-char inline-block`}
            >
              {char}
            </span>
          ))}
          {/* Add a space after each word except the last */}
          {wordIndex < words.length - 1 && (
            <span className="split-char">{` `}</span>
          )}
        </span>
      ))}
    </div>
  );
}
