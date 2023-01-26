using System;

namespace Domain
{
    public class Restaurant
    {
        public Guid Id {get; set;}
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity {get; set;}
        public int Price { get; set; }
        public int Phone { get; set; }
    }
}