using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.DTO.Post;
using TESTING.Extensions;
using TESTING.Model;
using TESTING.Model.Post;

namespace TESTING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        private readonly AppDbContext _context;
        //private readonly UserAddress _currentUser ;

        public LikesController(AppDbContext context)
        {
            _context = context;
            //_currentUser = currentUser;
        }
        //= AccountController.GetSavedAddress
        //public UserAddress CurrentUser => _currentUser;

        [HttpPost("Like/{postId}")]
        public async Task<IActionResult> LikePost(int postId, int userId)
        {
            var post = await _context.Posts.FindAsync(postId);

            //var user = await _context.Users.FindAsync(userId);
            if (post == null)
            {
                return NotFound();
            }

            post.Likes.Add(new PostLike
            {
                UserId = userId,
                PostId = postId,
                
            });

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("GetLikesByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<PostLikeDTO>>> GetLikesByUserId(int userId)
        {
            var likes = await _context.PostLikes.ProjectPostLikeToDTO()
                                        .Where(p => p.UserId == userId).ToListAsync();

            if (likes == null)
            {
                return NotFound();
            }

            return Ok(likes);
        }


        [HttpDelete("Unlike/{postId}/{userId}")]
        public async Task<IActionResult> UnlikePost(int postId, int userId)
        {
            var postLike = await _context.PostLikes.FirstOrDefaultAsync(p => p.PostId == postId && p.UserId == userId);

            if (postLike == null)
            {
                return NotFound();
            }

            _context.PostLikes.Remove(postLike);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
    