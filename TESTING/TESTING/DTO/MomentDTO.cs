namespace TESTING.Model
{
    public class MomentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

    }

    public class UpdateMomentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = new DateTime();

    }
}
