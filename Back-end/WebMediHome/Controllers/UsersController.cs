using Microsoft.AspNetCore.Mvc;
using WebMediHome.Model;
using WebMediHome.Security;
using WebMediHome.Services.User;

namespace WebMediHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
    
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
    
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserModel userObj)
        {
            userObj.Id = 0;
            return Ok(await _userService.AddAndUpdateUser(userObj));
        }
    
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] UserModel userObj)
        {
            userObj.Id = id;
            return Ok(await _userService.AddAndUpdateUser(userObj));
        }
    
        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);
    
            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });
    
            return Ok(response);
        }
    
    }
}
