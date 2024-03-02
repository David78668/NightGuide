namespace nightguide.Models
{
    public class Statistic
    {
        public int Id { get; set; }
        public string PopularDrink { get; set; }
        public int AvgWeight { get; set; }
        public int Males { get; set; }
        public int Females { get; set; }
        public double AvgInitBAC { get; set; }
        public int AvgSpend { get; set; }
        public double AvgSoberUpTimeMS { get; set; }
    }
}
