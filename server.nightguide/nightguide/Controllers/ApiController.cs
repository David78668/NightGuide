using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nightguide.Models;

namespace nightguide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly NightGuideDbContext _database;

        public ApiController(NightGuideDbContext context)
        {
            _database = context;
        }

        //GET DRINKS

        [HttpGet("GetDrinks")]
        public List<Drink> GetDrinks()
        {
            return _database.Drinks.ToList();
        }

        //GET CALCULATIONS

        [HttpGet("GetCalculations")]
        public List<CalculationResponse> GetCalculations()
        {
            List<CalculationResponse> response = new List<CalculationResponse>();

            foreach (CalculatorResult calculatorResult in _database.CalculatorResults.ToList())
            {
                response.Add(new CalculationResponse()
                {
                    CalculatorResult = calculatorResult,
                    Drinks = _database.DrinksInCalculatorResult.Where(d => d.CalculatorResultId == calculatorResult.Id).ToList(),
                });
            }

            return response;
        }

        //GET SEARCH LOGS

        [HttpGet("GetSearchLogs")]
        public List<SearchLog> GetSearchLogs()
        {
            return _database.SearchLogs.ToList();
        }


        //GET STATISTICS

        [HttpGet("GetStatistics")]
        public Statistic GetStatistics()
        {
            List<CalculatorResult> CalculatorResults = _database.CalculatorResults.ToList();
            List<DrinkInCalculatorResult> DrinksInResults = _database.DrinksInCalculatorResult.ToList();
            List<Drink> Drinks = _database.Drinks.ToList();

            int totalWeight = 0;
            int males = 0;
            int females = 0;
            double totalInitBAC = 0;
            double totalSoberUp = 0;

            foreach (CalculatorResult calc in CalculatorResults)
            {
                totalWeight += calc.Weight;
                if(calc.Gender == "man")
                {
                    males++;
                }
                else
                {
                    females++;
                }
                totalInitBAC += calc.InitialBAC;
                totalSoberUp += (calc.CalculationTime - calc.SoberUpTime).TotalMilliseconds;
            }

            var drinkGroupsById = DrinksInResults.GroupBy(d => d.DrinkId);
            var mostPopularDrink = drinkGroupsById.Select(g => new { DrinkID = g.Key, Count = g.Count() }).OrderByDescending(d => d.Count).FirstOrDefault();
            
            string popDrink = Drinks.Where(d => d.Id == mostPopularDrink.DrinkID).FirstOrDefault().Name;

            var totalSpendByDrink = drinkGroupsById.Select(g => new { DrinkID = g.Key, Count = g.Count()});

            int totalSpend = 0;

            foreach (var drink in totalSpendByDrink)
            {
                var drinkObj = Drinks.FirstOrDefault(d => d.Id == drink.DrinkID);
                if (drinkObj != null)
                {
                    totalSpend += (drinkObj.Price.Value * drink.Count);
                }
            }


            Statistic stats = new Statistic()
            {
                PopularDrink = popDrink,
                AvgWeight = totalWeight / CalculatorResults.Count,
                Males = males,
                Females = females,
                AvgInitBAC = totalInitBAC / CalculatorResults.Count,
                AvgSoberUpTimeMS = totalSoberUp / CalculatorResults.Count,
                AvgSpend = totalSpend / CalculatorResults.Count,

            };

            _database.Statistics.Add(stats);
            _database.SaveChanges();

            return stats;
        }

        //ADD DRINK

        public class CalculationResponse
        {
            public CalculatorResult CalculatorResult { get; set; }
            public List<DrinkInCalculatorResult> Drinks { get; set; }
        }

        [HttpPost("AddDrink")]
        public void AddDrink(Drink drink)
        {
            _database.Drinks.Add(drink);
            _database.SaveChanges();
        }


        //SAVE CALCULATION
        public class SaveCalculationRequest
        {
            public CalculatorResult CalculatorResult { get; set; }
            public List<RequestDrink> Drinks { get; set; }
        }

        public class RequestDrink
        {
            public Drink Drink { get; set; }
            public int Amount { get; set; }
        }

        [HttpPost("SaveCalculation")]
        public void SaveCalculation(SaveCalculationRequest data)
        {
            CalculatorResult calculatorResult = data.CalculatorResult;

            _database.CalculatorResults.Add(calculatorResult);
            _database.SaveChanges();

            foreach (RequestDrink requestDrink in data.Drinks)
            {
                DrinkInCalculatorResult drinkInCalculatorResult = new DrinkInCalculatorResult() { DrinkId = requestDrink.Drink.Id, Amount = requestDrink.Amount, CalculatorResultId = calculatorResult.Id };
                _database.DrinksInCalculatorResult.Add(drinkInCalculatorResult);
            }
            _database.SaveChanges();
        }

        //SAVE SEARCH LOG

        [HttpPost("SaveSearchLog")]
        public void SaveSearchLog(SearchLog log)
        {
            _database.SearchLogs.Add(log);
            _database.SaveChanges();
        }
    }
}
