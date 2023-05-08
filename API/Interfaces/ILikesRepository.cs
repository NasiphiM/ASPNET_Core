using API.DTOs;
using API.Entities;

namespace API.Interfaces
{

    public interface ILikesRepository
    {
        //the two parameters makne up the primary key of the entity that lives inside the Likes Table 
        Task<UserLike> GetUserLike(int sourceUserId, int targetUserId); //returns the entity 
        

        Task<AppUser> GetUserWithLikes(int userId); // gonna return our app user entity 

        Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId); //returns a link to a list of linked DTA's 
    }
}