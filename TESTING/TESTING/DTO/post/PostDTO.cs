using TESTING.Model.Post;

namespace TESTING.DTO.Post
{
    public class PostDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public List<PostLikeDTO> Likes { get; set; }
        public List<PostCommentDTO> Comments { get; set; }
    }

}
