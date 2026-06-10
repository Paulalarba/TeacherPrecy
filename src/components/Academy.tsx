import { type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { HeadlineReveal } from "./HeadlineReveal";

interface AcademyProps {
  user: { name: string; email: string } | null;
  academy: Array<{
    id: string;
    title: string;
    format: string;
    category: string;
    description: string;
  }>;
  categories: string[];
  filter: string;
  setFilter: (filter: string) => void;
}

export function Academy({ user, academy, categories, filter, setFilter }: AcademyProps) {
  return (
    <section className="section academy" id="academy">
      <div className="container">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Academy / curated modules</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ maxWidth: "600px" }}><HeadlineReveal>Courses treated as edited learning collections.</HeadlineReveal></h2>
            {!user && (
              <div className="login-tip" style={{ 
                background: "var(--line)", 
                padding: "12px 20px", 
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "var(--space-2)"
              }}>
                <span style={{ color: "var(--voice)" }}>Want to save your progress?</span>
                <Link to="/portal" className="btn btn-quiet" style={{ padding: "4px 12px", minHeight: "32px", fontSize: "12px" }}>Sign In</Link>
              </div>
            )}
          </div>
        </div>
        <div className="module-toolbar reveal-on-scroll" role="toolbar" aria-label="Filter modules" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
          {categories.map((category) => (
            <button
              className="btn filter-btn"
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === "all" ? "All modules" : category}
            </button>
          ))}
        </div>
        <div className="modules">
          {academy.map((course, i) => {
            const isMuted = filter !== "all" && filter !== course.category;
            return (
              <div className={`reveal-on-scroll${isMuted ? " is-muted" : ""}`} key={course.title} style={{ "--reveal-delay": `${Math.min(i * 80, 400)}ms` } as CSSProperties}>
                <article className="module">
                  <div>
                    <div className="module-visual" aria-hidden="true"></div>
                    <h3>{course.title}</h3>
                    <div className="format">{course.format}</div>
                    <p>{course.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px", marginTop: "var(--space-4)" }}>
                    <Link className="btn btn-primary" to={`/academy/${course.id}`} style={{ flex: 1 }}>Start Learning</Link>
                    <Link className="btn btn-quiet" to="/book" style={{ padding: "8px" }} title="Discuss this module">
                      Contact
                    </Link>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
