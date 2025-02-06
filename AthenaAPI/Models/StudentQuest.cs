namespace AthenaAPI.Models
{
    public class StudentQuest
    {
        public Guid StudentID { get; set; }
        public Guid QuestID { get; set; }
        public Guid ModuleID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ExpGain { get; set; }
        public bool Available { get; set; }
        public bool Completed { get; set; }
        public DateTime LastActivityDate { get; set; }
    }
}
