using AthenaAPI.Data;
using Microsoft.Data.SqlClient;
using System.Data;
using AthenaAPI.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace AthenaAPI.Utilities
{
    public class KataExamplesUtility
    {
        public static List<KataExamples> GetKataExamples(Guid kataID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetKataExamples", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", kataID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Kata list to read the result
                    List<KataExamples> kataExamples = new List<KataExamples>();
                    
                    while (reader.Read())
                    {
                        KataExamples kataExample = new KataExamples();
                        kataExample.KataID = Guid.Parse(reader["KataID"].ToString());
                        kataExample.ExampleCode = reader["ExampleCode"].ToString();

                        kataExamples.Add(kataExample);
                    }

                    con.Close();
                    return kataExamples;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<KataExamples>();
            }
        }

        public static KataExamples AddKataExamples(Guid KataID, string ExampleCode)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddExample", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@KataID", KataID));
                    command.Parameters.Add(new SqlParameter("@ExampleCode", ExampleCode));

                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Kata list to read the result
                    KataExamples kataExample = new KataExamples();

                    while (reader.Read())
                    {
                        // New Kata
                        kataExample.KataID = Guid.Parse(reader["KataID"].ToString());
                        kataExample.ExampleCode = reader["ExampleCode"].ToString();

                    }

                    con.Close();
                    return kataExample;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new KataExamples();
            }
        }
    }
}