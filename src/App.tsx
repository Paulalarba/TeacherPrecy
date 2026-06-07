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
import { Portal } from "./components/Portal";
import { Dashboard } from "./components/Dashboard";
import { Gallery } from "./components/Gallery";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function RevealObserver({ depend }: { depend?: any }) {
  const { key } = useLocation();
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
  }, [depend, key]);
  return null;
}

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("teacherprecy-mode") || "gallery");
  const [filter, setFilter] = useState("all");
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem("teacherprecy-user");
    return saved ? JSON.parse(saved) : null;
  });

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

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    localStorage.setItem("teacherprecy-user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("teacherprecy-user");
  };

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
          user={user}
          onLogout={handleLogout}
        />

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <RevealObserver />
                <Hero content={content.hero} />
                <Story content={content} />
                <Gallery />
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
            <Route path="/portal" element={
              <>
                <RevealObserver />
                <Portal user={user} onLogin={handleLogin} />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <RevealObserver />
                <Dashboard 
                  user={user} 
                  onLogout={handleLogout} 
                  academy={content.academy} 
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
