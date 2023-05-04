using System.Data.Common;
using API.Entities;
using API.DTOs;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context; 
        private readonly IMapper _mapper; 
        public UserRepository(DataContext context,IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.Include(p => p.Photos).
                SingleOrDefaultAsync(x => x.UserName == username);
        }
        
        //Paginate because if you had a million users , we dont wanna return all million 
        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .AsNoTracking();

            return await PagedList<MemberDTO>.CreateAsync(query, userParams.PageNum, userParams.PageSize); 
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
    }
}