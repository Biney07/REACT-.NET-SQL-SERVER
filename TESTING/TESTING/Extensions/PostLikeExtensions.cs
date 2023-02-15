using System.Linq;

using TESTING.DTO.Post;
using TESTING.Model.Post;

namespace TESTING.Extensions
{
    public static class PostLikeExtensions
    {
        public static IQueryable<PostLikeDTO> ProjectPostLikeToDTO(this IQueryable<PostLike> likes)
        {
            return likes.Select(l => new PostLikeDTO
            {
                Id = l.Id,
                CreatedDate = l.CreatedDate,
                UserId = l.UserId,
                PostId = l.PostId
            });
        }
    }
}