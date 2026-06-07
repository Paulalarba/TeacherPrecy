import { HeadlineReveal } from "./HeadlineReveal";

interface StoryProps {
  content: {
    narrative: {
      label: string;
      headline: string;
      body: string;
    };
    professional_expertise: string;
    expertise: string[];
  };
}

export function Story({ content }: StoryProps) {
  return (
    <section className="section" id="story" style={{ borderTop: "1px solid var(--border)", paddingTop: "var(--space-20)" }}>
      <div className="container chapter-index">
        {/* Left Column: Story & Background */}
        <div className="reveal-on-scroll">
          <p className="eyebrow">{content.narrative.label}</p>
          <h2 style={{ maxWidth: "100%" }}><HeadlineReveal>{content.narrative.headline}</HeadlineReveal></h2>
          <p 
            className="story-body" 
            style={{ 
              marginTop: "var(--space-6)", 
              fontSize: "var(--text-lg)", 
              lineHeight: "var(--leading-body)", 
              color: "var(--voice)" 
            }}
          >
            {content.narrative.body}
          </p>
        </div>

        {/* Right Column: Professional Expertise & Skills Cloud */}
        <div className="reveal-on-scroll" style={{ "--reveal-delay": "150ms" } as any}>
          <div style={{ marginBottom: "var(--space-12)" }}>
            <p className="eyebrow" style={{ marginBottom: "var(--space-3)" }}>Professional Expertise</p>
            <p 
              style={{ 
                fontSize: "var(--text-base)", 
                lineHeight: "var(--leading-body)", 
                color: "var(--voice)" 
              }}
            >
              {content.professional_expertise}
            </p>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: "var(--space-3)" }}>Skills & Expertise</p>
            <div className="expertise-cloud" style={{ marginTop: "var(--space-2)" }}>
              {content.expertise.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
