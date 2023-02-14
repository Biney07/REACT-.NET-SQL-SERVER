
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace TESTING.DTO
{
    public class UpdateBanoriDTO
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Biografia { get; set; }

        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }

        [Required]
        public IFormFile File { get; set; }
        [Required]
        public bool RelationshipStatus { get; set; }
        [Required]
        public int Age { get; set; }


        [Required]
        public string Profesioni { get; set; }


    }
}

