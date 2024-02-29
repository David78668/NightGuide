using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nightguide.Migrations
{
    /// <inheritdoc />
    public partial class dbchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drinks_CalculatorResults_CalculatorResultId",
                table: "Drinks");

            migrationBuilder.DropIndex(
                name: "IX_Drinks_CalculatorResultId",
                table: "Drinks");

            migrationBuilder.DropColumn(
                name: "CalculatorResultId",
                table: "Drinks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CalculatorResultId",
                table: "Drinks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_CalculatorResultId",
                table: "Drinks",
                column: "CalculatorResultId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drinks_CalculatorResults_CalculatorResultId",
                table: "Drinks",
                column: "CalculatorResultId",
                principalTable: "CalculatorResults",
                principalColumn: "Id");
        }
    }
}
