
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using TESTING.Model;

namespace TESTING.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {

        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Useri> Users { get; set; }
        public DbSet<Image> Images { get; set; }

        //to get the seed data
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole { Name="Member", NormalizedName="MEMBER"},
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );
        }



    }
}
