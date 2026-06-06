import { Link } from "react-router-dom";
import { HeadlineReveal } from "./HeadlineReveal";

interface AcademyProps {
  academy: Array<{
    title: string;
    format: string;
    category: string;
    description: string;
  }>;
  categories: string[];
  filter: string;
  setFilter: (filter: string) => void;
}

export function Academy({ academy, categories, filter, setFilter }: AcademyProps) {
  return (
    <section className="section academy" id="academy">
      <div className="container">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Academy / curated modules</p>
          <h2><HeadlineReveal>Courses treated as edited learning collections.</HeadlineReveal></h2>
        </div>
        <div className="module-toolbar reveal-on-scroll" role="toolbar" aria-label="Filter modules" style={{ "--reveal-delay": "80ms" } as any}>
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
              <div className={`reveal-on-scroll${isMuted ? " is-muted" : ""}`} key={course.title} style={{ "--reveal-delay": `${Math.min(i * 80, 400)}ms` } as any}>
                <article className="module">
                  <div>
                    <div className="module-visual" aria-hidden="true"></div>
                    <h3>{course.title}</h3>
                    <div className="format">{course.format}</div>
                    <p>{course.description}</p>
                  </div>
                  <Link className="btn btn-quiet" to="/book">Discuss this module</Link>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
