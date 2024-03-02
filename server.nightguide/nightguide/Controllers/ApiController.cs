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
            return _database.SearchLogs.ToList();>
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
