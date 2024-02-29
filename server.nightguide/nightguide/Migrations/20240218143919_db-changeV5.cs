using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nightguide.Migrations
{
    /// <inheritdoc />
    public partial class dbchangeV5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                table: "SelectedDrinks");

            migrationBuilder.DropForeignKey(
                name: "FK_SelectedDrinks_Drinks_DrinkId",
                table: "SelectedDrinks");

            migrationBuilder.DropIndex(
                name: "IX_SelectedDrinks_DrinkId",
                table: "SelectedDrinks");

            migrationBuilder.AlterColumn<int>(
                name: "CalculatorResultId",
                table: "SelectedDrinks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                table: "SelectedDrinks",
                column: "CalculatorResultId",
                principalTable: "CalculatorResults",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                table: "SelectedDrinks");

            migrationBuilder.AlterColumn<int>(
                name: "CalculatorResultId",
                table: "SelectedDrinks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SelectedDrinks_DrinkId",
                table: "SelectedDrinks",
                column: "DrinkId");

            migrationBuilder.AddForeignKey(
                name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                table: "SelectedDrinks",
                column: "CalculatorResultId",
                principalTable: "CalculatorResults",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SelectedDrinks_Drinks_DrinkId",
                table: "SelectedDrinks",
                column: "DrinkId",
                principalTable: "Drinks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
