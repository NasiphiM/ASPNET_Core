using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub 
    {
        public override async Task OnConnectedAsync()
        {
            
            //sending message to notify others client is online besides user themselves  
            await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername()); 
        }
        
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());

            await base.OnDisconnectedAsync(exception); 

        }
    }
}