namespace TESTING.Model.OrderAggregate
{
    public class OrderItem
    {
        public int Id { get; set; }
        public BanoriItemOrdered ItemOrdered { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
    }
}