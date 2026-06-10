import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  LogOut, 
  Compass,
  XCircle,
  RefreshCcw,
  AlertCircle
} from "lucide-react";
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "../firebase";

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

interface Booking {
  id: string;
  sessionType: string;
  day: string;
  time: string;
  status: string;
  price: number;
}

export function Dashboard({ user, onLogout, academy }: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to portal if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/portal");
    }
  }, [user, navigate]);

  // Fetch real-time bookings from Firestore
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "bookings"), 
      where("userId", "==", user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  // Mock progress values
  const progressMap: Record<string, number> = {
    "Filipino Sign Language (FSL) Basics": 75,
    "Deaf Culture & Intermediate FSL": 30,
    "Special Education & Inclusive Teaching": 0
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const cancelBooking = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", id));
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  const rescheduleBooking = async (id: string) => {
    // For this demo, we'll just show a message or redirect to book
    // A real implementation would allow picking a new date/time
    if (window.confirm("To reschedule, we will cancel this booking and you can select a new time. Proceed?")) {
      try {
        await deleteDoc(doc(db, "bookings", id));
        navigate("/book");
      } catch (error) {
        console.error("Error rescheduling:", error);
      }
    }
  };

  const nextSession = bookings.length > 0 ? bookings[0] : null;

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
                  <span className="stat-val">{academy.length}</span>
                  <span className="stat-lbl">Available Modules</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">{bookings.length}</span>
                  <span className="stat-lbl">Active Bookings</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">{nextSession ? `${nextSession.day} ${nextSession.time}` : "None"}</span>
                  <span className="stat-lbl">Next Session</span>
                </div>
                <div className="stat-card">
                  <span className="stat-val">FSL</span>
                  <span className="stat-lbl">Primary Focus</span>
                </div>
              </div>

              {/* Course Progress */}
              <div className="dashboard-panel">
                <h4 className="panel-title">Current Study Progress</h4>
                <div className="module-progress-list">
                  {academy.map((item) => {
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
              {nextSession && (
                <div className="dashboard-panel" style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "10px", background: "rgba(47, 111, 235, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--signal)" }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <h5 style={{ fontWeight: 600, margin: 0 }}>Upcoming {nextSession.sessionType}</h5>
                      <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--voice)" }}>{nextSession.day} at {nextSession.time} (Online Atelier)</p>
                    </div>
                  </div>
                  <a href="https://zoom.us" target="_blank" rel="noreferrer" className="btn btn-primary">Join Room</a>
                </div>
              )}
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
                        <Link to={`/academy/${(item as any).id}`} className="btn btn-quiet">Resume Module</Link>
                      ) : (
                        <Link to={`/academy/${(item as any).id}`} className="btn btn-primary">Start Module</Link>
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
                  {loading ? (
                    <p>Loading your sessions...</p>
                  ) : bookings.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "var(--space-8)" }}>
                      <AlertCircle size={32} style={{ margin: "0 auto var(--space-3)", color: "var(--voice)" }} />
                      <p>You have no scheduled sessions yet.</p>
                      <Link to="/book" className="btn btn-quiet" style={{ marginTop: "12px" }}>Book your first session</Link>
                    </div>
                  ) : (
                    bookings.map(booking => (
                      <div key={booking.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", background: "var(--paper)", flexWrap: "wrap", gap: "16px" }}>
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <strong style={{ fontSize: "16px" }}>{booking.day} • {booking.time}</strong>
                            <span className="chip" style={{ background: "rgba(23, 163, 74, 0.1)", color: "var(--success)" }}>{booking.status}</span>
                          </div>
                          <div style={{ fontSize: "var(--text-sm)", color: "var(--voice)" }}>
                            {booking.sessionType} (₱{booking.price})
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            type="button" 
                            className="btn btn-quiet" 
                            style={{ padding: "8px 12px", minHeight: "36px", fontSize: "13px" }}
                            onClick={() => rescheduleBooking(booking.id)}
                          >
                            <RefreshCcw size={14} /> Reschedule
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-quiet" 
                            style={{ padding: "8px 12px", minHeight: "36px", fontSize: "13px", color: "var(--danger)" }}
                            onClick={() => cancelBooking(booking.id)}
                          >
                            <XCircle size={14} /> Cancel
                          </button>
                        </div>
                      </div>
                    ))
                  )}
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
                    "Your Sign Language fluency has improved significantly! I noticed your hand positioning for 'Teacher' is much more natural now. Let's focus on conversational speed in our next session."
                  </p>
                  <div className="feedback-author">
                    Precy Alarba • 2 days ago
                  </div>
                </div>

                <div className="feedback-card" style={{ borderLeftColor: "var(--voice)" }}>
                  <p className="feedback-text">
                    "Welcome to our FSL community! I have attached the basic alphabet guide. Please review it before our first session so we can jump straight into greetings."
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
                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading FSL Alphabet Guide..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>FSL Alphabet Guide</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>PDF • 2.4 MB</span>
                    </div>
                    <Download size={16} style={{ color: "var(--voice)" }} />
                  </a>

                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading SPED IEP Template..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>IEP Development Guide</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>PDF • 1.2 MB</span>
                    </div>
                    <Download size={16} style={{ color: "var(--voice)" }} />
                  </a>

                  <a href="#download" className="download-btn" onClick={(e) => { e.preventDefault(); alert("Downloading Weekly Practice Log..."); }}>
                    <FileText size={20} />
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Weekly FSL Log</span>
                      <span style={{ fontSize: "var(--text-xs)", color: "var(--voice)" }}>XLSX • 150 KB</span>
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
