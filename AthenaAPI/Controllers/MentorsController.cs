using Microsoft.AspNetCore.Mvc;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace AthenaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MentorsController : ControllerBase
    {

        private readonly DataContext _context;

        public MentorsController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Controller method for retrieving all mentors.
        /// </summary>
        /// <returns>
        /// A Collection of Mentors.
        /// </returns>
        /// 
        // GET: api/Mentors
        [HttpGet]
        public async Task<ActionResult<List<MentorRole>>> GetMentors()
        {
            return Utilities.Mentors.GetMentors();
        }

        /// <summary>
        /// Controller method for retrieving a specific Mentor.
        /// </summary>
        /// <returns>
        /// A single Mentor.
        /// </returns>
        /// <param name="id">The Guid of the Mentor.</param>
        /// 
        // GET: api/Mentors/{Guid}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<MentorRole>> GetMentor(Guid id)
        {
            return Utilities.Mentors.GetMentor(id);
        }

        [HttpGet("Students/{id:Guid}")]
        public async Task<ActionResult<List<StudentRole>>> GetMentorStudents(Guid id)
        {
            return Utilities.Mentors.GetMentorStudents(id);
        }

        /// <summary>
        /// Controller method for updating a specific Mentor.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the update was successful.
        /// </returns>
        /// <param name="mentor">The Mentor data sent in the body of the method.</param>
        /// 
        // PUT: api/Mentors/{Guid}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateMentor([FromBody] JObject mentor)
        {
            MentorRole mentorRole = new MentorRole();
            mentorRole.Mentor = JsonConvert.DeserializeObject<Mentor>(mentor["person"].ToString());
            mentorRole.RoleID = Guid.Parse(mentor["roleID"].ToString());

            Boolean updateResult = Utilities.Mentors.UpdateMentor(mentorRole);
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
        /// Controller method for creating a new Mentor.
        /// </summary>
        /// <returns>
        /// The Mentor object that was created.
        /// </returns>
        /// <param name="mentorData">The Mentor data sent as a JSON object through the method body.</param>
        /// 
        // POST: api/Mentors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MentorRole>> CreateMentor([FromBody] JObject mentorData)
        {
            // First create the User the Mentor will be associated with
            User user = new User();
            user.FirstName = mentorData["FirstName"].ToString();
            user.LastName = mentorData["LastName"].ToString();
            user.Email = mentorData["Email"].ToString();
            user.Password = mentorData["Password"].ToString();
            user.UserID = Guid.NewGuid();
            if (_context.Users == null)
            {
                return Problem("Entity set 'DataContext.Users' is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Then create and return the new Mentor!
            MentorRole mentor = Utilities.Mentors.AddMentor(user.UserID);
            return mentor;
        }
    }
}
