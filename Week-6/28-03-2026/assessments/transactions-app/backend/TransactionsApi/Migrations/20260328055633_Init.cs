using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TransactionsApi.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Balance = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Transactions",
                columns: new[] { "Id", "Amount", "Balance", "Date", "Description", "Type" },
                values: new object[,]
                {
                    { 1, 1985.40m, "$12,234.45", "2019-12-03", "HACKERBANK INC. DES:CCD+ ID: 33375894749", 0 },
                    { 2, 42.99m, "$12,191.46", "2019-12-05", "AMAZON MKTPL DES:AMZN.COM ID: 994020234", 1 },
                    { 3, 3250.00m, "$15,441.46", "2019-12-07", "PAYROLL DES:DIRECT DEP ID: 887654321", 0 },
                    { 4, 15.99m, "$15,425.47", "2019-12-10", "NETFLIX DES:SUBSCR ID: 442001233", 1 },
                    { 5, 89.34m, "$15,336.13", "2019-12-12", "WHOLE FOODS MKT DES:PURCHASE ID: 00192344", 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Transactions");
        }
    }
}
