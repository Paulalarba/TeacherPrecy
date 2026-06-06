import { HeadlineReveal } from "./HeadlineReveal";

interface SocialProofProps {
  social_proof: Array<{
    quote: string;
    source: string;
  }>;
}

export function SocialProof({ social_proof }: SocialProofProps) {
  return (
    <section className="section proof">
      <div className="container proof-grid">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Social proof / excerpts</p>
          <h2><HeadlineReveal>Notes from learners who needed clarity.</HeadlineReveal></h2>
        </div>
        <div className="quotes">
          {social_proof.map((item, i) => (
            <div key={item.source} className="reveal-on-scroll" style={{ "--reveal-delay": `${Math.min(i * 80, 400)}ms` } as any}>
              <blockquote key={item.source}>
                {item.quote}
                <cite>{item.source}</cite>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
