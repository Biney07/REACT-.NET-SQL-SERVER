﻿using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TESTING.Model;

namespace TESTING.Services
{
    public class TokenServices
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public TokenServices(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email)
            };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenOptions = new JwtSecurityToken(
                audience: null,
                issuer: null,
                claims: claims,
                signingCredentials: creds,
                expires: DateTime.Now.AddDays(7)

                );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);  
        }
    }
}
