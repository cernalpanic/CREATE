using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Mentors
    {
        public static List<MentorRole> GetMentors()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetMentors", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new MentorRole list to read the result
                    List<MentorRole> mentors = new List<MentorRole>();

                    while (reader.Read())
                    {
                        // New Role object and Mentor object
                        MentorRole mentor = new MentorRole();
                        Mentor mt = new Mentor();
                        mentor.RoleID = Guid.Parse(reader["MentorID"].ToString());
                        mt.FirstName = reader["FirstName"].ToString();
                        mt.LastName = reader["LastName"].ToString();
                        mt.Email = reader["Email"].ToString();
                        mt.JobTitle = reader["JobTitle"].ToString();
                        mt.Availability = reader["Availability"].ToString();
                        mentor.ImageURL = reader["URL"].ToString();
                        mentor.Mentor = mt;
                        mentors.Add(mentor);
                    }

                    con.Close();
                    return mentors;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<MentorRole>();
            }
        }
        public static MentorRole GetMentor(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetMentor", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@MentorID", id));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new MentorRole object to read the result
                    MentorRole mentor = new MentorRole();

                    if (reader.Read())
                    {
                        // New Mentor object
                        Mentor m = new Mentor();
                        mentor.RoleID = Guid.Parse(reader["MentorID"].ToString());
                        m.FirstName = reader["FirstName"].ToString();
                        m.LastName = reader["LastName"].ToString();
                        m.Email = reader["Email"].ToString();
                        m.JobTitle = reader["JobTitle"].ToString();
                        m.Availability = reader["Availability"].ToString();
                        mentor.ImageURL = reader["URL"].ToString();
                        mentor.Mentor = m;
                    }

                    con.Close();
                    return mentor;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new MentorRole();
            }
        }

        public static MentorRole AddMentor(Guid UserID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddMentor", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@UserID", UserID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new MentorRole object to read the result
                    MentorRole mentor = new MentorRole();

                    if (reader.Read())
                    {
                        // New Mentor object
                        Mentor m = new Mentor();
                        mentor.RoleID = Guid.Parse(reader["MentorID"].ToString());
                        m.FirstName = reader["FirstName"].ToString();
                        m.LastName = reader["LastName"].ToString();
                        m.Email = reader["Email"].ToString();
                        m.JobTitle = reader["JobTitle"].ToString();
                        m.Availability = reader["Availability"].ToString();
                        mentor.ImageURL = reader["URL"].ToString();
                        mentor.Mentor = m;
                    }

                    con.Close();
                    return mentor;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new MentorRole();
            }
        }

        public static List<StudentRole> GetMentorStudents(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetMentorStudents", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@MentorID", id));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new StudentRole list 
                    List<StudentRole> students = new List<StudentRole>();

                    while (reader.Read())
                    {
                        // New StudentRole and Student object
                        StudentRole student = new StudentRole();
                        Student st = new Student();
                        student.RoleID = Guid.Parse(reader["StudentID"].ToString());
                        st.FirstName = reader["FirstName"].ToString();
                        st.LastName = reader["LastName"].ToString();
                        st.Email = reader["Email"].ToString();
                        st.Exp = Int32.Parse(reader["Exp"].ToString());
                        st.Availability = reader["Availability"].ToString();
                        student.ImageURL = reader["URL"].ToString();
                        student.Student = st;

                        students.Add(student);
                    }

                    con.Close();
                    return students;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<StudentRole>();
            }
        }

        public static Boolean UpdateMentor(MentorRole mentor)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateMentor", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@MentorID", mentor.RoleID));
                    command.Parameters.Add(new SqlParameter("@JobTitle", mentor.Mentor.JobTitle));
                    command.Parameters.Add(new SqlParameter("@Availability", mentor.Mentor.Availability));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();
                    Boolean result = false;
                    if (reader.Read())
                    {
                        if (reader.GetBoolean(0))
                        {
                            result = true;
                        }
                    }
                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
