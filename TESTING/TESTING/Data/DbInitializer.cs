using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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
                if (!context.Banoret.Any())
                {
                    context.Banoret.AddRange(new List<Banori>() {

                   new Banori {
                        Name = "Levrone Anabolic Double Impact 2kg",
                        Biografia =
                        "sit amet commodo magna eros quis urna.",
                        Price = 6000,
                        PictureUrl = "https://levrosupplements.com/856-large_default/levrone-anabolic-double-impact-2kg.jpg",
                        Profesioni = "Kevin Levrone Black Series",
                     
                        
                    CloudanaryPublicId =""


                    },
                new Banori
                {
                    Name = "Green Angular Board 3000",
                    Biografia = "Ma e mira ne bote.",
                    Price = 2000,
                    PictureUrl = "https://levrosupplements.com/878-large_default/levrone-anabolic-creatine-300g.jpg",
                    Profesioni = "Bad Ass",
                   
                    
                    CloudanaryPublicId =""

                }

                   });
                    context.SaveChanges();
                }
            }
        }
    }
}
        
   