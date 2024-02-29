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

        [HttpGet("GetDrinks")]
        public List<Drink> GetDrinks()
        {
            return _database.Drinks.ToList();
        }

        [HttpGet("GetCalculations")]
        public List<CalculationResponse> GetCalculations()
        {
            List<CalculationResponse> response = new List<CalculationResponse>();

            foreach(CalculatorResult calculatorResult in _database.CalculatorResults.ToList())
            {
                response.Add(new CalculationResponse()
                {
                    CalculatorResult = calculatorResult,
                    Drinks = _database.DrinksInCalculatorResult.Where(d => d.CalculatorResultId == calculatorResult.Id).ToList(),
                });
            }

            return response;
        }

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

        [HttpPost("SaveCalculation")]
        public void SaveCalculation(SaveCalculationRequest data)
        {
            CalculatorResult calculatorResult = data.CalculatorResult;

            _database.CalculatorResults.Add(calculatorResult);
            _database.SaveChanges();

            foreach(RequestDrink requestDrink in data.Drinks)
            {
                DrinkInCalculatorResult drinkInCalculatorResult = new DrinkInCalculatorResult() { DrinkId = requestDrink.Drink.Id, Amount = requestDrink.Amount, CalculatorResultId = calculatorResult.Id};
                _database.DrinksInCalculatorResult.Add(drinkInCalculatorResult);
            }
            _database.SaveChanges();
        }

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


    }
}
