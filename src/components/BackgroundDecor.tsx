import { 
  GraduationCap, 
  BookOpen, 
  Heart, 
  Accessibility, 
  PenLine, 
  Sparkles,
  Award,
  Users,
  Brain,
  Quote
} from "lucide-react";

export function BackgroundDecor() {
  return (
    <div className="background-decor" aria-hidden="true">
      <GraduationCap className="decor-icon" style={{ top: "10%", left: "5%", transform: "rotate(-15deg)" }} size={120} />
      <BookOpen className="decor-icon" style={{ top: "25%", right: "8%", transform: "rotate(12deg)" }} size={160} />
      <Heart className="decor-icon" style={{ top: "45%", left: "12%", transform: "rotate(-10deg)" }} size={100} />
      <Accessibility className="decor-icon" style={{ top: "65%", left: "80%", transform: "rotate(20deg)" }} size={140} />
      <PenLine className="decor-icon" style={{ top: "85%", left: "5%", transform: "rotate(-25deg)" }} size={110} />
      <Sparkles className="decor-icon" style={{ top: "92%", left: "85%", transform: "rotate(15deg)" }} size={130} />
      <Award className="decor-icon" style={{ top: "5%", right: "20%", transform: "rotate(10deg)" }} size={90} />
      <Users className="decor-icon" style={{ top: "50%", right: "2%", transform: "rotate(-5deg)" }} size={120} />
      <Brain className="decor-icon" style={{ top: "75%", left: "4%", transform: "rotate(25deg)" }} size={150} />
      <Quote className="decor-icon" style={{ top: "80%", left: "20%", transform: "rotate(-15deg)" }} size={100} />
    </div>
  );
}
