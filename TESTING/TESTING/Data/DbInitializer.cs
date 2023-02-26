using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Collections.Generic;
using TESTING.Model;

namespace TESTING.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(AppDbContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var admin = new User
                {
                    UserName = "Admin",
                    Email = "admin@gmail.com"
                };

                await userManager.CreateAsync(admin, "Albin2002@");
                await userManager.AddToRoleAsync(admin, "Admin");

                var user = new User
                {
                    UserName = "User",
                    Email = "user@gmail.com"
                };

                await userManager.CreateAsync(user, "User2002@");
                await userManager.AddToRolesAsync(user, new[] { "Member"});
            }


            if (context.Banoret.Any()) return;

            var products = new List<Banori>
            {
                new Banori
                {
                    Name = "Stresi",
                    Biografia =
                        "Stresi djali qe po qmend Boten",
                    Price = 20000,
                    PictureUrl = "https://static.wikia.nocookie.net/bigbrother/images/9/90/KosovoVIP1_Stresi_Large.jpg/revision/latest?cb=20221206074754",
                    Profesioni = "KENGTAR",
                    Age= 30,    
                },
             
            };

            foreach (var product in products)
            {
                context.Banoret.Add(product);
            }

            context.SaveChanges();
        }
    }
}
