import { HeadlineReveal } from "./HeadlineReveal";

interface AtelierProps {
  atelier: {
    headline: string;
    description: string;
    slots: Array<{
      day: string;
      time: string;
      type: string;
      available: boolean;
    }>;
  };
  selectedSlot: number;
  setSelectedSlot: (index: number) => void;
}

export function Atelier({ atelier, selectedSlot, setSelectedSlot }: AtelierProps) {
  const activeSlot = atelier.slots[selectedSlot];

  return (
    <section className="section atelier" id="atelier">
      <div className="container atelier-grid">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Atelier / booking studio</p>
          <h2><HeadlineReveal>{atelier.headline}</HeadlineReveal></h2>
          <p>{atelier.description}</p>
        </div>
        <div className="studio-panel reveal-on-scroll" style={{ "--reveal-delay": "160ms" } as any}>
          <div className="calendar-head">
            <strong>June availability</strong>
            <span className="chip">Mock calendar</span>
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
  );
}
