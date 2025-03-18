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
    }
}
