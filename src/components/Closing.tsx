import { Link } from "react-router-dom";
import { HeadlineReveal } from "./HeadlineReveal";

export function Closing() {
  return (
    <section className="section closing">
      <div className="container reveal-on-scroll">
        <p className="eyebrow">Begin with a focused session</p>
        <h2><HeadlineReveal>Bring the question. Leave with a plan.</HeadlineReveal></h2>
        <p>Reserve time with TeacherPrecy for mentorship, writing review, module guidance, or a portfolio-focused studio session.</p>
        <Link className="btn btn-primary" to="/book">Choose an appointment</Link>
      </div>
    </section>
  );
}
