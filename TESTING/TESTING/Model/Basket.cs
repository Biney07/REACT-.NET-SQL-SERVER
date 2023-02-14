using System.Collections.Generic;
using System.Linq;
using TESTING.Model;

namespace TESTING.Model
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        public string? PaymentIntentId { get; set; }
        public string? ClientSecret { get; set; }

        public void AddItem(Banori banori, int quantity) // funksion per me shtu ni sen ne shport
        {
            if (Items.All(item => item.BanoriId != banori.Id))// a nuk gjindet elementi ne shport
            {
                Items.Add(new BasketItem{Banori = banori, Quantity = quantity});// shto ni element me ni produkt edhe sasi qe ja jepim si parameter
            }

            var existingItem = Items.FirstOrDefault(item => item.BanoriId == banori.Id); // inicializo itemin qe ekziston
            if (existingItem != null) existingItem.Quantity += quantity; // nese ekziston rritja sasin
        }

        public void RemoveItem(int banoriId, int quantity) // funksion per me hek ni sen pej shportes
        {
            var item = Items.FirstOrDefault(item => item.BanoriId == banoriId);// inicializo ni produkt 
            if (item == null) return; // nese ska sen kthehu
            item.Quantity -= quantity;// me zvoglu numrin
            if (item.Quantity == 0) Items.Remove(item);// me fshi nese ska sen
        }
    }
}