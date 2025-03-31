using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class StudentKatas
    {
        public static List<StudentKata> GetStudentKatas(Guid kataID, Guid studentID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudentKatas", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", kataID));
                    command.Parameters.Add(new SqlParameter("@StudentID", studentID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Kata list to read the result
                    List<StudentKata> studentKatas = new List<StudentKata>();

                    while (reader.Read())
                    {
                        // New StudentKata
                        StudentKata studentKata = new StudentKata();
                        studentKata.KataID = Guid.Parse(reader["KataID"].ToString());
                        studentKata.StudentID = Guid.Parse(reader["StudentID"].ToString());
                        studentKata.UserID = Guid.Parse(reader["UserID"].ToString());
                        studentKata.Complete = Boolean.Parse(reader["Complete"].ToString());
                        studentKata.CompleteDate = DateTime.Parse(reader["CompleteDate"].ToString());
                        studentKata.CompletionTime = reader["CompletionTime"].ToString();
                        studentKata.StudentCode = reader["StudentCode"].ToString();
                        studentKata.StudentNotes = reader["StudentNotes"].ToString();
                        studentKata.AdminFeedback = reader["AdminFeedback"].ToString();
                        studentKata.Description = reader["Description"].ToString();
                        studentKata.DateAssigned = DateTime.Parse(reader["DateAssigned"].ToString());
                        studentKata.KataName = reader["KataName"].ToString();

                        studentKatas.Add(studentKata);
                    }

                    con.Close();
                    return studentKatas;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<StudentKata>();
            }
        }
        
    }
}