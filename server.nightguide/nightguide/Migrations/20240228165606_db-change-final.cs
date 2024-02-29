using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nightguide.Migrations
{
    /// <inheritdoc />
    public partial class dbchangefinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectedDrinks");

            migrationBuilder.CreateTable(
                name: "DrinksInCalculatorResult",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrinkId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    CalculatorResultId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrinksInCalculatorResult", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrinksInCalculatorResult");

            migrationBuilder.CreateTable(
                name: "SelectedDrinks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    CalculatorResultId = table.Column<int>(type: "int", nullable: true),
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelectedDrinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                        column: x => x.CalculatorResultId,
                        principalTable: "CalculatorResults",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SelectedDrinks_CalculatorResultId",
                table: "SelectedDrinks",
                column: "CalculatorResultId");
        }
    }
}
