import { type CSSProperties } from "react";

export function HeadlineReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const lines = children.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="headline-reveal">
          <span style={{ "--reveal-delay": `${delay + i * 60}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </>
  );
}
