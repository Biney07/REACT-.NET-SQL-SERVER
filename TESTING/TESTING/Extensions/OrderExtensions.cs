
using Microsoft.EntityFrameworkCore;
using TESTING.DTO;
using TESTING.Model.OrderAggregate;

namespace TESTING.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDTO> ProjectOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDTO
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                    {
                        BanoriId = item.ItemOrdered.BanoriId,
                        Name = item.ItemOrdered.Name,
                        PictureUrl = item.ItemOrdered.PictureUrl,
                        Price = item.Price,
                        Quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}

