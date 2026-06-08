import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { moveTo, ModeIcon } from "./Utils";

interface NavigationProps {
  brandName: string;
  mode: string;
  toggleMode: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function Navigation({ brandName, mode, toggleMode, user, onLogout }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link 
          className="brand-mark" 
          to="/" 
          onClick={() => isHome && moveTo("hero")}
        >
          <img src="/Logo.png" alt={brandName} className="header-logo" />
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link to="/" onClick={() => isHome && moveTo("hero")}>Home</Link>
          <Link to="/academy">Academy</Link>
          <Link to="/book">Booking</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </nav>
        <div className="nav-actions">
          <button className="btn mode-btn" type="button" onClick={toggleMode} aria-label={`Switch to ${mode === "gallery" ? "studio" : "gallery"} mode`}>
            <ModeIcon mode={mode} />
          </button>
          
          {user ? (
            <>
              <Link className="btn btn-quiet" to="/dashboard">Dashboard</Link>
              <button 
                className="btn" 
                type="button" 
                onClick={onLogout} 
                style={{ border: "none", color: "var(--danger)", cursor: "pointer", background: "none", fontWeight: 500 }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/portal?mode=signup">Join Now</Link>
          )}
        </div>
      </div>
      {/* Scroll progress bar */}
      <div 
        className="nav-progress-bar" 
        style={{ width: `${scrollProgress}%` }} 
      />
    </header>
  );
}

