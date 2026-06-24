namespace TeacherPrecy.Models
{
    public class HomeViewModel
    {
        public HeroContent Hero { get; set; } = new();
        public StoryContent Story { get; set; } = new();
        public List<GalleryItem> GalleryItems { get; set; } = new();
        public List<SocialProofItem> SocialProofs { get; set; } = new();
    }

    public class HeroContent
    {
        public string Kicker { get; set; } = "";
        public string Mission { get; set; } = "";
        public string PrimaryCta { get; set; } = "";
        public string SecondaryCta { get; set; } = "";
    }

    public class StoryContent
    {
        public string NarrativeLabel { get; set; } = "";
        public string NarrativeHeadline { get; set; } = "";
        public string NarrativeBody { get; set; } = "";
        public string ProfessionalExpertise { get; set; } = "";
        public List<string> Expertise { get; set; } = new();
    }

    public class GalleryItem
    {
        public string Src { get; set; } = "";
        public string Alt { get; set; } = "";
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public List<string> Tags { get; set; } = new();
    }

    public class SocialProofItem
    {
        public string Quote { get; set; } = "";
        public string Source { get; set; } = "";
    }
}
