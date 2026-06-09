import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  CreditCard,
  Mail,
  User,
  AlertCircle
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { HeadlineReveal } from "./HeadlineReveal";

interface AtelierProps {
  atelier: {
    headline: string;
    description: string;
    sessionTypes: Array<{
      id: string;
      title: string;
      description: string;
      price: number;
      duration: string;
    }>;
    slots: Array<{
      day: string;
      time: string;
      type: string;
      available: boolean;
    }>;
  };
  user: { name: string; email: string } | null;
}

export function Atelier({ atelier, user }: AtelierProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const activeType = atelier.sessionTypes.find(t => t.id === selectedType);
  const activeSlot = selectedSlot !== null ? atelier.slots[selectedSlot] : null;

  const handleBooking = async () => {
    if (!user) {
      navigate("/portal?mode=signup&redirect=book");
      return;
    }

    if (!selectedType || selectedSlot === null) return;

    setBookingStatus("loading");
    try {
      const bookingData = {
        userId: user.email, // Using email as a simple ID for this demo
        userName: user.name,
        userEmail: user.email,
        sessionType: activeType?.title,
        price: activeType?.price,
        day: activeSlot?.day,
        time: activeSlot?.time,
        status: "confirmed",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "bookings"), bookingData);
      
      // Mock Email Confirmation
      console.log(`Email Confirmation sent to ${user.email} for ${activeType?.title} session.`);
      
      setBookingStatus("success");
    } catch (error: unknown) {
      console.error("Booking error:", error);
      setBookingStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (bookingStatus === "success") {
    return (
      <section className="section atelier reveal">
        <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
          <div className="studio-panel" style={{ padding: "var(--space-12)" }}>
            <div style={{ display: "inline-flex", padding: "20px", borderRadius: "50%", background: "rgba(23, 163, 74, 0.1)", color: "var(--success)", marginBottom: "var(--space-6)" }}>
              <CheckCircle size={48} />
            </div>
            <h2 style={{ marginBottom: "var(--space-4)" }}>Booking Confirmed!</h2>
            <p style={{ color: "var(--voice)", marginBottom: "var(--space-8)" }}>
              Thank you, {user?.name}. Your {activeType?.title} session is scheduled for {activeSlot?.day} at {activeSlot?.time}. 
              A confirmation email has been sent to {user?.email}.
            </p>
            <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "center" }}>
              <button type="button" className="btn btn-primary" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => {
                setStep(1);
                setSelectedType(null);
                setSelectedSlot(null);
                setBookingStatus("idle");
              }}>
                Book Another
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section atelier" id="atelier">
      <div className="container atelier-grid">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Atelier / booking studio</p>
          <h2><HeadlineReveal>{atelier.headline}</HeadlineReveal></h2>
          <p>{atelier.description}</p>
          
          {/* Progress Indicator */}
          <div style={{ marginTop: "var(--space-12)", display: "flex", gap: "var(--space-8)" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                opacity: step >= i ? 1 : 0.4,
                color: step === i ? "var(--signal)" : "inherit"
              }}>
                <span style={{ 
                  width: "24px", 
                  height: "24px", 
                  borderRadius: "50%", 
                  border: "1px solid currentColor", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600
                }}>{i}</span>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  {i === 1 ? "Session Type" : i === 2 ? "Schedule" : "Confirm"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="studio-panel reveal-on-scroll" style={{ "--reveal-delay": "160ms" } as CSSProperties}>
          {/* STEP 1: SESSION TYPE */}
          {step === 1 && (
            <div className="reveal">
              <div className="calendar-head">
                <strong>Choose your rhythm</strong>
                <span className="chip">Step 1 of 3</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-6)" }}>
                {atelier.sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className="tile"
                    style={{ 
                      textAlign: "left", 
                      padding: "var(--space-5)", 
                      cursor: "pointer",
                      borderColor: selectedType === type.id ? "var(--signal)" : "var(--line)",
                      background: selectedType === type.id ? "color-mix(in oklch, var(--signal) 6%, var(--plate))" : "var(--plate)"
                    }}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <h4 style={{ margin: 0, fontWeight: 600 }}>{type.title}</h4>
                      <strong style={{ color: "var(--signal)" }}>₱{type.price}</strong>
                    </div>
                    <p style={{ fontSize: "14px", margin: "0 0 12px", opacity: 0.8 }}>{type.description}</p>
                    <span style={{ fontSize: "12px", color: "var(--voice)", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={14} /> {type.duration}
                    </span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "var(--space-8)", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  disabled={!selectedType}
                  onClick={nextStep}
                >
                  Next: Schedule <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SCHEDULE */}
          {step === 2 && (
            <div className="reveal">
              <div className="calendar-head">
                <strong>Select a window</strong>
                <span className="chip">Step 2 of 3</span>
              </div>
              <div className="slots">
                {atelier.slots.map((slot, index) => (
                  <button
                    key={`${slot.day}-${slot.time}`}
                    type="button"
                    className="slot"
                    disabled={!slot.available}
                    aria-pressed={selectedSlot === index}
                    onClick={() => slot.available && setSelectedSlot(index)}
                  >
                    <span className="slot-day">
                      <span>{slot.day}</span>
                      <span>{slot.available ? "Open" : "Held"}</span>
                    </span>
                    <strong>{slot.time}</strong>
                    <span style={{ fontSize: "11px", opacity: 0.7 }}>{slot.type}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: "var(--space-8)", display: "flex", justifyContent: "space-between" }}>
                <button type="button" className="btn btn-quiet" onClick={prevStep}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  disabled={selectedSlot === null}
                  onClick={nextStep}
                >
                  Next: Review <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION */}
          {step === 3 && (
            <div className="reveal">
              <div className="calendar-head">
                <strong>Review & Confirm</strong>
                <span className="chip">Step 3 of 3</span>
              </div>
              
              <div style={{ marginBlock: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                {/* Summary Card */}
                <div style={{ padding: "var(--space-5)", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", background: "var(--paper)" }}>
                  <div style={{ display: "flex", gap: "16px", marginBottom: "var(--space-4)" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(47, 111, 235, 0.1)", color: "var(--signal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CalendarIcon size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "16px" }}>{activeType?.title}</h4>
                      <p style={{ margin: 0, fontSize: "14px", color: "var(--voice)" }}>
                        {activeSlot?.day} at {activeSlot?.time} • {activeType?.duration}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "var(--space-3)", borderTop: "1px solid var(--line)" }}>
                    <span style={{ fontWeight: 500 }}>Total Due</span>
                    <strong style={{ color: "var(--signal)" }}>₱{activeType?.price}</strong>
                  </div>
                </div>

                {/* Agreement */}
                <div style={{ padding: "var(--space-4)", borderRadius: "var(--radius-sm)", background: "rgba(47, 111, 235, 0.05)", display: "flex", gap: "12px" }}>
                  <AlertCircle size={20} style={{ flexShrink: 0, color: "var(--signal)" }} />
                  <p style={{ fontSize: "13px", margin: 0, color: "var(--voice)" }}>
                    By confirming, you agree to our 24-hour cancellation policy. You can reschedule your session via the student dashboard.
                  </p>
                </div>

                {/* User Info / Payment (Mock) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {!user ? (
                    <div className="booking-summary" style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "14px", marginBottom: "12px" }}>Sign in to complete your booking</p>
                      <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={() => navigate("/portal?mode=signup&redirect=book")}>
                        Sign Up to Book
                      </button>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)" }}>
                        <User size={18} style={{ color: "var(--voice)" }} />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ fontSize: "12px", color: "var(--voice)", textTransform: "uppercase" }}>Booking as</div>
                          <div style={{ fontSize: "14px", fontWeight: 600 }}>{user.name}</div>
                        </div>
                        <Mail size={18} style={{ color: "var(--voice)" }} />
                      </div>

                      <div style={{ marginTop: "8px" }}>
                        <p style={{ fontSize: "12px", color: "var(--voice)", marginBottom: "8px" }}>Payment Method (Simulated)</p>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button type="button" className="btn btn-quiet" style={{ flex: 1, gap: "8px", fontSize: "13px" }}>
                            <CreditCard size={16} /> Stripe
                          </button>
                          <button type="button" className="btn btn-quiet" style={{ flex: 1, gap: "8px", fontSize: "13px" }}>
                            <span style={{ fontWeight: 700, color: "#003087" }}>PayPal</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {errorMessage && (
                <div style={{ color: "var(--danger)", fontSize: "14px", marginBottom: "16px", padding: "12px", background: "rgba(220, 38, 38, 0.05)", borderRadius: "4px" }}>
                  {errorMessage}
                </div>
              )}

              <div style={{ marginTop: "var(--space-8)", display: "flex", justifyContent: "space-between" }}>
                <button type="button" className="btn btn-quiet" onClick={prevStep} disabled={bookingStatus === "loading"}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  disabled={!user || bookingStatus === "loading"}
                  onClick={handleBooking}
                >
                  {bookingStatus === "loading" ? "Processing..." : `Confirm & Pay ₱${activeType?.price}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
