namespace TESTING.DTO.Post
{
    public class PostLikeDTO
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;


        // navigation properties
        public int UserId { get; set; }
        public int PostId { get; set; }
    }

}
