using Microsoft.AspNetCore.Mvc;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.Data.SqlClient;
using System.Data;

namespace AthenaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {

        private readonly DataContext _context;

        public StudentsController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Controller method for Updating a StudentQuest record if it exists, or Creating one if it does not.
        /// </summary>
        /// <param name="studentQuest"></param>
        /// <returns>
        /// Success message that does not work at the moment
        /// </returns>
        [HttpPost("UpdateStudentQuest")]
        public async Task<IActionResult> UpdateStudentQuest([FromBody] JObject studentQuest)
        {
            try
            {
                SqlConnection con = SqlHelper.GetConnection();

                using (con)
                {
                    SqlCommand command = new SqlCommand("AddUpdateStudentQuest", con);
                    command.CommandType = CommandType.StoredProcedure;

                    StudentQuest input = new StudentQuest();
                    input.StudentID = (Guid)studentQuest["StudentID"];
                    input.QuestID = (Guid)studentQuest["QuestID"];
                    input.ModuleID = (Guid)studentQuest["ModuleID"];
                    input.Completed = (bool)studentQuest["Completed"];
                    input.LastActivityDate = DateTime.Now;

                    command.Parameters.AddWithValue("@StudentID", input.StudentID);
                    command.Parameters.AddWithValue("@QuestID", input.QuestID);
                    command.Parameters.AddWithValue("@ModuleID", input.ModuleID);
                    command.Parameters.AddWithValue("@Completed", input.Completed);
                    command.Parameters.AddWithValue("@LastActivityDate", input.LastActivityDate);

                    //this doesn't work and i don't know why so the response body will always say student quest not updated when it actually does successfully update
                    await con.OpenAsync();
                    var result = await command.ExecuteScalarAsync();
                    bool isSuccess = result != null && (bool)result;
                    await con.CloseAsync();

                    if (isSuccess)
                    {
                        return Ok(new { success = true, message = "Student quest updated successfully." });
                    }
                    else
                    {
                        return Ok(new { success = false, message = "Student quest not updated." });
                    }


                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        /// <summary>
        /// Controller method for retrieving all students.
        /// </summary>
        /// <returns>
        /// A Collection of Students.
        /// </returns>
        /// 
        // GET: api/Students
        [HttpGet]
        public async Task<ActionResult<List<StudentRole>>> GetStudents()
        {
            return Utilities.Students.GetStudents();
        }

        [HttpGet("GetStudentQuests/{studentID?}/{moduleID}")]
        public async Task<ActionResult<List<StudentQuest>>> GetStudentQuests(Guid? studentID, Guid moduleID)
        {
            return Utilities.Students.GetStudentQuests(studentID, moduleID);
        }

        /// <summary>
        /// Controller method for retrieving a specific Student.
        /// </summary>
        /// <returns>
        /// A single Student.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// 
        // GET: api/Students/{Guid}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<StudentRole>> GetStudent(Guid id)
        {
            return Utilities.Students.GetStudent(id);
        }

        /// <summary>
        /// Controller method for retrieving all of a student's mentors.
        /// </summary>
        /// <returns>
        /// A Collection of Mentors.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// 
        // GET: api/Students/{id}/Mentors
        [HttpGet("{id:Guid}/Mentors")]
        public async Task<ActionResult<List<MentorRole>>> GetStudentMentors(Guid id)
        {
            return Utilities.Students.GetStudentMentors(id);
        }

        /// <summary>
        /// Controller method for retrieving a student's progress by module.
        /// </summary>
        /// <returns>
        /// A JObject representing the student's progress by module.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// <param name="details">A boolean value of whether or not Quest name/completion details should be returned.</param>
        /// 
        // GET: api/Students/{id}/ModuleProgress
        [HttpGet("{id:Guid}/ModuleProgress")]
        public async Task<ActionResult<List<JObject>>> GetModuleProgress(Guid id, bool details)
        {
            return Utilities.Students.GetModuleProgress(id, details);
        }

        /// <summary>
        /// Controller method for retrieving a student's progress.
        /// </summary>
        /// <returns>
        /// A JObject representing the student's progress.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// 
        // GET: api/Students/{id}/Progress
        [HttpGet("{id:Guid}/Progress")]
        public async Task<ActionResult<JObject>> GetOverallProgress(Guid id)
        {
            return Utilities.Students.GetOverallProgress(id);
        }

        /// <summary>
        /// Controller method for updating a specific Student.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the update was successful.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// <param name="user">The Student data sent in the body of the method.</param>
        /// 
        // PUT: api/Students/{Guid}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("Update")]
        public async Task<IActionResult> UpdateStudent([FromBody] JObject student)
        {
            StudentRole studentRole = new StudentRole();
            studentRole.Student = JsonConvert.DeserializeObject<Student>(student["person"].ToString());
            studentRole.RoleID = Guid.Parse(student["roleID"].ToString());

            Boolean updateResult = Utilities.Students.UpdateStudent(studentRole);
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
        /// Controller method for creating a new Student.
        /// </summary>
        /// <returns>
        /// The Student object that was created.
        /// </returns>
        /// <param name="studentData">The Student data sent as a JSON object through the method body.</param>
        /// 
        // POST: api/Students
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentRole>> CreateStudent([FromBody] JObject studentData)
        {
            // First create the User the Student will be associated with
            User user = new User();
            user.FirstName = studentData["FirstName"].ToString();
            user.LastName = studentData["LastName"].ToString();
            user.Email = studentData["Email"].ToString();
            user.Password = studentData["Password"].ToString();
            user.UserID = Guid.NewGuid();
            if (_context.Users == null)
            {
                return Problem("Entity set 'DataContext.Users' is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Then create and return the new Student!
            StudentRole student = Utilities.Students.AddStudent(user.UserID);
            return student;
        }

        /// <summary>
        /// Controller method for updating a specific Student's mentors list.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the update was successful.
        /// </returns>
        /// <param name="id">The Guid of the Student.</param>
        /// <param name="mentors">The Mentors data sent in the body of the method.</param>
        /// 
        // PUT: api/Students/{Guid}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("{id:Guid}/Mentors")]
        public async Task<IActionResult> SaveStudentMentors(Guid id, [FromBody] JArray mentors)
        {
            List<MentorRole> mentorRoles = new List<MentorRole>();
            mentorRoles = JsonConvert.DeserializeObject<List<MentorRole>>(mentors.ToString());

            Boolean updateResult = Utilities.Students.SaveStudentMentors(id, mentorRoles);
            if (updateResult)
            {
                return Ok(true);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
