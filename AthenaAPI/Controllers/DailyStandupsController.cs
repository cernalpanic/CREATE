using Microsoft.AspNetCore.Mvc;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;

namespace AthenaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyStandupsController : ControllerBase
    {

        private readonly DataContext _context;

        public DailyStandupsController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Controller method for retrieving all standups.
        /// </summary>
        /// <returns>
        /// A Collection of standups.
        /// </returns>
        /// 
        // GET: api/DailyStandups
        //[HttpGet]
        //public async Task<ActionResult<List<DailyStandup>>> GetDailyStandups()
        //{
        //    return Utilities.DailyStandups.GetDailyStandups();
        //}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<List<DailyStandup>>> GetDailyStandups(Guid id)
        {
            try
            {
                var dailyStandups = await Task.Run(() => Utilities.DailyStandups.GetDailyStandups(id));
                return dailyStandups;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching daily standups.");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateDailyStandups([FromBody] JObject standup)
        {
            try
            {
                // Deserialize JSON object to get standupID and newDescription
                Guid standupID = Guid.Parse(standup["standupID"].ToString());
                string yesterdayTask = standup["yesterdayTask"].ToString();
                string todayPlan = standup["todayPlan"].ToString();
                string blockers = standup["blockers"].ToString();
                string adminFeedback = standup["adminFeedback"].ToString();


                // Call your utility method to update the daily standup
                bool updateResult = Utilities.DailyStandups.UpdateDailyStandups(standupID, yesterdayTask, todayPlan, blockers, adminFeedback);

                if (updateResult)
                {
                    return Ok(true);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<DailyStandup>> CreateDailyStandup([FromBody] JObject studentData)
        {

            string roleId = studentData["RoleID"].ToString();

            Guid roleIdGuid;
            if (!Guid.TryParse(roleId, out roleIdGuid))
            {
                // Handle invalid Guid format
                return BadRequest("Invalid RoleID format");
            }

            DailyStandup dailyStandup = Utilities.DailyStandups.AddDailyStandup(roleIdGuid);

            if (_context.DailyStandup == null)
            {
                return Problem("Entity set 'DataContext.DailyStandup' is null.");
            }

            return dailyStandup;
        }



        private bool DailyStandupExists(Guid id)
        {
            return (_context.DailyStandup?.Any(e => e.StandupID == id)).GetValueOrDefault();
        }
    }
}
