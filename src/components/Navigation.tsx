import { Link, useLocation } from "react-router-dom";
import { moveTo, ModeIcon } from "./Utils";

interface NavigationProps {
  brandName: string;
  mode: string;
  toggleMode: () => void;
}

export function Navigation({ brandName, mode, toggleMode }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link 
          className="brand-mark" 
          to="/" 
          onClick={() => isHome && moveTo("hero")}
        >
          {brandName} <span>Atelier Zero</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {isHome ? (
            <a href="#story" onClick={(event) => { event.preventDefault(); moveTo("story"); }}>Story</a>
          ) : (
            <Link to="/">Home</Link>
          )}
          <Link to="/academy">Academy</Link>
          <Link to="/book">Booking</Link>
        </nav>
        <div className="nav-actions">
          <button className="btn mode-btn" type="button" onClick={toggleMode} aria-label={`Switch to ${mode === "gallery" ? "studio" : "gallery"} mode`}>
            <ModeIcon mode={mode} />
          </button>
          <Link className="btn btn-primary" to="/book">Reserve time</Link>
        </div>
      </div>
    </header>
  );
}
