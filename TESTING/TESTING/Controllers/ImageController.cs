using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Buffers.Text;
using TESTING.Data;
using TESTING.Model;

namespace TESTING.Controllers;

    public class ImagesController : BaseApiController
    {
        
        public readonly AppDbContext _context;
        public ImagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await _context.Images.ToListAsync();
            return Ok(images);
        }
        [HttpGet]
        [Route("getbyid")]
        public async Task<IActionResult> Get(int id)
        {
            var images = await _context.Images.FindAsync(id);
            return Ok(images);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Image image)
        {
            _context.Images.Add(image);
            await _context.SaveChangesAsync();
            return Created($"/getbyid?id={image.Id}", image);
        }


        [HttpPut]
        public async Task<IActionResult> Update(Image image)
        {
            _context.Images.Update(image);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();  
            return NoContent();
        }

    }

