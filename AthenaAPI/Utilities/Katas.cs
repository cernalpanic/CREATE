using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Katas
    {

        public static List<Kata> GetKatas(Guid id)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetKatas", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", id));
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
    }
}
