namespace AthenaAPI.Models
{
    public class Kata
    {
        public Guid KataID { get; set; }
        public string Description { get; set; }
        public DateTime DateAssigned { get; set; }
        public string KataName {  get; set; }
    }
}