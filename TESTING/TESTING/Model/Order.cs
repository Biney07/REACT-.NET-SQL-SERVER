using System.ComponentModel.DataAnnotations.Schema;


namespace TESTING.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Number { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        
        public Customer? Customer { get; set; }


    }
}
