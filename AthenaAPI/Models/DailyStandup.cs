using System.ComponentModel.DataAnnotations;

namespace AthenaAPI.Models
{
    public class DailyStandup
    {
        [Key]
        public Guid StandupID { get; set; }
        public Guid StudentID { get; set; }
        public Guid UserID { get; set; }
        public DateTime DateCreated { get; set; }
        public string? Description { get; set; }
    }
}