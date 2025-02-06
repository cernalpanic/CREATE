using Microsoft.Data.SqlClient;

namespace AthenaAPI.Data
{
    public class SqlHelper
    {
        public static string conStr;
        public static SqlConnection GetConnection()
        {
            try
            {
                SqlConnection connection = new SqlConnection(conStr);
                return connection;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw;
            }
        }
    }
}
