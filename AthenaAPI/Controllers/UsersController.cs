using AthenaAPI.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AthenaAPI.Data;
using AthenaAPI.Models;
using Newtonsoft.Json.Linq;

namespace AthenaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Controller method for retrieving all users.
        /// </summary>
        /// <returns>
        /// A Collection of Users.
        /// </returns>
        /// 
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Users.ToListAsync();
        }

        /// <summary>
        /// Controller method for retrieving a specific User.
        /// </summary>
        /// <returns>
        /// A single User.
        /// </returns>
        /// <param name="id">The Guid of the User.</param>
        /// 
        // GET: api/Users/{Guid}
        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<User>> GetUser(Guid id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        /// <summary>
        /// Controller method for retrieving a specific User's settings.
        /// </summary>
        /// <returns>
        /// A single User's settings.
        /// </returns>
        /// <param name="id">The Guid of the User's Role.</param>
        /// 
        // GET: api/Users/{Guid}/Settings
        [HttpGet("{id:Guid}/Settings")]
        public async Task<ActionResult<JObject>> GetUserSettings(Guid id)
        {
            return Users.GetUserSettings(id);
        }

        /// <summary>
        /// Controller method for updating a specific User.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the update was successful.
        /// </returns>
        /// <param name="id">The Guid of the User.</param>
        /// <param name="user">The User data sent in the body of the method.</param>
        /// 
        // PUT: api/Users/{Guid}
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Controller method for updating a specific User's Settings.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the update was successful.
        /// </returns>
        /// <param name="id">The Guid of the User's Role.</param>
        /// <param name="user">The User data sent in the body of the method.</param>
        /// 
        // PUT: api/Users/{Guid}/Settings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:Guid}/Settings")]
        public async Task<ActionResult<bool>> UpdateUserSettings(Guid id, [FromBody] JObject settings)
        {
            return Users.UpdateUserSettings(id, settings);
        }

        /// <summary>
        /// Controller method for creating a new User.
        /// </summary>
        /// <returns>
        /// The User object that was created.
        /// </returns>
        /// <param name="userData">The User data sent as a JSON object through the method body.</param>
        /// 
        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] JObject userData)
        {
            User user = new User();
            user.FirstName = userData["FirstName"].ToString();
            user.LastName = userData["LastName"].ToString();
            user.Email = userData["Email"].ToString();
            user.Password = userData["Password"].ToString();
            user.UserID = Guid.NewGuid();
            if (_context.Users == null)
            {
                return Problem("Entity set 'DataContext.Users' is null.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserID }, user);
        }

        /// <summary>
        /// Controller method for deleting a single User.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the deletion was successful.
        /// </returns>
        /// <param name="id">The Guid of the User.</param>
        /// 
        // DELETE: api/Users/{Guid}
        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// A method for determining whether or not a User exists in the database.
        /// </summary>
        /// <returns>
        /// A boolean value indicating whether or not the User exists.
        /// </returns>
        /// <param name="id">The Guid of the User.</param>
        private bool UserExists(Guid id)
        {
            return (_context.Users?.Any(e => e.UserID == id)).GetValueOrDefault();
        }

        /// <summary>
        /// Controller method for logging in a User.
        /// </summary>
        /// <returns>
        /// The AuthToken that was created if successfully logged in.
        /// </returns>
        /// <param name="LoginData">The login data sent as a JSON object through the method body.</param>
        /// 
        // POST: api/Users/Login
        [HttpPost("Login")]
        public async Task<ActionResult<AuthToken>> LoginUser(JObject LoginData)
        {
            string Email = LoginData["Email"].ToString();
            string Password = LoginData["Password"].ToString();
            return Utilities.Authentication.LoginUser(Email, Password);
        }

        /// <summary>
        /// Controller method for checking the Authentication Token of a User to ensure it's valid.
        /// </summary>
        /// <returns>
        /// An Action Result that represents whether or not the token is valid.
        /// </returns>
        /// <param name="TokenID">The Guid of the Token.</param>
        /// 
        // GET: api/Users/Auth/Check/{Guid}
        [HttpGet("Auth/Check/{TokenID:Guid}")]
        public async Task<ActionResult<bool>> CheckAuthentication(Guid TokenID)
        {
            return Utilities.Authentication.CheckAuth(TokenID);
        }

        /// <summary>
        /// Controller method for retrieving the Authentication data of a token.
        /// </summary>
        /// <returns>
        /// An Action Result with the associated Authentication data.
        /// </returns>
        /// <param name="TokenID">The Guid of the Token.</param>
        /// 
        // GET: api/Users/Auth/{Guid}
        [HttpGet("Auth/{TokenID:Guid}")]
        public async Task<ActionResult<AuthToken>> GetAuthentication(Guid TokenID)
        {
            return Utilities.Authentication.GetAuthFromTokenID(TokenID);
        }

        // GET: api/Users/Email/{Email}
        [HttpGet("Email/{Email}")]
        public async Task<ActionResult<bool>> CheckEmail(string Email)
        {
            bool result = Utilities.Users.CheckEmail(Email);
            if (result)
            {
                // Email is in use
                return Ok(true);
            }
            else
            {
                // Email is not in use
                return Ok(false);
            }
        }

        [HttpPost("CheckLogin")]
        public User CheckLogin(JObject LoginData)
        {
            return Users.CheckLogin(LoginData["Email"].ToString(), LoginData["Password"].ToString());
        }
       
    }
}
