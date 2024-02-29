﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nightguide.Migrations
{
    /// <inheritdoc />
    public partial class dbchangeV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrinksInCalculatorResults");

            migrationBuilder.CreateTable(
                name: "SelectedDrinks",
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
                    table.PrimaryKey("PK_SelectedDrinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelectedDrinks_CalculatorResults_CalculatorResultId",
                        column: x => x.CalculatorResultId,
                        principalTable: "CalculatorResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SelectedDrinks_Drinks_DrinkId",
                        column: x => x.DrinkId,
                        principalTable: "Drinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SelectedDrinks_CalculatorResultId",
                table: "SelectedDrinks",
                column: "CalculatorResultId");

            migrationBuilder.CreateIndex(
                name: "IX_SelectedDrinks_DrinkId",
                table: "SelectedDrinks",
                column: "DrinkId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SelectedDrinks");

            migrationBuilder.CreateTable(
                name: "DrinksInCalculatorResults",
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
                    table.PrimaryKey("PK_DrinksInCalculatorResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrinksInCalculatorResults_CalculatorResults_CalculatorResultId",
                        column: x => x.CalculatorResultId,
                        principalTable: "CalculatorResults",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DrinksInCalculatorResults_Drinks_DrinkId",
                        column: x => x.DrinkId,
                        principalTable: "Drinks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DrinksInCalculatorResults_CalculatorResultId",
                table: "DrinksInCalculatorResults",
                column: "CalculatorResultId");

            migrationBuilder.CreateIndex(
                name: "IX_DrinksInCalculatorResults_DrinkId",
                table: "DrinksInCalculatorResults",
                column: "DrinkId");
        }
    }
}
