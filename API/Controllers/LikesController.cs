﻿using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class LikesController: BaseApiController
    {
        private readonly IUserRepository _userRepo;
        private readonly ILikesRepository _likesRepo;

        public LikesController(IUserRepository userRepo, ILikesRepository likesRepo )
        {
            _userRepo = userRepo;
            _likesRepo = likesRepo;
        }

        [HttpPost("{username}")] //template 
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = int.Parse(User.GetUserId());
            var likedUser = await _userRepo.GetUserByUsernameAsync(username);
            var sourceUser = await _likesRepo.GetUserWithLikes(sourceUserId);

            if (likedUser == null)
                return NotFound();

            if (sourceUser.UserName == username)
                return BadRequest("You cannot like yourself");

            var userLike = await _likesRepo.GetUserLike(sourceUserId, likedUser.Id);

            if (userLike != null)
                return BadRequest("You have already liked this user");
            
            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            }; 
            sourceUser.LikedUsers.Add(userLike); //adds this entry into the user table 

            if (await _userRepo.SaveAllAsync())
                return Ok();

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes(string predicate)
        {
            var users = await _likesRepo.GetUserLikes(predicate, int.Parse(User.GetUserId()));
            return Ok(users);
        }
    }
}