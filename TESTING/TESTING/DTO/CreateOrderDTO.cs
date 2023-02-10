using TESTING.Model.OrderAggregate;

namespace TESTING.DTO
{
    public class CreateOrderDTO
    {
        public bool SaveAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}