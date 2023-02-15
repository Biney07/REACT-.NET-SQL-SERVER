using System.Xml.Linq;

namespace TESTING.Model.Post
{
    public class Post
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public List<PostLike> Likes { get; set; } = new List<PostLike>();
        public List<PostComment> Comments { get; set; } = new List<PostComment>();
    }
 
}
