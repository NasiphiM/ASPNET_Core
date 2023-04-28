using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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

        private readonly IUserRepository _userRepository; 
        private readonly IMapper _mapper; 
        public UsersController(IUserRepository userRepository, IMapper mapper )
        {
            _mapper = mapper; 
            _userRepository = userRepository; 
        }

        //endpoints need HTTP method to make requests & to get from an API endpoint 
        // you can use HTTP GET method 

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()  //action result can return http responses such as  Not Found , asynchronous so that we can make multithreaded 
        {
            var users = await _userRepository.GetMembersAsync();
            
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDTO>> GetUser(string username)
        {
            //finding user with that specific id 
            return await _userRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDTO memUpdateDTO)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null) return NotFound();

            _mapper.Map(memUpdateDTO, user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Faliled to update user");
        }
    }
}