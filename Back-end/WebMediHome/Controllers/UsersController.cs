using Microsoft.AspNetCore.Mvc;
using WebMediHome.Dto.User;
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
            userObj.IdUser = 0;
            return Ok(await _userService.AddAndUpdateUser(userObj));
        }
    
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Put(int id, [FromBody] UserModel userObj)
        {
            userObj.IdUser = id;
            return Ok(await _userService.AddAndUpdateUser(userObj));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserId(int id)
        {
            var user = await _userService.GetUserId(id);

            if (user == null)
                return NotFound(new { message = "Usuário não encontrado" });

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthenticateRequest model)
        {
            var response = await _userService.Authenticate(model);
    
            return Ok(response);
        }
    
    }
}
