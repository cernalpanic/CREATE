namespace AthenaAPI.Models
{
    public class Quest
    {
        public Guid QuestID { get; set; }
        public Guid ModuleID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ExpGain { get; set; }
    }
}
