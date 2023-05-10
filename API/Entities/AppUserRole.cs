using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //Represent the join table bewtween app users and roles 
    public class AppUserRole  : IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        
        public AppRole Role { get; set; }
        
    }
}