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

        [HttpPost("AddDrink")]
        public void AddDrink(Drink drink)
        {
            _database.Drinks.Add(drink);
            _database.SaveChanges();
        }
    }
}
