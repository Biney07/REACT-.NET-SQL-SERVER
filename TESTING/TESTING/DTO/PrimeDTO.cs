namespace TESTING.Model
{
    public class PrimeDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int week { get; set; }
        public string Description { get; set; }
        public string Lojrat { get; set; }
        public string Banoret { get; set; }
        public int clicks { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }

    public class UpdatePrimeDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int week { get; set; }
        public string Description { get; set; }
        public string Lojrat { get; set; }
        public string Banoret { get; set; }
        public int clicks { get; set; }
        public string VideoURL { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
