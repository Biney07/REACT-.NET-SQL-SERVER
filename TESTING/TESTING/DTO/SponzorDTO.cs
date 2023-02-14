using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace TESTING.DTO
{
    public class SponzorDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [DefaultValue("00:00:00.0000000")]
        public DateTime StartDate { get; set; }
        [DefaultValue("00:00:00.0000000")]
        public DateTime EndDate { get; set; }

        [Required]
        public string Notes { get; set; }

        [Required]
        public IFormFile File { get; set; }

    }
    

    public class UpdateSponzorDTO {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Notes { get; set; }
        public IFormFile File { get; set; }

    }

}
