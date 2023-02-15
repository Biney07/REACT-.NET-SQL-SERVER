using TESTING.Model;

namespace TESTING.Model.Post
{
    public class PostComment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        // navigation properties
        public int UserId { get; set; }
        //public User User { get; set; }

        public int PostId { get; set; }
        //public Post Post { get; set; }
    }

}
