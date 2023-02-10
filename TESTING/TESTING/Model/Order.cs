using System.ComponentModel.DataAnnotations.Schema;
using TESTING.DTO;

namespace TESTING.Model
{
    public class Order
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public List<OrderItem> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public long DeliveryFee { get; set; }
        public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;

        public long GetTotal()
        {
            return Subtotal + DeliveryFee;
        }
        public int CustomerId { get; set; }
        public string Number { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        
        public Customer? Customer { get; set; }


    }
}