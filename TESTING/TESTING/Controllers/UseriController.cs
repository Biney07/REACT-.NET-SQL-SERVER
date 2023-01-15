using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;

namespace TESTING.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UseriController : ControllerBase
    {
        
        public readonly AppDbContext _context;
        public UseriController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        [HttpGet]
        [Route("getbyid")]
        public async Task<IActionResult> Get(int id)
        {
            var Users = await _context.Users.FindAsync(id);
            return Ok(Users);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Useri user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Created($"/getbyid?id={user.Id}", user);
        }


        [HttpPut]
        public async Task<IActionResult> Update(Useri user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();  
            return NoContent();
        }

    }
}
