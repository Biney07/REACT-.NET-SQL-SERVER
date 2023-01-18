using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TESTING.Model;

namespace TESTING.Data
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private ModelBuilder builder;

      

        public DbInitializer(AppDbContext context, UserManager<User> userManager, ModelBuilder builder)
        {
            this.builder = builder;
            _context = context;
            _userManager = userManager;

            if (!_userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };
                _userManager.CreateAsync(user, "Pa$$word").GetAwaiter().GetResult();

                _userManager.AddToRoleAsync(user, "Member").GetAwaiter().GetResult();
                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };
                _userManager.CreateAsync(user, "albin2002@").GetAwaiter().GetResult();
                _userManager.AddToRolesAsync(user, new[] { "Member", "Admin" }).GetAwaiter().GetResult();
            }
        }

        internal void Seed()
        {
            throw new NotImplementedException();
        }
    }
}
