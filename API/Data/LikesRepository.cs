using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context; 
        }
        
        //simply finds the user like entity that matches the primary key => sourceId and target UserId  
        public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
        {
            return await _context.Likes.FindAsync(sourceUserId, targetUserId);
        }
        
       //Allow us to check to see if user already has been liked by another user 
        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
        
        //return a list of user links based on the predicate 
        public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == userId);
                users = likes.Select(like => like.TargetUser); //filter out the users based on whats inside the likes list 
            }
            
            if (predicate == "likedBy")
            {
                likes = likes.Where(like => like.TargetUserId == userId);
                users = likes.Select(like => like.SourceUser); //filter out the users based on whats inside the likes list 
            }

            return await users.Select(user => new LikeDto
            {
                UserName = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(), 
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City, 
                Id = user.Id 
            }).ToListAsync();
        }
    }
}