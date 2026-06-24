using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TeacherPrecy.Models;

namespace TeacherPrecy.Controllers
{
    public class HomeController : Controller
    {
    public IActionResult Index()
    {
        var model = new HomeViewModel
        {
            Hero = new HeroContent
            {
                Kicker = "Special Education & FSL Specialist",
                Mission = "Bridging communication gaps and building inclusive learning environments through dedicated Filipino Sign Language interpretation and specialized education.",
                PrimaryCta = "Book a Lesson",
                SecondaryCta = "Visit Academy"
            },
            Story = new StoryContent
            {
                NarrativeLabel = "My Journey",
                NarrativeHeadline = "Teaching, Interpreting & Advocacy",
                NarrativeBody = "Dedicated to the Deaf community, I merge my expertise in Special Education and FSL to empower learners and create an accessible world for everyone.",
                ProfessionalExpertise = "Certified Special Education Teacher and Filipino Sign Language Interpreter with years of experience in inclusive classroom management.",
                Expertise = new List<string> { "FSL Interpretation", "SPED", "Braille Literacy", "Inclusive Education", "Deaf Culture" }
            },
            GalleryItems = new List<GalleryItem>
            {
                new GalleryItem { Src = "/public/image/Profile.jpg", Alt = "Portrait", Title = "PRECY ALARBA", Category = "Portrait", Description = "Special Education Teacher and FSL Interpreter, dedicated to bridging communication gaps and building inclusive learning environments.", Tags = new List<string>{"SPED", "Educator"} },
                new GalleryItem { Src = "/public/image/image.png", Alt = "Interpretation", Title = "FSL INTERPRETING", Category = "Interpreting", Description = "Providing real-time Filipino Sign Language interpretation during community events, seminars, and important legal proceedings.", Tags = new List<string>{"Sign Language", "Community"} },
                new GalleryItem { Src = "/public/image/pic1.jpg", Alt = "Classroom", Title = "SPED CLASS ENGAGEMENT", Category = "Classroom", Description = "Hands-on classroom activities designed to engage students with special educational needs through multi-sensory learning.", Tags = new List<string>{"Teaching", "Inclusive"} },
                new GalleryItem { Src = "/public/image/Pic8.jpg", Alt = "Online", Title = "ONLINE FSL TUTORING", Category = "FSL Instruction", Description = "Conducting structured online FSL lessons accessible to learners nationwide.", Tags = new List<string>{"Online", "Sign Language"} },
                new GalleryItem { Src = "/public/image/Pic3.jpg", Alt = "Volunteering", Title = "VOLUNTEERING SEMINAR", Category = "Volunteering", Description = "Leading volunteer-driven workshops that educate communities about Deaf culture.", Tags = new List<string>{"Community", "Advocacy"} },
                new GalleryItem { Src = "/public/image/Pic5.jpg", Alt = "Song", Title = "SONG SIGN INTERPRETATION", Category = "Interpreting", Description = "Performing expressive song interpretations in Filipino Sign Language during webinars.", Tags = new List<string>{"Performance", "FSL"} },
                new GalleryItem { Src = "/public/image/Pic6.jpg", Alt = "Braille", Title = "BRAILLE & SPED ACTIVITIES", Category = "Classroom", Description = "Facilitating Braille reading and writing sessions alongside SPED activities.", Tags = new List<string>{"Braille", "Literacy"} },
                new GalleryItem { Src = "/public/image/pic7.jpg", Alt = "Mentorship", Title = "COMMUNITY MENTORSHIP", Category = "Advocacy", Description = "Mentoring aspiring sign language interpreters and special education advocates.", Tags = new List<string>{"Mentorship", "Deaf Culture"} }
            },
            SocialProofs = new List<SocialProofItem>
            {
                new SocialProofItem { Quote = "Teacher Precy made FSL feel natural and accessible. Her patience is unmatched.", Source = "Maria K." },
                new SocialProofItem { Quote = "The most inclusive learning experience I've ever had in a classroom.", Source = "Juan D." },
                new SocialProofItem { Quote = "Professional, clear, and deeply committed to the Deaf community.", Source = "Sarah L." }
            }
        };
        return View(model);
    }

    }
}
