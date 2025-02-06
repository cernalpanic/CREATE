using AthenaAPI.Data;
using AthenaAPI.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Utilities
{
    public class Authentication
    {
        public static AuthToken LoginUser(string Email, string Password)
        {
            // A DateTime object representing the Date one month in the future (to set as the Token expiry date, in the event the user is authenticated)
            DateTime oneMonth = new DateTime((DateTime.Now.Month != 12 ? DateTime.Now.Year : DateTime.Now.Year + 1), (DateTime.Now.Month < 12 ? DateTime.Now.Month + 1 : 1), (DateTime.Now.Day < 28 ? DateTime.Now.Day : 1));
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddAuthentication", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@Email", Email));
                    command.Parameters.Add(new SqlParameter("@Password", Password));
                    command.Parameters.Add(new SqlParameter("@OneMonth", oneMonth));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new AuthToken object to read the result
                    AuthToken authToken = new AuthToken();
                    while (reader.Read())
                    {
                        authToken.TokenID = Guid.Parse(reader["TokenID"].ToString());
                        authToken.Expires = oneMonth;

                        if (reader["Role"].ToString() == "Student")
                        {
                            StudentRole role = new StudentRole();
                            Student st = new Student();
                            st.FirstName = reader["FirstName"].ToString();
                            st.LastName = reader["LastName"].ToString();
                            st.Email = reader["Email"].ToString();
                            st.Exp = Int32.Parse(reader["Exp"].ToString());
                            st.Availability = reader["Availability"].ToString();
                            role.ImageURL = reader["URL"].ToString();

                            role.Student = st;
                            role.RoleID = Guid.Parse(reader["RoleID"].ToString());

                            authToken.Role = role;
                        }
                        else if (reader["Role"].ToString() == "Mentor")
                        {
                            MentorRole role = new MentorRole();
                            Mentor mt = new Mentor();
                            mt.FirstName = reader["FirstName"].ToString();
                            mt.LastName = reader["LastName"].ToString();
                            mt.Email = reader["Email"].ToString();
                            mt.JobTitle = reader["JobTitle"].ToString();
                            mt.Availability = reader["Availability"].ToString();
                            role.ImageURL = reader["URL"].ToString();

                            role.Mentor = mt;
                            role.RoleID = Guid.Parse(reader["RoleID"].ToString());

                            authToken.Role = role;
                        }
                    }
                    
                    con.Close();
                    return authToken;
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AuthToken();
            }
        }

        public static AuthToken GetAuthFromTokenID(Guid TokenID)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("GetAuthentication", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@TokenID", TokenID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();

                    // Let's create a new AuthToken object to read the result
                    AuthToken authToken = new AuthToken();
                    while (reader.Read())
                    {
                        authToken.TokenID = Guid.Parse(reader["TokenID"].ToString());
                        authToken.Expires = DateTime.Parse(reader["Expires"].ToString());

                        if (reader["Role"].ToString() == "Student")
                        {
                            StudentRole role = new StudentRole();
                            Student st = new Student();
                            st.FirstName = reader["FirstName"].ToString();
                            st.LastName = reader["LastName"].ToString();
                            st.Email = reader["Email"].ToString();
                            st.Exp = Int32.Parse(reader["Exp"].ToString());
                            st.Availability = reader["Availability"].ToString();
                            role.ImageURL = reader["URL"].ToString();

                            role.Student = st;
                            role.RoleID = Guid.Parse(reader["RoleID"].ToString());

                            authToken.Role = role;
                        }
                        else if (reader["Role"].ToString() == "Mentor")
                        {
                            MentorRole role = new MentorRole();
                            Mentor mt = new Mentor();
                            mt.FirstName = reader["FirstName"].ToString();
                            mt.LastName = reader["LastName"].ToString();
                            mt.Email = reader["Email"].ToString();
                            mt.JobTitle = reader["JobTitle"].ToString();
                            mt.Availability = reader["Availability"].ToString();
                            role.ImageURL = reader["URL"].ToString();

                            role.Mentor = mt;
                            role.RoleID = Guid.Parse(reader["RoleID"].ToString());

                            authToken.Role = role;
                        }
                    }

                    con.Close();
                    return authToken;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new AuthToken();
            }
        }

        public static Boolean CheckAuth(Guid TokenID)
        {
            bool result = false;
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("CheckAuthentication", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@TokenID", TokenID));
                    con.Open();

                    SqlDataReader reader = command.ExecuteReader();
                    result = false;
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
                return result;
            }
        }

        public static Boolean DeleteAuth(AuthToken authToken)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("DeleteAuthentication", con);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.Add(new SqlParameter("@TokenID", authToken.TokenID));
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
