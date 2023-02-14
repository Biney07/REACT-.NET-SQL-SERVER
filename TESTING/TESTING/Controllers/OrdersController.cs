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
            var deliveryFee = subtotal > 50 ? 0 : 20;

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
                    mail.From = new MailAddress("nftkosova@gmail.com");
                    mail.To.Add(email);
                    mail.Subject = "Order Confirmation";
                    string emailBody = "Dear " + User.Identity.Name + ", \n\n";
                    emailBody += "Thank you for placing an order with us. Your order details are as follows:\n\n";
                    emailBody += "Order Number: " + order.Id + "\n";
                    emailBody += "Items Purchased:\n";
                    foreach (var orderItem in order.OrderItems)
                    {
                        emailBody += "- " + orderItem.ItemOrdered.Name + ", Quantity: " + orderItem.Quantity + ", Price: " + orderItem.Price + "\n";
                    }
                    emailBody += "Subtotal: " + order.Subtotal + "\n";
                    emailBody += "Delivery Fee: " + order.DeliveryFee + " EURO \n";
                    emailBody += "Total: " + order.GetTotal() + " EURO \n\n";
                    emailBody += "Shipping Address:\n";
                    emailBody += "State: " + order.ShippingAddress.State + ", ";
                    emailBody += "Country: " + order.ShippingAddress.Country + "\n";
                    emailBody += "Address 1: " + order.ShippingAddress.Address1 + "\n";
                    emailBody += "\nThank you for your business!\n\nBest regards,\n NFT KOSOVA";
                    mail.Body = emailBody;
                    mail.IsBodyHtml = false;
                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("nftkosova@gmail.com", "sfozefnhclxwfvkm");
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