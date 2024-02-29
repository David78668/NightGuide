using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace nightguide.Models
{
    public class NightGuideDbContext : DbContext
    {
        public NightGuideDbContext(DbContextOptions<NightGuideDbContext> options) : base(options)
        {

        }

        public DbSet<Drink> Drinks { get; set; }
        public DbSet<CalculatorResult> CalculatorResults { get; set; }
        public DbSet<DrinkInCalculatorResult> DrinksInCalculatorResult { get; set; }
    }
}
