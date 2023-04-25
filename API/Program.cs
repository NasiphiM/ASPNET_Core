
using API.Middleware;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>(); //calling exception class for exception handling 

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200") );

// Authentication neeeds to be after useCors and before MapControllers 
app.UseAuthentication();   //check if this is valid user 
app.UseAuthorization();       //check if the valid user is allowed

app.MapControllers();

app.Run();
