using System.Linq;
using TESTING.DTO;
using TESTING.Model;
using TESTING.DTO;
using Microsoft.EntityFrameworkCore;

namespace TESTING.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    BanoriId = item.BanoriId,
                    Name = item.Banori.Name,
                    Price = item.Banori.Price,
                    PictureUrl = item.Banori.PictureUrl,
                    Quantity = item.Quantity


                }).ToList()
            };
        }

        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Banori).Where(b => b.BuyerId == buyerId);
        }
    }
}