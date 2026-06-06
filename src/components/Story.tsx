import { HeadlineReveal } from "./HeadlineReveal";

interface StoryProps {
  content: {
    label: string;
    headline: string;
    body: string;
  };
}

export function Story({ content }: StoryProps) {
  return (
    <section className="section" id="story">
      <div className="container chapter-index">
        <div className="reveal-on-scroll">
          <p className="eyebrow">{content.label}</p>
          <h2><HeadlineReveal>{content.headline}</HeadlineReveal></h2>
        </div>
        <div className="reveal-on-scroll" style={{ "--reveal-delay": "100ms" } as any}>
          <p className="narrative-body">{content.body}</p>
          <div className="narrative-meta" aria-label="Teaching posture">
            <div className="mini-cell"><strong>Method</strong>Structured lessons with review loops.</div>
            <div className="mini-cell"><strong>Pace</strong>Clear checkpoints and calm accountability.</div>
            <div className="mini-cell"><strong>Outcome</strong>Better practice, stronger confidence.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
