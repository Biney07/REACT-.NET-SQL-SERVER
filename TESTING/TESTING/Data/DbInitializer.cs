using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TESTING.Model;

namespace TESTING.Data
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();
                context.Database.EnsureCreated();

                // Seed Banoret if there are none in the database
                if (!context.Banoret.Any())
                {
                    context.Banoret.AddRange(new List<Banori>() {
                new Banori {
                    Name = "Vedai",
                    Biografia = "sit amet commodo magna eros quis urna.",
                    Price = 6000,
                    PictureUrl = "https://levrosupplements.com/856-large_default/levrone-anabolic-double-impact-2kg.jpg",
                    Profesioni = "Kevin Levrone Black Series",
                    CloudanaryPublicId = ""
                },
                new Banori {
                    Name = "Stresi",
                    Biografia = "Ma e mira ne bote.",
                    Price = 2000,
                    PictureUrl = "https://levrosupplements.com/878-large_default/levrone-anabolic-creatine-300g.jpg",
                    Profesioni = "Bad Ass",
                    CloudanaryPublicId = ""
                }
            });
                    context.SaveChanges();
                }

                if (!context.Roles.Any())
                {
                    var adminRole = new Role
                    {
                        Name = "Admin",
                        NormalizedName = "ADMIN"
                    };

                    context.Roles.Add(adminRole);
                    context.SaveChanges();
                }

                if (!context.Users.Any(u => u.UserName == "admin@gmail.com"))
                {
                    var user = new User
                    {
                        UserName = "admin@gmail.com",
                        Email = "admin@gmail.com",
                        EmailConfirmed = true
                    };

                    var password = new PasswordHasher<User>();
                    var hashed = password.HashPassword(user, "Albin2002@");
                    user.PasswordHash = hashed;

                    context.Users.Add(user);
                    context.SaveChanges();

                    var adminRole = context.Roles.First(r => r.NormalizedName == "ADMIN");

                    var userRole = new IdentityUserRole<int>
                    {
                        UserId = user.Id,
                        RoleId = adminRole.Id
                    };

                    context.UserRoles.Add(userRole);
                    context.SaveChanges();
                }
            }
        }

    }
}