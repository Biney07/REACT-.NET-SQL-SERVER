﻿using System.ComponentModel.DataAnnotations.Schema;
using TESTING.DTO;

namespace TESTING.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
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
    }
}