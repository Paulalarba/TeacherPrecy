import { useEffect, useMemo, useState, useRef } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Heart, 
  Accessibility, 
  PenLine, 
  Sparkles,
  Award,
  Users,
  Brain,
  Quote
} from "lucide-react";
import { content } from "./data";

function moveTo(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

function ModeIcon({ mode }: { mode: string }) {
  return mode === "gallery" ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

function BackgroundDecor() {
  return (
    <div className="background-decor" aria-hidden="true">
      <GraduationCap className="decor-icon" style={{ top: "10%", left: "5%", transform: "rotate(-15deg)" }} size={120} />
      <BookOpen className="decor-icon" style={{ top: "25%", right: "8%", transform: "rotate(12deg)" }} size={160} />
      <Heart className="decor-icon" style={{ top: "45%", left: "12%", transform: "rotate(-10deg)" }} size={100} />
      <Accessibility className="decor-icon" style={{ top: "65%", left: "80%", transform: "rotate(20deg)" }} size={140} />
      <PenLine className="decor-icon" style={{ top: "85%", left: "5%", transform: "rotate(-25deg)" }} size={110} />
      <Sparkles className="decor-icon" style={{ top: "92%", left: "85%", transform: "rotate(15deg)" }} size={130} />
      <Award className="decor-icon" style={{ top: "5%", right: "20%", transform: "rotate(10deg)" }} size={90} />
      <Users className="decor-icon" style={{ top: "50%", right: "2%", transform: "rotate(-5deg)" }} size={120} />
      <Brain className="decor-icon" style={{ top: "75%", left: "4%", transform: "rotate(25deg)" }} size={150} />
      <Quote className="decor-icon" style={{ top: "80%", left: "20%", transform: "rotate(-15deg)" }} size={100} />
    </div>
  );
}

function HeadlineReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const lines = children.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="headline-reveal">
          <span style={{ "--reveal-delay": `${delay + i * 60}ms` } as any}>{line}</span>
        </span>
      ))}
    </>
  );
}

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("teacherprecy-mode") || "gallery");
  const [filter, setFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.dataset.mode = mode === "studio" ? "studio" : "gallery";
    localStorage.setItem("teacherprecy-mode", mode);
  }, [mode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filter]); // Re-observe when filter changes modules

  function toggleMode() {
    document.body.classList.add("theme-wipe");
    window.setTimeout(() => {
      setMode((current) => current === "gallery" ? "studio" : "gallery");
      window.setTimeout(() => document.body.classList.remove("theme-wipe"), 460);
    }, 240);
  }

  const activeSlot = content.atelier.slots[selectedSlot];
  const categories = useMemo(() => ["all", ...new Set(content.academy.map((item) => item.category))], []);

  return (
    <div className="shell" ref={scrollRef}>
      <BackgroundDecor />
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand-mark" href="#" onClick={(event) => { event.preventDefault(); moveTo("hero"); }}>
            {content.brand.name} <span>Atelier Zero</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#story" onClick={(event) => { event.preventDefault(); moveTo("story"); }}>Story</a>
            <a href="#academy" onClick={(event) => { event.preventDefault(); moveTo("academy"); }}>Academy</a>
            <a href="#atelier" onClick={(event) => { event.preventDefault(); moveTo("atelier"); }}>Booking</a>
          </nav>
          <div className="nav-actions">
            <button className="btn mode-btn" type="button" onClick={toggleMode} aria-label={`Switch to ${mode === "gallery" ? "studio" : "gallery"} mode`}>
              <ModeIcon mode={mode} />
            </button>
            <button className="btn btn-primary" type="button" onClick={() => moveTo("atelier")}>Reserve time</button>
          </div>
        </div>
      </header>

      <main>
        <section className="section hero" id="hero">
          <div className="container hero-grid">
            <div className="reveal-on-scroll">
              <p className="eyebrow">{content.hero.kicker}</p>
              <h1>
                <HeadlineReveal>{content.hero.title}</HeadlineReveal>
              </h1>
              <p className="hero-copy">{content.hero.mission}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" type="button" onClick={() => moveTo("atelier")}>{content.hero.primaryCta}</button>
                <button className="btn btn-quiet" type="button" onClick={() => moveTo("academy")}>{content.hero.secondaryCta}</button>
              </div>
            </div>
            <div className="collage reveal-on-scroll" aria-label="Editorial collage placeholders" style={{ "--reveal-delay": "200ms" } as any}>
              <div className="plate plate-portrait" data-label="Precy Alarba">
                <img src="/Profile.jpg" alt="Precy Alarba" />
              </div>
              <div className="plate plate-architecture" data-label="Inclusive space"></div>
              <div className="plate plate-notes" data-label="Lesson archive"></div>
              <div className="folio-note">Professional Educator / SPED Mentor</div>
            </div>
          </div>
        </section>

        <section className="section" id="story">
          <div className="container chapter-index">
            <div className="reveal-on-scroll">
              <p className="eyebrow">{content.narrative.label}</p>
              <h2><HeadlineReveal>{content.narrative.headline}</HeadlineReveal></h2>
            </div>
            <div className="reveal-on-scroll" style={{ "--reveal-delay": "100ms" } as any}>
              <p className="narrative-body">{content.narrative.body}</p>
              <div className="narrative-meta" aria-label="Teaching posture">
                <div className="mini-cell"><strong>Method</strong>Structured lessons with review loops.</div>
                <div className="mini-cell"><strong>Pace</strong>Clear checkpoints and calm accountability.</div>
                <div className="mini-cell"><strong>Outcome</strong>Better practice, stronger confidence.</div>
              </div>
            </div>
          </div>
        </section>

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
              {content.academy.map((course, i) => {
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
                      <button className="btn btn-quiet" type="button" onClick={() => moveTo("atelier")}>Discuss this module</button>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section atelier" id="atelier">
          <div className="container atelier-grid">
            <div className="reveal-on-scroll">
              <p className="eyebrow">Atelier / booking studio</p>
              <h2><HeadlineReveal>{content.atelier.headline}</HeadlineReveal></h2>
              <p>{content.atelier.description}</p>
            </div>
            <div className="studio-panel reveal-on-scroll" style={{ "--reveal-delay": "160ms" } as any}>
              <div className="calendar-head">
                <strong>June availability</strong>
                <span className="chip">Mock calendar</span>
              </div>
              <div className="slots">
                {content.atelier.slots.map((slot, index) => (
                  <button
                    key={`${slot.day}-${slot.time}`}
                    type="button"
                    className="slot"
                    disabled={!slot.available}
                    aria-pressed={selectedSlot === index}
                    onClick={() => slot.available && setSelectedSlot(index)}
                  >
                    <span className="slot-day"><span>{slot.day}</span><span>{slot.available ? "Open" : "Held"}</span></span>
                    <strong>{slot.time}</strong>
                    <span>{slot.type}</span>
                  </button>
                ))}
              </div>
              <div className="booking-summary" aria-live="polite">
                {activeSlot.available ? (
                  <span>Selected: {activeSlot.day} at {activeSlot.time}, {activeSlot.type}. A booking form would confirm student goals, session focus, and preferred follow-up.</span>
                ) : (
                  <span>Select an open appointment window to begin.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section proof">
          <div className="container proof-grid">
            <div className="reveal-on-scroll">
              <p className="eyebrow">Social proof / excerpts</p>
              <h2><HeadlineReveal>Notes from learners who needed clarity.</HeadlineReveal></h2>
            </div>
            <div className="quotes">
              {content.social_proof.map((item, i) => (
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

        <section className="section closing">
          <div className="container reveal-on-scroll">
            <p className="eyebrow">Begin with a focused session</p>
            <h2><HeadlineReveal>Bring the question. Leave with a plan.</HeadlineReveal></h2>
            <p>Reserve time with TeacherPrecy for mentorship, writing review, module guidance, or a portfolio-focused studio session.</p>
            <button className="btn btn-primary" type="button" onClick={() => moveTo("atelier")}>Choose an appointment</button>
          </div>
        </section>
      </main>

      <footer className="footer reveal-on-scroll">
        <div className="container footer-inner">
          <span>{content.brand.name}, {content.brand.person}</span>
          <span>{content.brand.identity}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
