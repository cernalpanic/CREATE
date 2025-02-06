using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class DailyStandups
    {

        public static List<DailyStandup> GetDailyStandups(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetDailyStandups", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", id));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new DailyStandup list to read the result
                    List<DailyStandup> dailyStandups = new List<DailyStandup>();

                    while (reader.Read())
                    {
                        // New Daily Standup
                        DailyStandup standup = new DailyStandup();
                        standup.StandupID = Guid.Parse(reader["StandupID"].ToString());
                        standup.StudentID = Guid.Parse(reader["StudentID"].ToString());
                        standup.UserID = Guid.Parse(reader["UserID"].ToString());
                        standup.DateCreated = DateTime.Parse(reader["Date_Created"].ToString());
                        standup.Description = reader["Description"].ToString();

                        dailyStandups.Add(standup);
                    }

                    con.Close();
                    return dailyStandups;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<DailyStandup>();
            }
        }

        public static Boolean UpdateDailyStandups(Guid standupID, string newDescription)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateDailyStandup", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StandupID", standupID));
                    command.Parameters.Add(new SqlParameter("@Description", newDescription));

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

        public static DailyStandup AddDailyStandup(Guid StudentID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddDailyStandup", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@StudentID", StudentID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    DailyStandup standup = new DailyStandup();

                    if (reader.Read())
                    {                        
                        standup.StandupID = Guid.Parse(reader["StandupID"].ToString());
                        standup.StudentID = Guid.Parse(reader["StudentID"].ToString());
                        standup.UserID = Guid.Parse(reader["UserID"].ToString());
                        standup.DateCreated = DateTime.Parse(reader["Date_Created"].ToString());
                        standup.Description = reader["Description"].ToString();
                    }
                    con.Close();

                    return standup;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new DailyStandup();
            }
        }

    }
}
