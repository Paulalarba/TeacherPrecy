import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { content } from "./data";
import { BackgroundDecor } from "./components/BackgroundDecor";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Story } from "./components/Story";
import { Academy } from "./components/Academy";
import { Atelier } from "./components/Atelier";
import { SocialProof } from "./components/SocialProof";
import { Closing } from "./components/Closing";
import { Footer } from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RevealObserver({ depend }: { depend?: any }) {
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
  }, [depend]);
  return null;
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

  const categories = useMemo(() => ["all", ...new Set(content.academy.map((item) => item.category))], []);

  return (
    <Router>
      <ScrollToTop />
      <div className="shell">
        <BackgroundDecor />
        
        <Navigation 
          brandName={content.brand.name} 
          mode={mode} 
          toggleMode={toggleMode} 
        />

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <RevealObserver />
                <Hero content={content.hero} />
                <Story content={content.narrative} />
                <SocialProof social_proof={content.social_proof} />
                <Closing />
              </>
            } />
            <Route path="/academy" element={
              <>
                <RevealObserver depend={filter} />
                <Academy 
                  academy={content.academy} 
                  categories={categories} 
                  filter={filter} 
                  setFilter={setFilter} 
                />
              </>
            } />
            <Route path="/book" element={
              <>
                <RevealObserver />
                <Atelier 
                  atelier={content.atelier} 
                  selectedSlot={selectedSlot} 
                  setSelectedSlot={setSelectedSlot} 
                />
              </>
            } />
          </Routes>
        </main>

        <Footer brand={content.brand} />
      </div>
    </Router>
  );
}

export default App;
