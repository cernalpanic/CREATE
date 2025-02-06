namespace AthenaAPI.Models
{
    public class AuthToken
    {
        public Guid TokenID { get; set; }
        public Role Role { get; set; }
        public DateTime Expires { get; set; }
    }
}
