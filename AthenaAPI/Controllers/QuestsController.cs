using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Controllers
{
    public class QuestDTO
    {
        public Guid QuestID { get; set; }
        public Guid ModuleID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ExpGain { get; set; }
        public bool Available { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class QuestsController : ControllerBase
    {
        private readonly DataContext _context;

        public QuestsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Quests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quest>>> GetQuest()
        {
            if (_context.Quest == null)
          {
              return NotFound();
          }
            return await _context.Quest.ToListAsync();
        }

        // GET: api/QuestsWithStatus/{moduleID}
        [HttpGet("WithStatus/{id}")]
        public async Task<ActionResult<List<QuestDTO>>> GetQuestsWithStatus(Guid id)
        {
            return Utilities.Quests.GetQuestsWithStatus(id);
        }

        // GET: api/Quests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quest>> GetQuest(Guid id)
        {
          if (_context.Quest == null)
          {
              return NotFound();
          }
            var quest = await _context.Quest.FindAsync(id);

            if (quest == null)
            {
                return NotFound();
            }

            return quest;
        }

        // PUT: api/Quests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("SaveQuest")]
        public async Task<IActionResult> PutQuest([FromBody] JObject questData)
        {
            Quest quest = new Quest();
            quest.QuestID = Guid.Parse(questData["QuestID"].ToString());
            quest.ModuleID = Guid.Parse(questData["ModuleID"].ToString());
            quest.Name = questData["Name"].ToString();
            quest.Description = questData["Description"].ToString();
            quest.ExpGain = Int32.Parse(questData["ExpGain"].ToString());

            Boolean updateResult = Utilities.Quests.UpdateQuest(quest);
            if (updateResult)
            {
                return Ok(true);
            }
            else
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Controller method for Updating a PostQuest record if it exists, or Creating one if it does not.
        /// </summary>
        /// <param name="available"></param>
        /// <returns>
        /// bit value of last insertion
        /// </returns>
        [HttpPost("UpdateQuestAvailability/{questID}")]
        public async Task<IActionResult> UpdateQuestAvailability(Guid questID, [FromQuery] bool available)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddUpdatePostQuest", con);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.Add(new SqlParameter("@QuestID", questID));
                    command.Parameters.Add(new SqlParameter("@Available", available));

                    // Add a parameter to collect the return value from the stored procedure
                    var returnParameter = command.Parameters.Add("@ReturnVal", SqlDbType.Int);
                    returnParameter.Direction = ParameterDirection.ReturnValue;

                    con.Open();
                    command.ExecuteNonQuery(); // Execute the command

                    // Cast the return value to an integer
                    int result = (int)returnParameter.Value;
                    con.Close();

                    if (result == 1)
                        return Ok(new { success = true, message = "Quest availability updated successfully." });
                    else
                        return Ok(new { success = false, message = "No updates were made to quest availability." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/Quests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Quest>> CreateQuest([FromBody] JObject questData)
        {
            Quest quest = new Quest();
            quest.Name = questData["Name"].ToString();
            quest.Description = questData["Description"].ToString();
            quest.ExpGain = (int)questData["ExpGain"];
            quest.ModuleID = Guid.Parse(questData["ModuleID"].ToString());
            quest.QuestID = Guid.NewGuid();
          if (_context.Quest == null)
          {
              return Problem("Entity set 'DataContext.Quest'  is null.");
          }
            _context.Quest.Add(quest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuest), new { id = quest.QuestID }, quest);
        }

        // DELETE: api/Quests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuest(Guid id)
        {
            if (_context.Quest == null)
            {
                return NotFound();
            }
            var quest = await _context.Quest.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            _context.Quest.Remove(quest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestExists(Guid id)
        {
            return (_context.Quest?.Any(e => e.QuestID == id)).GetValueOrDefault();
        }
    }
}
