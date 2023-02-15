using TESTING.Model;

namespace TESTING.DTO.Post
{
    public class PostCommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;


        // navigation properties
        public int UserId { get; set; }
        public int PostId { get; set; }
    }

}
