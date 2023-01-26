using System;

namespace Domain
{
    public class BeautySallon
    {
        public Guid Id {get; set;}
        public string Name { get; set; }
        public string Description { get; set; }
        public string Artist {get; set;}
        public int Price { get; set; }
        public int Phone { get; set; }
    }
}