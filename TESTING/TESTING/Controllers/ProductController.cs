using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.Model;

namespace TESTING.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {

            return await _context.Products.ToListAsync();
            
        }

        [HttpGet]
        [Route("getbyid")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var products = await _context.Products.FindAsync(id);
            return Ok(products);
        }
    }
}
