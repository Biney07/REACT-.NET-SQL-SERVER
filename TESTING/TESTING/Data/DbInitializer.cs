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
                if (!context.Products.Any())
                {
                    context.Products.AddRange(new List<Product>() {

                   new Product {
                        Name = "Levrone Anabolic Double Impact 2kg",
                        Description =
                        "sit amet commodo magna eros quis urna.",
                        Price = 6000,
                        PictureUrl = "https://levrosupplements.com/856-large_default/levrone-anabolic-double-impact-2kg.jpg",
                        Brand = "Kevin Levrone Black Series",
                        Type = "Anabolic Protein",
                        QuantityInStock = 50,
                        
                    },
                new Product
                {
                    Name = "Green Angular Board 3000",
                    Description = "Ma e mira ne bote.",
                    Price = 2000,
                    PictureUrl = "https://levrosupplements.com/878-large_default/levrone-anabolic-creatine-300g.jpg",
                    Brand = "Bad Ass",
                    Type = "Creatine",
                    QuantityInStock = 70
                    
                }

                   });
                    context.SaveChanges();
                }
            }
        }
    }
}
        
   