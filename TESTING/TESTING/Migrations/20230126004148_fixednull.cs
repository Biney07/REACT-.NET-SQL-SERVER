using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class fixednull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18cfaa95-c60b-4e17-88c9-d6326d62ea67");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ae676cb3-1dab-4b26-88dd-2792957d685a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "23ca1068-20f4-4b30-a146-66404f1478c7", "4831ae2c-7aec-42dd-a432-2ae23a6e5d2b", "Admin", "ADMIN" },
                    { "fcdb16a6-5e27-448a-9e14-7e63f1f5dce8", "e2d85b36-b2fe-4ee5-aed2-f3c4b6887602", "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "23ca1068-20f4-4b30-a146-66404f1478c7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fcdb16a6-5e27-448a-9e14-7e63f1f5dce8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18cfaa95-c60b-4e17-88c9-d6326d62ea67", "65443d11-4739-425a-a6ce-36861811e3e6", "Member", "MEMBER" },
                    { "ae676cb3-1dab-4b26-88dd-2792957d685a", "53c08480-5018-4a53-967e-9c638401f3e8", "Admin", "ADMIN" }
                });
        }
    }
}
