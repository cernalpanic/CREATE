namespace AthenaAPI.Models
{
    public interface Role
    {
        Guid RoleID { get; set; }
        string Name { get; }
        object Person { get; }
        string ImageURL { get; set; }
    }

    public class StudentRole : Role
    {
        public Guid RoleID { get; set; }
        public string Name { get { return "Student"; } }
        public Student Student { get; set; }
        public object Person { get { return Student; } }
        public string ImageURL { get; set; }
    }

    public class MentorRole : Role
    {
        public Guid RoleID { get; set; }
        public string Name { get { return "Mentor"; } }
        public Mentor Mentor { get; set; }
        public object Person { get { return Mentor; } }
        public string ImageURL { get; set; }
    }
}
