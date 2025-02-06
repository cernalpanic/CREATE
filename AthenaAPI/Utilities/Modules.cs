using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using Newtonsoft.Json.Linq;

namespace AthenaAPI.Utilities
{
    public class Modules
    {
        public static List<Module> GetModules()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetModules", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new Module list to read the result
                    List<Module> modules = new List<Module>();

                    while (reader.Read())
                    {
                        // New Module object
                        Module mod = new Module();
                        mod.ModuleID = Guid.Parse(reader["ModuleID"].ToString());
                        mod.Name = reader["Name"].ToString();
                        mod.Color = reader["Color"].ToString();
                        mod.Description = reader["Description"].ToString();
                        modules.Add(mod);
                    }

                    con.Close();
                    return modules;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Module>();
            }
        }

        public static List<JObject> GetModuleStudentTotal()
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetStudentsInModules", con);
                    command.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a JObject list to read the result
                    List<JObject> data = new List<JObject>();

                    while (reader.Read())
                    {
                        // New Role object and Student object
                        dynamic modData = new JObject();
                        modData.ModuleID = Guid.Parse(reader["ModuleID"].ToString());
                        modData.Name = reader["Name"].ToString();
                        modData.TotalStudents = Int32.Parse(reader["TotalStudents"].ToString());
                        data.Add(modData);
                    }

                    con.Close();
                    return data;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<JObject>();
            }
        }

        public static Boolean UpdateModule(Module module)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateModule", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@ModuleID", module.ModuleID));
                    command.Parameters.Add(new SqlParameter("@Name", module.Name));
                    command.Parameters.Add(new SqlParameter("@Color", module.Color));
                    command.Parameters.Add(new SqlParameter("@Description", module.Description));
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
