import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { HeadlineReveal } from "./HeadlineReveal";

interface HeroProps {
  content: {
    kicker: string;
    title: string;
    mission: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="section hero" id="hero">
      <div className="container hero-grid">
        <div className="reveal-on-scroll">
          <p className="eyebrow">{content.kicker}</p>
          <h1>
            <HeadlineReveal>{content.title}</HeadlineReveal>
          </h1>
          <p className="hero-copy">{content.mission}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/book">{content.primaryCta}</Link>
            <Link className="btn btn-quiet" to="/academy">{content.secondaryCta}</Link>
          </div>
        </div>
        <div className="collage reveal-on-scroll" aria-label="Editorial collage placeholders" style={{ "--reveal-delay": "200ms" } as CSSProperties}>
          <div className="plate plate-portrait" data-label="Precy Alarba">
            <img src="/Profile.jpg" alt="Precy Alarba" />
          </div>
          <div className="plate plate-architecture">
            <img src="/image.png" alt="Graduation pic" />
          </div>
        </div>
      </div>
    </section>
  );
}
