using System.Linq;
using TESTING.DTO;
using TESTING.Model;
using TESTING.DTO;
using Microsoft.EntityFrameworkCore;
using TESTING.DTO.Post;
using TESTING.Model.Post;

namespace TESTING.Extensions
{
    public static class PostExtensions
    {
        public static IQueryable<PostDTO> ProjectPostToDTO(this IQueryable<Post> query)
        {
            return query 
                .Select(post => new PostDTO
            {
                Id = post.Id,
                UserId = post.UserId,
                Title= post.Title,
                Body= post.Body,
                CreatedDate= post.CreatedDate,
                Likes = post.Likes.Select(like => new PostLikeDTO 
                { 
                    Id = like.Id,
                    UserId = like.UserId,
                    PostId= like.PostId,
                    CreatedDate = like.CreatedDate,

                }).ToList(),
                Comments = post.Comments.Select(comment => new PostCommentDTO
                {
                    Id = comment.Id,
                    UserId = comment.UserId,
                    PostId = comment.PostId,
                    Content = comment.Content,
                    CreatedDate = comment.CreatedDate,

                }).ToList()
            }).AsNoTracking();
        }

      
    }
}