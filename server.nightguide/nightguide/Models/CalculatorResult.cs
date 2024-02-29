using System.ComponentModel.DataAnnotations.Schema;

namespace nightguide.Models
{
    public class CalculatorResult
    {
        public int Id { get; set; }
        public DateTime CalculationTime { get; set; }
        public string Gender { get; set; }
        public int Weight { get; set; }
        public DateTime SoberUpTime { get; set; }
        public Double InitialBAC { get; set; }
    }
}
