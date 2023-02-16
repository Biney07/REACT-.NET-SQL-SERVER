using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.DTO;
using TESTING.DTO.Post;
using TESTING.Extensions;
using TESTING.Model;
using TESTING.Model.Post;

namespace TESTING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        //[HttpGet(Name = "GetPosts")]
        //public async Task<ActionResult<PostDTO>> GetPosts()
        //{
        //    //var basket = await RetrieveBasket(GetUserId());
        //    return await _context.Posts.ProjectPostToDTO().ToListAsync();
        //    //.Where(x => x.BuyerId == User.Identity.Name)


        //    //if (posts == null) return NotFound();

        //    //return posts.MapPostToDTO();
        //}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _context.Posts.ProjectPostToDTO().ToListAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            var post = await _context.Posts.ProjectPostToDTO()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }
        [HttpPost]
        public async Task<ActionResult<PostDTO>> CreatePost(PostDTO postDTO)
        {
            if (postDTO == null)
            {
                return BadRequest();
            }

            var post = new Post
            {
                UserId = postDTO.UserId,
                Title = postDTO.Title,
                Body = postDTO.Body,
                CreatedDate = postDTO.CreatedDate
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            postDTO.Id = post.Id;

            return CreatedAtAction(nameof(GetPost), new { id = postDTO.Id }, postDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, PostDTO postDTO)
        {
            if (id != postDTO.Id)
            {
                return BadRequest();
            }

            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            post.Title = postDTO.Title;
            post.Body = postDTO.Body;

            try
            {
                _context.Posts.Update(post);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(p => p.Id == id);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<PostDTO>> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            var postDTO = new PostDTO
            {
                Id = post.Id,
                UserId = post.UserId,
                Title = post.Title,
                Body = post.Body,
                CreatedDate = post.CreatedDate
            };

            return Ok(postDTO);
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

    }
}
