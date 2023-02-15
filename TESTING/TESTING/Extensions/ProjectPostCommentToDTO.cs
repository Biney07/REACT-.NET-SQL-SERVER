using System.Collections.Generic;
using System.Linq;
using TESTING.DTO.Post;
using TESTING.Model.Post;

namespace TESTING.Extensions
{
    public static class PostCommentExtensions
    {
        public static IQueryable<PostCommentDTO> ProjectPostCommentToDTO(this IQueryable<PostComment> comments)
        {
            return comments.Select(c => new PostCommentDTO
            {
                Id = c.Id,
                UserId = c.UserId,
                Content = c.Content,
                CreatedDate = c.CreatedDate,
                PostId = c.PostId
            });
        }

        public static IEnumerable<PostCommentDTO> MapPostCommentToDTO(this IEnumerable<PostComment> comments)
        {
            return comments.Select(c => new PostCommentDTO
            {
                Id = c.Id,
                UserId = c.UserId,
                Content = c.Content,
                CreatedDate = c.CreatedDate,
                PostId = c.PostId
            });
        }
    }
}
