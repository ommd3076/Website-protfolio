import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { prefersReduced } from "../site/motion";

export function TextStream({
  text,
  speed = 0.02,
  delay = 0.1,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState(prefersReduced() ? text : "");

  useGSAP(
    () => {
      if (prefersReduced()) {
        setDisplayedText(text);
        return;
      }

      let currentLength = 0;
      const totalChars = text.length;

      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: totalChars,
        duration: totalChars * speed,
        delay,
        ease: "none",
        onUpdate: () => {
          const l = Math.floor(obj.val);
          if (l !== currentLength) {
            currentLength = l;
            setDisplayedText(text.slice(0, l));
          }
        },
      });

      return () => {
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [text, speed, delay] },
  );

  return (
    <span ref={containerRef} className={`font-mono ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayedText}
        {displayedText.length < text.length && !prefersReduced() && (
          <span className="inline-block w-1.5 h-3.5 bg-neutral-400 ml-0.5 animate-pulse align-middle" />
        )}
      </span>
    </span>
  );
}
