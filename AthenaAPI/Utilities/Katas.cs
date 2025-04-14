using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Katas
    {

        public static List<Kata> GetKatas()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetKatas", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Kata list to read the result
                    List<Kata> katas = new List<Kata>();

                    while (reader.Read())
                    {
                        // New Kata
                        Kata kata = new Kata();
                        kata.KataID = Guid.Parse(reader["KataID"].ToString());
                        kata.Description = reader["Description"].ToString();
                        kata.DateAssigned = DateTime.Parse(reader["DateAssigned"].ToString());
                        kata.KataName = reader["KataName"].ToString();

                        katas.Add(kata);
                    }

                    con.Close();
                    return katas;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Kata>();
            }
        }

        public static Kata AddKatas(string Description, string KataName)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddKata", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Description", Description));
                    command.Parameters.Add(new SqlParameter("@KataName", KataName));

                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Kata list to read the result
                    Kata kata = new Kata();

                    while (reader.Read())
                    {
                        // New Kata
                        kata.KataID = Guid.Parse(reader["KataID"].ToString());
                        kata.Description = reader["Description"].ToString();
                        kata.DateAssigned = DateTime.Parse(reader["DateAssigned"].ToString());
                        kata.KataName = reader["KataName"].ToString();
                    }

                    con.Close();
                    return kata;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new Kata();
            }
        }

        public static Boolean UpdateKatas(Guid KataID, string Description, string KataName)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateKata", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", KataID));
                    command.Parameters.Add(new SqlParameter("@Description", Description));
                    command.Parameters.Add(new SqlParameter("@KataName", KataName));

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
