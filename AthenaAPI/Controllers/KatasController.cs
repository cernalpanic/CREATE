using Microsoft.AspNetCore.Mvc;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;

namespace AthenaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KatasController : ControllerBase
    {

        private readonly DataContext _context;

        public KatasController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Controller method for retrieving all katas.
        /// </summary>
        /// <returns>
        /// A Collection of katas.
        /// </returns>
        /// 
        // GET: api/DailyStandups
        //[HttpGet]
        //public async Task<ActionResult<List<DailyStandup>>> GetDailyStandups()
        //{
        //    return Utilities.DailyStandups.GetDailyStandups();
        //}
        [HttpGet]
        public async Task<ActionResult<List<Kata>>> GetKatas()
        {
            try
            {
                return Utilities.Katas.GetKatas();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching katas.");
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateKatas([FromBody] JObject kata)
        {
            try
            {
                // Deserialize JSON object to get KataID and other values
                Guid KataID = Guid.Parse(kata["KataID"].ToString());
                string description = kata["Description"].ToString();
                string kataName = kata["KataName"].ToString();


                // Call your utility method to update the kata
                bool updateResult = Utilities.Katas.UpdateKatas(KataID, description, kataName);

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

        [HttpPost("CreateKata")]
        public async Task<ActionResult<Kata>> CreateKata([FromBody] JObject kata)
        {
            try{
                // Deserialize JSON object to get KataID and other values
                string description = kata["Description"].ToString();
                string kataName = kata["KataName"].ToString();

                Kata newKata = await Task.Run(() =>Utilities.Katas.AddKatas(description, kataName)) ;
                return newKata;
            }catch(Exception ex)
            {
                return StatusCode(500, "An error occurred while creating kata.");
            }
        }

        [HttpGet("StudentKata{studentID:Guid}")]
        public async Task<ActionResult<List<StudentKata>>> GetStudentKatas(Guid studentID)
        {
            try
            {
                var studentKatas = await Task.Run(() => Utilities.StudentKatas.GetStudentKatas(studentID));
                return studentKatas;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching katas.");
            }
        }

        [HttpGet("AllStudentKatas")]
        public async Task<ActionResult<List<StudentKata>>> GetAllStudentKatas()
        {
            try
            {
                var studentKatas = await Task.Run(() => Utilities.StudentKatas.GetAllStudentKatas());
                return studentKatas;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching katas.");
            }
        }

        [HttpPost("CreateStudentKata")]
        public async Task<ActionResult<StudentKata>> CreateStudentKata([FromBody] JObject studentKata)
        {
            try{
                // Deserialize JSON object to get KataID and other values
                Guid KataID = Guid.Parse(studentKata["KataID"].ToString());
                Guid StudentID = Guid.Parse(studentKata["StudentID"].ToString());


                StudentKata newStudentKata = await Task.Run(() =>Utilities.StudentKatas.AddStudentKatas(StudentID, KataID)) ;
                return newStudentKata;
            }catch(Exception ex)
            {
                return StatusCode(500, "An error occurred while creating student kata.");
            }
        }

        [HttpPut("UpdateStudentKata")]
        public async Task<IActionResult> UpdateStudentKatas([FromBody] JObject studentKata)
        {
            try
            {
                // Deserialize JSON object to get KataID and other values
                Guid KataID = Guid.Parse(studentKata["KataID"].ToString());
                Guid StudentID = Guid.Parse(studentKata["StudentID"].ToString());
                bool Complete = Boolean.Parse(studentKata["Complete"].ToString());
                string CompletionTime = studentKata["CompletionTime"].ToString();
                string StudentCode = studentKata["StudentCode"].ToString();
                string StudentNotes = studentKata["StudentNotes"].ToString();
                string AdminFeedback = studentKata["AdminFeedback"].ToString();

                // Call your utility method to update the student kata
                bool updateResult = Utilities.StudentKatas.UpdateStudentKatas(KataID, StudentID, CompletionTime, StudentCode, StudentNotes, AdminFeedback, Complete);

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

        [HttpGet("KataExamples{id:Guid}")]
        public async Task<ActionResult<List<KataExamples>>> GetKataExamples(Guid id)
        {
            try
            {
                var kataExamples = await Task.Run(() => Utilities.KataExamplesUtility.GetKataExamples(id));
                return kataExamples;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching katas.");
            }
        }

        [HttpPost("AddKataExample")]
        public async Task<ActionResult<KataExamples>> CreateKataExample([FromBody] JObject kataExample)
        {
            try{
                // Deserialize JSON object to get KataID and other values
                Guid KataID = Guid.Parse(kataExample["KataID"].ToString());
                string ExampleCode = kataExample["ExampleCode"].ToString();


                KataExamples newKataExample = await Task.Run(() =>Utilities.KataExamplesUtility.AddKataExamples(KataID, ExampleCode)) ;
                return newKataExample;
            }catch(Exception ex)
            {
                return StatusCode(500, "An error occurred while creating student kata.");
            }
        }
    }
}
