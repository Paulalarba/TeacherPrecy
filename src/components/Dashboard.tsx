import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  LogOut, 
  Compass
} from "lucide-react";

interface DashboardProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
  academy: Array<{
    title: string;
    format: string;
    category: string;
    description: string;
  }>;
}

export function Dashboard({ user, onLogout, academy }: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect to portal if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/portal");
    }
  }, [user, navigate]);

  if (!user) return null;

  // Mock progress values
  const progressMap: Record<string, number> = {
    "Foundations of disciplined study": 75,
    "Academic writing studio": 30,
    "Portfolio and presentation lab": 0
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="container reveal" style={{ paddingBlock: "var(--space-8)" }}>
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="dashboard-profile">
            <div className="dashboard-avatar">
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginTop: "var(--space-2)" }}>{user.name}</h3>
            <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>{user.email}</span>
          </div>

          <nav className="dashboard-menu">
            <button 
              type="button" 
              className={`dashboard-menu-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <Compass size={18} />
              <span>Overview</span>
            </button>
            <button 
              type="button" 
              className={`dashboard-menu-item ${activeTab === "modules" ? "active" : ""}`}
              onClick={() => setActiveTab("modules")}
            >
              <BookOpen size={18} />
              <span>My Modules</span>
            </button>
            <button 
              type="button" 
              className={`dashboard-menu-item ${activeTab === "sessions" ? "active" : ""}`}
              onClick={() => setActiveTab("sessions")}
            >
              <Calendar size={18} />
              <span>Sessions</span>
            </button>
            <button 
              type="button" 
              className={`dashboard-menu-item ${activeTab === "resources" ? "active" : ""}`}
              onClick={() => setActiveTab("resources")}
            >
              <FileText size={18} />
              <span>Resources & Feedback</span>
            </button>
          </nav>

          <button 
            type="button" 
            className="dashboard-menu-item" 
            onClick={handleLogoutClick}
            style={{ marginTop: "auto", color: "var(--danger)" }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </aside>

        {/* Main Content Pane */}
        <main className="dashboard-main">
          {/* Welcome Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--space-4)" }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: "var(--space-1)" }}>Student Portal</p>
              <h2 style={{ fontSize: "var(--text-h2)", fontFamily: "var(--font-editorial)" }}>
                Welcome back, {user.name.split(" ")[0]}
              </h2>
            </div>
            <Link className="btn btn-quiet" to="/book" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={16} />
              <span>Schedule Session</span>
            </Link>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {/* Stats Grid */}
              <div className="dashboard-stats">
                <div className="stat-card">
                  <span className="stat-val">2</span>
                  <span className="stat-lbl">Active Modules</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">12.5 hrs</span>
                  <span className="stat-lbl">Mentoring Hours</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">Tue 10:00</span>
                  <span className="stat-lbl">Next Session</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">92%</span>
                  <span className="stat-lbl">Task Completion</span>
                </div>
              </div>

              {/* Course Progress */}
              <div className="dashboard-panel">
                <h4 className="panel-title">Current Study Progress</h4>
                <div className="module-progress-list">
                  {academy.slice(0, 2).map((item) => {
                    const progress = progressMap[item.title] ?? 0;
                    return (
                      <div key={item.title} className="module-progress-item">
                        <div className="module-progress-header">
                          <span className="module-progress-title">{item.title}</span>
                          <span className="module-progress-pct">{progress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fg" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Session Preview */}
              <div className="dashboard-panel" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "rgba(47, 111, 235, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)" }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 600, margin: 0 }}>Upcoming Mentorship Review</h5>
                    <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--voice)" }}>Tuesday, June 9 at 10:00 AM (Online Atelier)</p>
                  </div>
                </div>
                <a href="https://zoom.us" target="_blank" rel="noreferrer" className="btn btn-primary">Join Room</a>
              </div>
            </div>
          )}

          {/* MY MODULES TAB */}
          {activeTab === "modules" && (
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {academy.map((item) => {
                const progress = progressMap[item.title] ?? 0;
                return (
                  <div key={item.title} className="dashboard-panel">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <span className="eyebrow" style={{ fontSize: "10px", padding: "2px 8px", background: "var(--line)", borderRadius: "10px" }}>
                          {item.format}
                        </span>
                        <h4 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginTop: "var(--space-2)" }}>{item.title}</h4>
                      </div>
                      {progress > 0 ? (
                        <button type="button" className="btn btn-quiet">Resume Module</button>
                      ) : (
                        <button type="button" className="btn btn-primary">Start Module</button>
                      )}
                    </div>
                    <p style={{ color: "var(--voice)", fontSize: "var(--text-sm)", marginBlock: "var(--space-2)" }}>{item.description}</p>
                    
                    {progress > 0 && (
                      <div className="module-progress-item" style={{ marginTop: "var(--space-2)" }}>
                        <div className="module-progress-header">
                          <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>Course Completion</span>
                          <span className="module-progress-pct">{progress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fg" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SESSIONS TAB */}
          {activeTab === "sessions" && (
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div className="dashboard-panel">
                <h4 className="panel-title">Scheduled Sessions</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", background: "var(--paper)" }}>
                    <div>
                      <strong>Tuesday, June 9 • 10:00 AM</strong>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>Mentorship Consultation (45 min)</div>
                    </div>
                    <span className="chip" style={{ background: "rgba(23, 163, 74, 0.1)", color: "var(--success)" }}>Confirmed</span>
                  </div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", opacity: 0.6 }}>
                    <div>
                      <strong>Saturday, June 13 • 09:30 AM</strong>
                      <div style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>Portfolio Review Lab (60 min)</div>
                    </div>
                    <span className="chip" style={{ background: "var(--line)", color: "var(--voice)" }}>Pending Action</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-panel" style={{ textAlign: "center", padding: "var(--space-8)" }}>
                <Calendar size={36} style={{ margin: "0 auto var(--space-3)", color: "var(--voice)" }} />
                <h4 style={{ fontWeight: 600 }}>Reserve additional mentorship hours</h4>
                <p style={{ color: "var(--voice)", maxWidth: "400px", margin: "var(--space-2) auto var(--space-4)" }}>
                  Need specific assignment help, writing feedback, or study planning? Select an available window in our studio calendar.
                </p>
                <Link className="btn btn-primary" to="/book">Browse Available Slots</Link>
              </div>
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === "resources" && (
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {/* Teacher Feedback */}
              <div className="dashboard-panel">
                <h4 className="panel-title">Teacher Precy's Feedback</h4>
                
                <div className="feedback-card">
                  <p className="feedback-text">
                    "Your study rhythm has improved significantly over the past two weeks. I noticed your outline for the academic essay is much more structured. For our next session, let's refine the transitional arguments between the second and third sections."
                  </p>
                  <div className="feedback-author">
                    Precy Alarba • 2 days ago
                  </div>
                </div>

                <div className="feedback-card" style={{ borderLeftColor: "var(--voice)" }}>
                  <p className="feedback-text">
                    "Welcome to Atelier Zero! I have attached the initial Study Foundations syllabus. Please review the first module checklist before our initial call so we can target your specific goals."
                  </p>
                  <div className="feedback-author">
                    Precy Alarba • 1 week ago
                  </div>
                </div>
              </div>

              {/* Study Materials */}
              <div className="dashboard-panel">
                <h4 className="panel-title">Shared Studio Resources</h4>
                <div className="download-link-list">
                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading Studio Study Manual..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Atelier Study Manual</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>PDF • 1.4 MB</span>
                    </div>
                    <Download size={16} style={{ color: "var(--voice)" }} />
                  </a>

                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading Academic Writing Template..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Academic Essay Guide</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>PDF • 820 KB</span>
                    </div>
                    <Download size={16} style={{ color: "var(--voice)" }} />
                  </a>

                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading Weekly Checklist..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Weekly Study Rhythm</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>XLSX • 120 KB</span>
                    </div>
                    <Download size={16} style={{ color: "var(--voice)" }} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
