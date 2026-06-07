import { HeadlineReveal } from "./HeadlineReveal";
import { useEffect, useRef, useState } from "react";

interface SocialProofProps {
  social_proof: Array<{
    quote: string;
    source: string;
  }>;
}

export function SocialProof({ social_proof }: SocialProofProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for entrance animation
  useEffect(() => {
    const section = trackRef.current?.closest(".proof");
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Duplicate items for seamless marquee (need enough to fill the track)
  const marqueeItems = [...social_proof, ...social_proof, ...social_proof, ...social_proof];

  return (
    <section className="section proof">
      <div className="container">
        <div className="proof-header reveal-on-scroll">
          <p className="eyebrow">Social proof / excerpts</p>
          <h2>
            <HeadlineReveal>
              Notes from learners who needed clarity.
            </HeadlineReveal>
          </h2>
        </div>
      </div>

      {/* Full-bleed marquee area */}
      <div
        className={`proof-marquee-wrapper ${isVisible ? "is-entered" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Decorative ambient glow */}
        <div className="proof-ambient-glow" />

        {/* Left/Right fade masks */}
        <div className="proof-fade proof-fade--left" />
        <div className="proof-fade proof-fade--right" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className={`proof-marquee-track ${isPaused ? "is-paused" : ""}`}
        >
          {marqueeItems.map((item, i) => (
            <div
              key={`proof-${i}`}
              className="proof-card"
              style={{ "--card-index": i % social_proof.length } as any}
            >
              {/* Decorative quote glyph */}
              <div className="proof-card-quote-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 7.5H7.5C5.57 7.5 4 9.07 4 11v1.5C4 14.43 5.57 16 7.5 16S11 14.43 11 12.5V7.5z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path
                    d="M20 7.5h-3.5C14.57 7.5 13 9.07 13 11v1.5c0 1.93 1.57 3.5 3.5 3.5S20 14.43 20 12.5V7.5z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </div>

              {/* Gradient border effect */}
              <div className="proof-card-border-glow" aria-hidden="true" />

              <blockquote className="proof-card-quote">
                <p>{item.quote}</p>
                <footer className="proof-card-footer">
                  <div className="proof-card-avatar" aria-hidden="true">
                    {item.source.charAt(0)}
                  </div>
                  <cite>{item.source}</cite>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
