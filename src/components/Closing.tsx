import { Link } from "react-router-dom";
import { HeadlineReveal } from "./HeadlineReveal";

export function Closing() {
  return (
    <section className="section closing">
      <div className="container reveal-on-scroll">
        <p className="eyebrow">Start learning today</p>
        <h2><HeadlineReveal>Begin your sign language or SPED journey.</HeadlineReveal></h2>
        <p>Reserve a dedicated session with Teacher Precy for online FSL coaching, SPED consulting, or customized educational mentorship.</p>
        <Link className="btn btn-primary" to="/book">Book a Session Now!</Link>
      </div>
    </section>
  );
}
