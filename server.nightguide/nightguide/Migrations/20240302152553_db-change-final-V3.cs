using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace nightguide.Migrations
{
    /// <inheritdoc />
    public partial class dbchangefinalV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PopularDrink = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvgWeight = table.Column<int>(type: "int", nullable: false),
                    Males = table.Column<int>(type: "int", nullable: false),
                    Females = table.Column<int>(type: "int", nullable: false),
                    AvgInitBAC = table.Column<double>(type: "float", nullable: false),
                    AvgSpend = table.Column<int>(type: "int", nullable: false),
                    AvgSoberUpTimeMS = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Statistics");
        }
    }
}
