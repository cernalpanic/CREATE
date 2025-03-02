namespace AthenaAPI.Models
{
    public class Student
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Availability { get; set; }
        public string Email { get; set; }
        public int Exp { get; set; }
        public int CurrentStandupStreak { get; set; }
        public int LongestStandupStreak { get; set; }
        public bool IsActivated { get; set; }
        public string Rank { 
            // I know these are lame titles but they're just placeholders for now
            get 
            { 
                if (Exp > 20 && Exp <= 50 )
                {
                    return "Amateur";
                }
                else if(Exp > 50 && Exp <= 100)
                {
                    return "Novice";
                }
                else if(Exp > 100 && Exp <= 200)
                {
                    return "Intern";
                }
                else if(Exp > 200 && Exp <= 300)
                {
                    return "Junior Developer";
                }
                else if (Exp > 300 && Exp <= 400)
                {
                    return "Software Developer I";
                }
                else if (Exp > 400 && Exp <= 500)
                {
                    return "Software Developer II";
                }
                else if (Exp > 500 && Exp <= 650)
                {
                    return "Senior Developer";
                }
                else if (Exp > 650)
                {
                    return "Principal Developer";
                } 
                else
                {
                    return "Beginner";
                }
            }
        }
    }
}
