using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Students
    {
        public static List<StudentQuest> GetStudentQuests(Guid? studentID, Guid moduleID) //if studentID is null, returns all StudentQuests on matching moduleID
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudentQuests", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", studentID));
                    command.Parameters.Add(new SqlParameter("@ModuleID", moduleID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new StudentQuest object to read the result
                    List<StudentQuest> result = new List<StudentQuest>();

                    while (reader.Read())
                    {
                        StudentQuest quest = new StudentQuest();
                        quest.QuestID = (Guid)reader["QuestID"];
                        quest.StudentID = (Guid)reader["StudentID"];
                        quest.ModuleID = (Guid)reader["ModuleID"];
                        quest.Name = (string)reader["Name"];
                        quest.Description = (string)reader["Description"];
                        quest.ExpGain = (int)reader["ExpGain"];
                        quest.Available = (bool)reader["Available"];
                        quest.Completed = (bool)reader["Completed"];
                        quest.LastActivityDate = (DateTime)reader["LastActivityDate"];
                        result.Add(quest);
                    }

                    reader.NextResult();

                    while (reader.Read())
                    {
                        StudentQuest quest = new StudentQuest();
                        quest.QuestID = (Guid)reader["QuestID"];
                        quest.StudentID = studentID ?? Guid.Empty; // Assigns Guid.Empty if studentID is null
                        quest.ModuleID = (Guid)reader["ModuleID"];
                        quest.Name = (string)reader["Name"];
                        quest.Description = (string)reader["Description"];
                        quest.ExpGain = (int)reader["ExpGain"];
                        quest.Available = (bool)reader["Available"];
                        quest.Completed = false;
                        quest.LastActivityDate = DateTime.Now;

                        StudentQuest inResult = result.Find(x => x.QuestID == quest.QuestID);
                        if (inResult == null && quest.Available)
                        {
                            result.Add(quest);
                        }
                    }

                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                List<StudentQuest> result = new List<StudentQuest>();
                return result;
            }
        }
        public static List<StudentRole> GetStudents()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudents", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new StudentRole list to read the result
                    List<StudentRole> students = new List<StudentRole>();

                    while (reader.Read())
                    {
                        // New Role object and Student object
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

        

        public static StudentRole GetStudent(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudent", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new StudentRole object to read the result
                    StudentRole student = new StudentRole();

                    if (reader.Read())
                    {
                        // New Student object
                        Student st = new Student();
                        st.FirstName = reader["FirstName"].ToString();
                        st.LastName = reader["LastName"].ToString();
                        st.Email = reader["Email"].ToString();
                        st.Exp = Int32.Parse(reader["Exp"].ToString());
                        st.Availability = reader["Availability"].ToString();
                        st.CurrentStandupStreak = Int32.Parse(reader["CurrentStandupStreak"].ToString());
                        st.LongestStandupStreak = Int32.Parse(reader["LongestStandupStreak"].ToString());

                        // New Student Role object
                        student.RoleID = Guid.Parse(reader["StudentID"].ToString());
                        student.ImageURL = reader["URL"].ToString();
                        student.Student = st;
                    }

                    con.Close();
                    return student;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new StudentRole();
            }
        }

        public static List<MentorRole> GetStudentMentors(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudentMentors", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
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

        public static List<JObject> GetModuleProgress(Guid id, bool details)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetModuleProgress", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
                    command.Parameters.Add(new SqlParameter("@Details", details));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a List to read the result
                    List<JObject> result = new List<JObject>();

                    while (reader.Read())
                    {
                        if (details)
                        {
                            JObject module = new JObject();
                            module["ModuleID"] = (Guid)reader["ModuleID"];
                            module["Name"] = (string)reader["Name"];
                            module["Color"] = (string)reader["Color"];
                            
                            if (result.Count > 0 && result[result.Count - 1]["ModuleID"].ToString() == module["ModuleID"].ToString())
                            {
                                JObject lastModule = result[result.Count - 1];
                                JObject quest = new JObject();
                                quest["QuestID"] = (Guid)reader["QuestID"];
                                quest["Name"] = (string)reader["QuestName"];
                                quest["Completed"] = (bool)reader["Completed"];
                                var quests = lastModule["Quests"] as JArray;
                                quests.Add(quest);
                            } 
                            else if (result.Count == 0 || result.Count > 0 && result[result.Count - 1]["ModuleID"].ToString() != module["ModuleID"].ToString())
                            {
                                JObject quest = new JObject();
                                quest["QuestID"] = (Guid)reader["QuestID"];
                                quest["Name"] = (string)reader["QuestName"];
                                quest["Completed"] = (bool)reader["Completed"];
                                module["Quests"] = new JArray() { quest };
                                result.Add(module);
                            }
                        } 
                        else
                        {
                            JObject module = new JObject();
                            module["ModuleID"] = (Guid)reader["ModuleID"];
                            module["Name"] = (string)reader["Name"];
                            module["Color"] = (string)reader["Color"];
                            module["QuestsCompleted"] = (int)reader["QuestsCompleted"];
                            module["QuestsAvailable"] = (int)reader["QuestsAvailable"];
                            result.Add(module);
                        }
                    }

                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<JObject>();
            }
        }
        public static JObject GetOverallProgress(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetOverallProgress", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a JObject to read the result
                    JObject result = new JObject();

                    if (reader.Read())
                    {
                        result["OverallExp"] = (int)reader["OverallExp"];
                        result["StudentExp"] = (int)reader["StudentExp"];
                    }

                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new JObject();
            }
        }

        public static StudentRole AddStudent(Guid UserID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddStudent", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@UserID", UserID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new StudentRole object to read the result
                    StudentRole student = new StudentRole();

                    if (reader.Read())
                    {
                        // New Student object
                        Student st = new Student();
                        student.RoleID = Guid.Parse(reader["StudentID"].ToString());
                        st.FirstName = reader["FirstName"].ToString();
                        st.LastName = reader["LastName"].ToString();
                        st.Email = reader["Email"].ToString();
                        st.Exp = Int32.Parse(reader["Exp"].ToString());
                        st.Availability = reader["Availability"].ToString();
                        st.CurrentStandupStreak = Int32.Parse(reader["CurrentStandupStreak"].ToString());
                        st.LongestStandupStreak = Int32.Parse(reader["LongestStandupStreak"].ToString());
                        student.Student = st;
                    }

                    con.Close();
                    return student;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new StudentRole();
            }
        }

        public static Boolean UpdateStudent(StudentRole student)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateStudent", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", student.RoleID));
                    command.Parameters.Add(new SqlParameter("@Exp", student.Student.Exp));
                    command.Parameters.Add(new SqlParameter("@Availability", student.Student.Availability));
                    command.Parameters.Add(new SqlParameter("@CurrentStandupStreak", student.Student.CurrentStandupStreak));
                    command.Parameters.Add(new SqlParameter("@LongestStandupStreak", student.Student.LongestStandupStreak));
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

        public static Boolean SaveStudentMentors(Guid id, List<MentorRole> updatedMentors)
        {
            // Create DataTable
            DataTable updated = new DataTable();
            updated.Columns.Add("StudentID", typeof(Guid));
            updated.Columns.Add("MentorID", typeof(Guid));

            updatedMentors.ForEach(x => updated.Rows.Add(new Object[] { id, x.RoleID }));

            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {

                    SqlCommand command = new SqlCommand("SaveStudentMentors", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
                    command.Parameters.AddWithValue("@Updated", updated);
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
