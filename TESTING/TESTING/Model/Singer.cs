using System;

namespace Domain
{
    public class Singer
    {
        public Guid Id {get; set;}
        public string FullName { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

    }
}