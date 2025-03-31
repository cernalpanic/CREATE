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
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<List<Kata>>> GetKatas(Guid id)
        {
            try
            {
                var katas = await Task.Run(() => Utilities.Katas.GetKatas(id));
                return katas;
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

        [HttpPost]
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

        [HttpGet("{kataID:Guid}/{studentID:Guid}")]
        public async Task<ActionResult<List<StudentKata>>> GetStudentKatas(Guid kataID, Guid studentID)
        {
            try
            {
                var studentKatas = await Task.Run(() => Utilities.StudentKatas.GetStudentKatas(kataID, studentID));
                return studentKatas;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while fetching katas.");
            }
        }
        
    }
}
