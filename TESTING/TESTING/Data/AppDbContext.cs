
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.Emit;
using TESTING.Model;
using TESTING.Model.OrderAggregate;


namespace TESTING.Data
{
    public class AppDbContext : IdentityDbContext<User,Role,int>
    {

        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Image> Images { get; set; }
        public DbSet<Banori> Banoret { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Sponzor> Sponzors { get; set; }

        //to get the seed data
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
                  .HasOne(a => a.Address)
                  .WithOne()
                  .HasForeignKey<UserAddress>(a => a.Id)
                  .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
                    new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" });
        }
       
      



    }
}
