namespace TESTING.Model
{
    public class MomentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int ViewCount { get; set; }

    }

    public class UpdateMomentDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int clicks { get; set; }
        public string Description { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int ViewCount { get; set; } = 0;

    }
}
