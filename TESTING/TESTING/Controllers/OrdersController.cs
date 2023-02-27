using System.Collections.Generic;
using System.Linq;

using TESTING.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Controllers;
using TESTING.Data;
using TESTING.DTO;
//using TESTING.Extensions;
using TESTING.Model;
using TESTING.Model.OrderAggregate;
using System.Net.Mail;
using Microsoft.Build.Evaluation;
using System.Globalization;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly AppDbContext _context;
        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDTO>>> GetOrders()
        {
            return await _context.Orders
               .ProjectOrderToOrderDTO()
               .Where(x => x.BuyerId == User.Identity.Name)
               .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDTO()
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
            .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Could not locate basket" });

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var banoriItem = await _context.Banoret.FindAsync(item.BanoriId);
                var itemOrdered = new BanoriItemOrdered
                {
                    BanoriId = banoriItem.Id,
                    Name = banoriItem.Name,
                    PictureUrl = banoriItem.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = banoriItem.Price,
                    Quantity = item.Quantity

                };
                items.Add(orderItem);
               
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var deliveryFee = subtotal > 200 ? 0 : 10;

            var order = new Order
            {
                OrderItems = items,
                Subtotal = subtotal,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDTO.ShippingAddress,
                DeliveryFee = deliveryFee,
                PaymentIntentId = basket.PaymentIntentId
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDTO.SaveAddress)
            {
                var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    FullName = orderDTO.ShippingAddress.FullName,
                    Address1 = orderDTO.ShippingAddress.Address1,
                    Address2 = orderDTO.ShippingAddress.Address2,
                    City = orderDTO.ShippingAddress.City,
                    State = orderDTO.ShippingAddress.State,
                    Zip = orderDTO.ShippingAddress.Zip,
                    Country = orderDTO.ShippingAddress.Country
                };
                user.Address = address;
            }

            var result = await _context.SaveChangesAsync() > 0;
            try {
                var user = await _context.Users
    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var email = user.Email;

                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("bigbrothervipkosovaa@gmail.com");
                    mail.To.Add(email);
                    mail.Subject = "Order Confirmation";
                    string emailBody = "I/e Dashur " + User.Identity.Name + ", \n\n";
                    emailBody += "Faleminderit qe votuat per banoret e preferuar ne shtepine me te madhe ne Kosove!\n\n";
                    emailBody += "Vota ID: " + order.Id + "\n";
                    emailBody += "Ju votuat per:\n";
                    foreach (var orderItem in order.OrderItems)
                    {
                        decimal PRICE = orderItem.Price / 100;
                        string PRICE_FORMATED = PRICE.ToString("0.00");
                        emailBody += "- " + orderItem.ItemOrdered.Name + ", Numri i votave: " + orderItem.Quantity + ", Qmimi: " + PRICE_FORMATED + "\n";
                    }
                    decimal Subtotal = order.Subtotal / 10000;
                    string subtotal_formatted = subtotal.ToString("0.00");
                    emailBody += "Nentotali: " + subtotal_formatted + "\n";
                    decimal TAX = order.DeliveryFee / 100;
                    string TAX_formatted = TAX.ToString("0.00");
                    emailBody += "Tax: " + TAX_formatted + " EURO \n";
                    decimal TOTAL = order.GetTotal() / 100;
                    string TOTAL_formatted = TOTAL.ToString("0.00");
                    emailBody += "Totali: " + TOTAL_formatted + " EURO \n\n";   
                   
                    mail.Body = emailBody;
                    mail.IsBodyHtml = false;
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("bigbrothervipkosovaa@gmail.com", "fyujsaxpygbiiacy");
                        smtp.EnableSsl = true;
                        await smtp.SendMailAsync(mail);
                    }
                }
            }
            catch
            {
                // Log error message or display error message to user
            }

            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);

            return BadRequest(new ProblemDetails { Title = "Problem creating order" });
        }
    }
}