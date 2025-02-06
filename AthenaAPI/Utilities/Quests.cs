using AthenaAPI.Controllers;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Quests
    {
        public static List<QuestDTO> GetQuestsWithStatus(Guid moduleID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetQuestsWithStatus", con);
                    command.Parameters.Add(new SqlParameter("@ModuleID", moduleID));
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Module list to read the result
                    List<QuestDTO> quests = new List<QuestDTO>();

                    while (reader.Read())
                    {
                        // New Module object
                        QuestDTO quest = new QuestDTO();
                        quest.QuestID = Guid.Parse(reader["QuestID"].ToString());
                        quest.ModuleID = Guid.Parse(reader["ModuleID"].ToString());
                        quest.Name = reader["Name"].ToString();
                        quest.Description = reader["Description"].ToString();
                        quest.ExpGain = (int)reader["ExpGain"];
                        quest.Available = (bool)reader["Available"];
                        quests.Add(quest);
                    }

                    con.Close();
                    return quests;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<QuestDTO>();
            }
        }
        public static List<Quest> GetQuests()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetQuests", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Module list to read the result
                    List<Quest> quests = new List<Quest>();

                    while (reader.Read())
                    {
                        // New Module object
                        Quest quest = new Quest();
                        quest.QuestID = Guid.Parse(reader["QuestID"].ToString());
                        quest.ModuleID = Guid.Parse(reader["ModuleID"].ToString());
                        quest.Name = reader["Name"].ToString();
                        quest.Description = reader["Description"].ToString();
                        quest.ExpGain = (int)reader["ExpGain"];
                        quests.Add(quest);
                    }

                    con.Close();
                    return quests;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Quest>();
            }
        }

        public static Boolean UpdateQuest(Quest quest)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateQuest", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@QuestID", quest.QuestID));
                    command.Parameters.Add(new SqlParameter("@ModuleID", quest.ModuleID));
                    command.Parameters.Add(new SqlParameter("@Name", quest.Name));
                    command.Parameters.Add(new SqlParameter("@ExpGain", quest.ExpGain));
                    command.Parameters.Add(new SqlParameter("@Description", quest.Description));
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
