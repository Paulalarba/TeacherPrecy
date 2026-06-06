import { useEffect, useMemo, useState } from "react";
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

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("teacherprecy-mode") || "gallery");
  const [filter, setFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.mode = mode === "studio" ? "studio" : "gallery";
    localStorage.setItem("teacherprecy-mode", mode);
  }, [mode]);

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
    <div className="shell">
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand-mark" href="#" onClick={(event) => { event.preventDefault(); moveTo("hero"); }}>
            {content.brand.name} <span>Atelier Zero</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#story" onClick={(event) => { event.preventDefault(); moveTo("story"); }}>Story</a>
            <a href="#portfolio" onClick={(event) => { event.preventDefault(); moveTo("portfolio"); }}>Portfolio</a>
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
            <div className="reveal">
              <p className="eyebrow">{content.hero.kicker}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-copy">{content.hero.mission}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" type="button" onClick={() => moveTo("atelier")}>{content.hero.primaryCta}</button>
                <button className="btn btn-quiet" type="button" onClick={() => moveTo("academy")}>{content.hero.secondaryCta}</button>
              </div>
            </div>
            <div className="collage reveal" aria-label="Editorial collage placeholders">
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
            <div>
              <p className="eyebrow">{content.narrative.label}</p>
              <h2>{content.narrative.headline}</h2>
            </div>
            <div>
              <p className="narrative-body">{content.narrative.body}</p>
              <div className="narrative-meta" aria-label="Teaching posture">
                <div className="mini-cell"><strong>Method</strong>Structured lessons with review loops.</div>
                <div className="mini-cell"><strong>Pace</strong>Clear checkpoints and calm accountability.</div>
                <div className="mini-cell"><strong>Outcome</strong>Better practice, stronger confidence.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section portfolio" id="portfolio">
          <div className="container">
            <div className="portfolio-head">
              <div>
                <p className="eyebrow">Portfolio / index</p>
                <h2>Proof of practice, arranged as a working archive.</h2>
              </div>
              <p>Credentials, expertise, and mentorship offerings are placed as editorial artifacts: readable, structured, and intentionally uneven.</p>
            </div>
            <div className="bento">
              <article className="tile tile-large">
                <span className="tagline">Credentials table</span>
                <h3>Professional educator with a coaching studio mindset.</h3>
                <ul className="credential-list">
                  {content.credentials.map((item) => (
                    <li key={item.area}><span>{item.area}</span><p>{item.detail}</p></li>
                  ))}
                </ul>
              </article>
              <article className="tile tile-tall">
                <span className="tagline">Expertise glossary</span>
                <h3>A curated index of learner support.</h3>
                <p>Each capability is a repeatable teaching move, not a decorative service label.</p>
                <div className="expertise-cloud">
                  {content.expertise.map((item) => <span className="chip" key={item}>{item}</span>)}
                </div>
              </article>
              <article className="tile tile-small">
                <span className="tagline">Mentorship</span>
                <h3>Hourly to monthly guidance.</h3>
                <p>Flexible coaching rhythms for students who need targeted feedback or sustained accountability.</p>
              </article>
              <article className="tile tile-small">
                <span className="tagline">Online platform</span>
                <h3>Learning designed for access.</h3>
                <p>Digital modules keep the rigor visible with clean sequencing, session notes, and practical next steps.</p>
              </article>
              <article className="tile tile-small">
                <span className="tagline">Academic portfolio</span>
                <h3>Evidence over ornament.</h3>
                <p>The work is framed through credentials, teaching posture, learner outcomes, and course craft.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section academy" id="academy">
          <div className="container">
            <p className="eyebrow">Academy / curated modules</p>
            <h2>Courses treated as edited learning collections.</h2>
            <div className="module-toolbar" role="toolbar" aria-label="Filter modules">
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
              {content.academy.map((course) => {
                const isMuted = filter !== "all" && filter !== course.category;
                return (
                  <article className={`module${isMuted ? " is-muted" : ""}`} key={course.title}>
                    <div>
                      <div className="module-visual" aria-hidden="true"></div>
                      <h3>{course.title}</h3>
                      <div className="format">{course.format}</div>
                      <p>{course.description}</p>
                    </div>
                    <button className="btn btn-quiet" type="button" onClick={() => moveTo("atelier")}>Discuss this module</button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section atelier" id="atelier">
          <div className="container atelier-grid">
            <div>
              <p className="eyebrow">Atelier / booking studio</p>
              <h2>{content.atelier.headline}</h2>
              <p>{content.atelier.description}</p>
            </div>
            <div className="studio-panel">
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
            <div>
              <p className="eyebrow">Social proof / excerpts</p>
              <h2>Notes from learners who needed clarity.</h2>
            </div>
            <div className="quotes">
              {content.social_proof.map((item) => (
                <blockquote key={item.source}>
                  {item.quote}
                  <cite>{item.source}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="section closing">
          <div className="container">
            <p className="eyebrow">Begin with a focused session</p>
            <h2>Bring the question. Leave with a plan.</h2>
            <p>Reserve time with TeacherPrecy for mentorship, writing review, module guidance, or a portfolio-focused studio session.</p>
            <button className="btn btn-primary" type="button" onClick={() => moveTo("atelier")}>Choose an appointment</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>{content.brand.name}, {content.brand.person}</span>
          <span>{content.brand.identity}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
