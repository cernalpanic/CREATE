namespace AthenaAPI.Models
{
    public class StudentKata
    {
        public Guid KataID { get; set; }
        public Guid StudentID { get; set; }
        public Guid UserID { get; set; }
        public bool Complete { get; set; }
        public DateTime CompleteDate { get; set; }
        public string CompletionTime { get; set; }
        public string StudentCode { get; set; }
        public string StudentNotes { get; set; }
        public string AdminFeedback { get; set; }
    }
}