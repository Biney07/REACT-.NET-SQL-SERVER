using System.ComponentModel.DataAnnotations.Schema;
using TESTING.Model;

namespace TESTING.Model
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int BanoriId { get; set; }
        public Banori Banori { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}