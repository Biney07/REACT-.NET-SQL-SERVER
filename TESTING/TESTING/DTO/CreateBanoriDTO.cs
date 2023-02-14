
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace TESTING.DTO
{
    public class CreateBanoriDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Biografia { get; set; }

        
        [DefaultValue(100)]
        public long Price { get; set; }

        [Required]
        public IFormFile File { get; set; }

        [Required]
        public int Age { get; set; }
        [Required]
        public bool RelationshipStatus { get; set; }

        [Required]
        public string Profesioni { get; set; }

    }
}

