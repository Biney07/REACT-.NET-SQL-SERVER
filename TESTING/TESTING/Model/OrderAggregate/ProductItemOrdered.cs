using Microsoft.EntityFrameworkCore;

namespace TESTING.Model.OrderAggregate
{
    [Owned]
    public class BanoriItemOrdered
    {
        public int BanoriId { get; set; }       
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}