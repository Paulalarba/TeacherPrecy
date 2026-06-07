import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const icons = containerRef.current.querySelectorAll<HTMLElement>(".decor-icon");
      
      icons.forEach((icon, index) => {
        // Different speeds for each icon to create depth
        const speed = 0.05 + (index % 5) * 0.02;
        const rotateSpeed = 0.02 + (index % 3) * 0.01;
        const initialRotation = icon.dataset.rotation ? parseInt(icon.dataset.rotation) : 0;
        
        icon.style.transform = `translateY(${scrollY * speed}px) rotate(${initialRotation + scrollY * rotateSpeed}deg)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="background-decor" aria-hidden="true" ref={containerRef}>
      <GraduationCap className="decor-icon" data-rotation="-15" style={{ top: "10%", left: "5%", transform: "rotate(-15deg)" }} size={120} />
      <BookOpen className="decor-icon" data-rotation="12" style={{ top: "25%", right: "8%", transform: "rotate(12deg)" }} size={160} />
      <Heart className="decor-icon" data-rotation="-10" style={{ top: "45%", left: "12%", transform: "rotate(-10deg)" }} size={100} />
      <Accessibility className="decor-icon" data-rotation="20" style={{ top: "65%", left: "80%", transform: "rotate(20deg)" }} size={140} />
      <PenLine className="decor-icon" data-rotation="-25" style={{ top: "85%", left: "5%", transform: "rotate(-25deg)" }} size={110} />
      <Sparkles className="decor-icon" data-rotation="15" style={{ top: "92%", left: "85%", transform: "rotate(15deg)" }} size={130} />
      <Award className="decor-icon" data-rotation="10" style={{ top: "5%", right: "20%", transform: "rotate(10deg)" }} size={90} />
      <Users className="decor-icon" data-rotation="-5" style={{ top: "50%", right: "2%", transform: "rotate(-5deg)" }} size={120} />
      <Brain className="decor-icon" data-rotation="25" style={{ top: "75%", left: "4%", transform: "rotate(25deg)" }} size={150} />
      <Quote className="decor-icon" data-rotation="-15" style={{ top: "80%", left: "20%", transform: "rotate(-15deg)" }} size={100} />
    </div>
  );
}
