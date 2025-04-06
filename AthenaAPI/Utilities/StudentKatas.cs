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

        public static StudentKata AddStudentKatas(Guid StudentID, Guid KataID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddStudentKata", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", StudentID));
                    command.Parameters.Add(new SqlParameter("@KataID", KataID));

                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Student Kata list to read the result
                    StudentKata studentKata = new StudentKata();

                    while (reader.Read())
                    {
                        // New Kata
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
                    }

                    con.Close();
                    return studentKata;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new StudentKata();
            }
        }

         public static Boolean UpdateStudentKatas(Guid KataID, Guid StudentID, string CompletionTime, string StudentCode, string StudentNotes,
            string AdminFeedback, bool Complete)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateStudentKata", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", KataID));
                    command.Parameters.Add(new SqlParameter("@StudentID", StudentID));
                    command.Parameters.Add(new SqlParameter("@CompletionTime", CompletionTime));
                    command.Parameters.Add(new SqlParameter("@StudentCode", StudentCode));
                    command.Parameters.Add(new SqlParameter("@StudentNotes", StudentNotes));
                    command.Parameters.Add(new SqlParameter("@AdminFeedback", AdminFeedback));
                    if(Complete == true){
                        command.Parameters.Add(new SqlParameter("@Complete", 1));
                    }else{
                        command.Parameters.Add(new SqlParameter("@Complete", 0));
                    }
                    
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