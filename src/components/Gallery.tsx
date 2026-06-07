import { HeadlineReveal } from "./HeadlineReveal";

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  category: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { src: "/Profile.jpg", alt: "Teacher Precy Alarba Portrait", label: "Precy Alarba", category: "Portrait" },
  { src: "/Profile.png", alt: "Teacher Precy Alarba Professional Profile", label: "Professional Portrait", category: "Profile" },
  { src: "/image.png", alt: "Deaf Community Event Interpretation", label: "FSL Interpreting", category: "Interpreting" },
  { src: "/pic1.jpg", alt: "Special Education Classroom Activity", label: "SPED Class Engagement", category: "Classroom" },
  { src: "/Pic2.jpg", alt: "Filipino Sign Language Online Class", label: "Online FSL Tutoring", category: "FSL Instruction" },
  { src: "/Pic3.jpg", alt: "Community Volunteering Seminar", label: "Volunteering Seminar", category: "Volunteering" },
  { src: "/Pic4.jpg", alt: "FSL Webinar Song Interpretation", label: "Song Sign Interpretation", category: "Interpreting" },
  { src: "/Pic5.jpg", alt: "Volunteering in Public School SPED", label: "Inclusive Teaching Session", category: "Teaching" },
  { src: "/Pic6.jpg", alt: "Inclusive Classroom Lesson", label: "Braille & SPED Activities", category: "Classroom" },
  { src: "/pic7.jpg", alt: "Deaf Community Advocacy & Mentorship", label: "Community Mentorship", category: "Advocacy" },
  { src: "/Pic8.jpg", alt: "Court Case FSL Interpreting", label: "Legal Interpreting Prep", category: "Interpreting" }
];

export function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="reveal-on-scroll">
          <p className="eyebrow">Volunteering & Community Gallery</p>
          <h2><HeadlineReveal>Teaching, Interpreting & Advocacy in Action</HeadlineReveal></h2>
          <p style={{ maxWidth: "600px", color: "var(--voice)", marginTop: "var(--space-2)" }}>
            A curated visual archive showing online lessons, classroom teaching, webinar song interpretations, legal court hearings, and volunteer activities within the Deaf community.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <div 
              key={item.src} 
              className="gallery-item static-style reveal-on-scroll"
              style={{ "--reveal-delay": `${Math.min(index * 60, 400)}ms` } as any}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={item.src} 
                  alt={item.alt} 
                  className="gallery-image" 
                  loading="lazy"
                />
              </div>
              <div className="gallery-caption-static">
                <strong>{item.label}</strong>
                <span className="chip" style={{ fontSize: "9px" }}>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
