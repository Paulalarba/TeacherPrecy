import { useEffect, useRef } from "react";
import { type CSSProperties } from "react";
import { HeadlineReveal } from "./HeadlineReveal";

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/Profile.jpg",
    alt: "Teacher Precy Alarba Portrait",
    title: "PRECY ALARBA",
    description:
      "Special Education Teacher and Filipino Sign Language Interpreter — dedicated to bridging communication gaps and building inclusive learning environments.",
    category: "Portrait",
    tags: ["SPED", "Educator"],
  },
  {
    src: "/image.png",
    alt: "Deaf Community Event Interpretation",
    title: "FSL INTERPRETING",
    description:
      "Providing real-time Filipino Sign Language interpretation during community events, seminars, and important legal proceedings for the Deaf community.",
    category: "Interpreting",
    tags: ["Sign Language", "Community"],
  },
  {
    src: "/pic1.jpg",
    alt: "Special Education Classroom Activity",
    title: "SPED CLASS ENGAGEMENT",
    description:
      "Hands-on classroom activities designed to engage students with special educational needs through multi-sensory and interactive learning approaches.",
    category: "Classroom",
    tags: ["Teaching", "Inclusive"],
  },
  {
    src: "/Pic8.jpg",
    alt: "Filipino Sign Language Online Class",
    title: "ONLINE FSL TUTORING",
    description:
      "Conducting structured online FSL lessons accessible to learners nationwide — from manual alphabet basics to intermediate conversational fluency.",
    category: "FSL Instruction",
    tags: ["Online", "Sign Language"],
  },
  {
    src: "/Pic3.jpg",
    alt: "Community Volunteering Seminar",
    title: "VOLUNTEERING SEMINAR",
    description:
      "Leading volunteer-driven workshops and seminars that educate communities about Deaf culture, sign language basics, and inclusive communication practices.",
    category: "Volunteering",
    tags: ["Community", "Advocacy"],
  },
  {
    src: "/Pic5.jpg",
    alt: "FSL Webinar Song Interpretation",
    title: "SONG SIGN INTERPRETATION",
    description:
      "Performing expressive song interpretations in Filipino Sign Language during webinars and cultural events — merging art, language, and Deaf culture.",
    category: "Interpreting",
    tags: ["Performance", "FSL"],
  },
  {
    src: "/Pic5.jpg",
    alt: "Volunteering in Public School SPED",
    title: "INCLUSIVE TEACHING",
    description:
      "Volunteering in public school special education programs, ensuring every learner receives individualized attention and curriculum-adapted instruction.",
    category: "Teaching",
    tags: ["SPED", "Public School"],
  },
  {
    src: "/Pic6.jpg",
    alt: "Inclusive Classroom Lesson",
    title: "BRAILLE & SPED ACTIVITIES",
    description:
      "Facilitating Braille reading and writing sessions alongside SPED activities that cultivate literacy and independence for students with visual impairments.",
    category: "Classroom",
    tags: ["Braille", "Literacy"],
  },
  {
    src: "/pic7.jpg",
    alt: "Deaf Community Advocacy & Mentorship",
    title: "COMMUNITY MENTORSHIP",
    description:
      "Mentoring aspiring sign language interpreters and special education advocates, fostering the next generation of inclusive education professionals.",
    category: "Advocacy",
    tags: ["Mentorship", "Deaf Culture"],
  },
  {
    src: "/Pic8.jpg",
    alt: "Court Case FSL Interpreting",
    title: "LEGAL INTERPRETING",
    description:
      "Providing certified Filipino Sign Language interpretation in courtroom proceedings, ensuring Deaf individuals receive equal access to justice.",
    category: "Interpreting",
    tags: ["Legal", "Court"],
  },
];

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for images removed as per request
  useEffect(() => {
    // Scroll observation logic is now handled globally in App.tsx via .reveal-on-scroll
  }, []);

  return (
    <section className="section gallery-section" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="showcase-header reveal-on-scroll">
          <p className="eyebrow">Volunteering & Community Gallery</p>
          <h2>
            <HeadlineReveal>
              Teaching, Interpreting & Advocacy in Action
            </HeadlineReveal>
          </h2>
          <p className="showcase-subtitle">
            A curated visual archive showing online lessons, classroom teaching,
            webinar song interpretations, legal court hearings, and volunteer
            activities within the Deaf community.
          </p>
        </div>
      </div>

      <div className="showcase-list">
        {GALLERY_ITEMS.map((item, index) => (
          <div
            key={item.src}
            className={`showcase-card reveal-on-scroll ${index % 2 !== 0 ? "showcase-card--reversed" : ""}`}
            style={{ "--reveal-delay": `${Math.min(index * 60, 300)}ms` } as CSSProperties}
          >
            {/* Image side */}
            <div className="showcase-visual">
              <div className="showcase-image-frame">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="showcase-image"
                  loading="lazy"
                />
                {/* Corner accent */}
                <div className="showcase-corner-accent" aria-hidden="true" />
              </div>
            </div>

            {/* Text side */}
            <div className="showcase-info">
              <div className="showcase-info-inner">
                <h3 className="showcase-title">{item.title}</h3>
                <span className="showcase-category">{item.category}</span>
                <p className="showcase-description">{item.description}</p>
                <div className="showcase-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="showcase-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
