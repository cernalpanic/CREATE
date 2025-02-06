using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Users
    {
        public static bool CheckEmail(string email)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("CheckEmail", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Email", email));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    bool result = false;

                    if (reader.Read())
                    {
                        if (reader.GetBoolean(0))
                        {
                            result = true;
                        }
                    }

                    reader.Close();
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

        public static User CheckLogin(string email, string password)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();
                User user = new User();
                using (con)
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM Athena.dbo.[User] WHERE Email = @Email AND Password = @Password", con);
                    command.Parameters.Add(new SqlParameter("@Email", email));
                    command.Parameters.Add(new SqlParameter("@Password", password));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    if(reader.Read())
                    {
                        user = Users.GetUserByID(Guid.Parse(reader["UserID"].ToString()));
                    }

                    reader.Close();
                    con.Close();
                    return user;

                }
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }

        public static User GetUserByID(Guid userId)
        {
            try
            {
                User returnedUser = new User();

                SqlConnection con = SqlHelper.GetConnection();
                using(con)
                {
                    SqlCommand command = new SqlCommand("SELECT * FROM Athena.dbo.[User] WHERE UserID = @UserId", con);
                    command.Parameters.Add(new SqlParameter("@UserId", userId));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    if(reader.Read())
                    {
                        returnedUser.UserID = userId;
                        returnedUser.FirstName = reader["FirstName"].ToString();
                        returnedUser.LastName = reader["LastName"].ToString();
                        returnedUser.Email = reader["Email"].ToString();
                        returnedUser.Password = reader["Password"].ToString();
                    }

                    reader.Close();
                    con.Close();
                }
                return returnedUser;
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new User();
            }
        }

        public static string GetUserImage(Guid RoleID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();
                using (con)
                {
                    SqlCommand command = new SqlCommand("GetUserImage", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();
                    string result = "";
                    if (reader.Read())
                    {
                        result = reader["URL"].ToString();
                    }
                    con.Close();
                    return result;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "";
            }
        }

        public static JObject GetUserSettings(Guid RoleID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();
                using (con)
                {
                    SqlCommand command = new SqlCommand("GetUserSettings", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();
                    JObject result = new JObject();
                    if (reader.Read())
                    {
                        result["FirstName"] = reader["FirstName"].ToString();
                        result["LastName"] = reader["LastName"].ToString();
                        result["Email"] = reader["Email"].ToString();
                        result["ImageURL"] = reader["URL"].ToString();
                        result["Availability"] = reader["Availability"].ToString();

                        var exists = Enumerable.Range(0, reader.FieldCount).Any(i => string.Equals(reader.GetName(i), "JobTitle", StringComparison.OrdinalIgnoreCase));

                        if (exists)
                        {
                            result["JobTitle"] = reader["JobTitle"].ToString();
                        }
                        else
                        {
                            result["JobTitle"] = "";
                        }
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

        public static Boolean UpdateUserSettings(Guid RoleID, JObject settings)
        {
            SqlParameter password = new SqlParameter("@Password", "");
            if (settings["Password"].ToString() == "")
            {
                password.Value = DBNull.Value;
            } 
            else
            {
                password.Value = settings["Password"].ToString();
            }
            try
            {
                SqlConnection con = SqlHelper.GetConnection();
                using (con)
                {
                    SqlCommand command = new SqlCommand("UpdateUserSettings", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                    command.Parameters.Add(new SqlParameter("@FirstName", settings["FirstName"].ToString()));
                    command.Parameters.Add(new SqlParameter("@LastName", settings["LastName"].ToString()));
                    command.Parameters.Add(new SqlParameter("@Email", settings["Email"].ToString()));
                    command.Parameters.Add(password);
                    command.Parameters.Add(new SqlParameter("@ImageURL", settings["ImageURL"].ToString()));
                    command.Parameters.Add(new SqlParameter("@Availability", settings["Availability"].ToString()));
                    command.Parameters.Add(new SqlParameter("@JobTitle", settings["JobTitle"].ToString()));
                    con.Open();

                    command.ExecuteNonQuery();
                    con.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public static Boolean UpsertImage(Guid RoleID, string url)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();
                using (con)
                {
                    SqlCommand command = new SqlCommand("UpsertUserImage", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@RoleID", RoleID));
                    command.Parameters.Add(new SqlParameter("@ImageURL", url));
                    con.Open();

                    command.ExecuteNonQuery();
                    con.Close();
                    return true;
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
