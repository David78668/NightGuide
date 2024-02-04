namespace nightguide.Models
{
    public class Drink
    {
        public int Id {  get; set; }
        public string Name { get; set; }
        public double Volume { get; set; }
        public int Alcohol { get; set; }
        public int? Price { get; set; }
        public string? Recipe { get; set; }
    }
}
