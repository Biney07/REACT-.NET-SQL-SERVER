﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TESTING.DTO;
using TESTING.Model;
using TESTING.Services;

namespace TESTING.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenServices _tokenService;

        public AccountController(UserManager<User> userManager, TokenServices tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpGet("getAllUsers")]
        public async Task<ActionResult<List<UserDTO>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = new List<UserDTO>();
            foreach (var user in users)
            {
                userDtos.Add(new UserDTO
                {
                    Email = user.Email,
                    Username = user.UserName,
                    Token = await _tokenService.GenerateToken(user)
                });
            }
            return userDtos;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized();

            return new UserDTO
            {
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
         }
    
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDTO registerDTO)
    {
        var user = new User { UserName = registerDTO.Username, Email = registerDTO.Email };
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
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }
}
}
