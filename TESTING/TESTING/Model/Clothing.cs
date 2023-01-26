using System;

namespace Domain
{
    public class Clothing
    {
        public Guid Id {get; set;}
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }

    }
}