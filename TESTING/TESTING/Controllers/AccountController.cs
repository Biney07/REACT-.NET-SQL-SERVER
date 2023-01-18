using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TESTING.DTO;
using TESTING.Model;
using TESTING.Services;

namespace TESTING.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }
            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
         }
    
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDTO registerDTO)
    {
        var user = new User { UserName = registerDTO.UserName, Email = registerDTO.Email };
        var result = await _userManager.CreateAsync(user, registerDTO.Password);
        //if there are error validate and repeat until the succesful credintentials are created
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }
            return ValidationProblem();
        }
        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);// cheating consider is working fine
    }
        [Authorize]// if he didnt write the right credidentials than he will not have the rights to use this 
        [HttpGet("getUser")]
        public async Task<ActionResult<UserDTO>> GetUser() {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }
}
}
