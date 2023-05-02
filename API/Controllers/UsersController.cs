using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly IPhotoService _photoService; 
        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService )
        {
            _mapper = mapper; 
            _userRepository = userRepository;
            _photoService = photoService;
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
            
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return NotFound();

            _mapper.Map(memUpdateDTO, user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Faliled to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return NotFound();

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri, PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
                photo.IsMain = true; 
            
            user.Photos.Add(photo);

            if (await _userRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName },
                    _mapper.Map<PhotoDto>(photo));  //an action is each function that we've created in the controller 
            }

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return NotFound();

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("This is already your main photo");

            var currMain = user.Photos.FirstOrDefault(x => x.IsMain);

            if (currMain != null)
                currMain.IsMain = false;
            photo.IsMain = true;

            if (await _userRepository.SaveAllAsync())
                return NoContent();

            return BadRequest("Problem setting the main photo");

        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null)
                return NotFound();

            if (photo.IsMain)
                return BadRequest("You cannot delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null)
                    return BadRequest(result.Error.Message);
            }

            user.Photos.Remove(photo);

            if (await _userRepository.SaveAllAsync())
                return Ok();

            return BadRequest("Problem deleting the Photo");
        }
       

    }
}