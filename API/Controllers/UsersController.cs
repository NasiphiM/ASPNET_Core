using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 


namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]  // GET api/users 
    
    [Authorize]
	public class UsersController : ControllerBase
	{
        private readonly DataContext _context; 
        
        public UsersController(DataContext context)
        {
            _context = context; 
        }

        //endpoints need HTTP method to make requests & to get from an API endpoint 
        // you can use HTTP GET method 
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()  //action result can return http responses such as  Not Found , asynchronous so that we can make multithreaded 
        {
            var users = await _context.Users.ToListAsync(); // gets a list of users from the database 
            return users; 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
                                                            //finding user with that specific id 
            return await _context.Users.FindAsync(id);
        }


    }
}