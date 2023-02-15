using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TESTING.Data;
using TESTING.DTO.Post;
using TESTING.Extensions;
using TESTING.Model.Post;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TESTING.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetCommentsByPostId/{postId}")]
        public async Task<ActionResult<IEnumerable<PostCommentDTO>>> GetCommentsByPostId(int postId)
        {
            var comments = await _context.PostComments.ProjectPostCommentToDTO()
                .Where(p => p.PostId == postId).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return Ok(comments);
        }

        [HttpPost]
        public async Task<ActionResult<PostCommentDTO>> CreateComment(PostCommentDTO commentDTO)
        {
            if (commentDTO == null)
            {
                return BadRequest();
            }

            var comment = new PostComment
            {
                UserId = commentDTO.UserId,
                Content = commentDTO.Content,
                CreatedDate = commentDTO.CreatedDate,
                PostId = commentDTO.PostId
            };

            _context.PostComments.Add(comment);
            await _context.SaveChangesAsync();

            commentDTO.Id = comment.Id;

            return CreatedAtAction(nameof(GetComment), new { id = commentDTO.Id }, commentDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostCommentDTO>> GetComment(int id)
        {
            var comment = await _context.PostComments.ProjectPostCommentToDTO()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PostCommentDTO>> DeleteComment(int id)
        {
            var comment = await _context.PostComments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            _context.PostComments.Remove(comment);
            await _context.SaveChangesAsync();

            var commentDTO = new PostCommentDTO
            {
                Id = comment.Id,
                UserId = comment.UserId,
                Content = comment.Content,
                CreatedDate = comment.CreatedDate,
                PostId = comment.PostId
            };

            return Ok(commentDTO);
        }
    }
}
