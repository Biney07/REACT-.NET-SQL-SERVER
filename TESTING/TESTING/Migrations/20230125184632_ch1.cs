using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class ch1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "42a1a670-ca95-4353-a711-8cf7b667dd03");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "573725d7-8d74-4522-a71b-560ca01af396");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "085d0e39-dd75-4a40-b2b4-c2c86b6454f1", "a5a154d4-3122-44b4-8695-9b506f008579", "Member", "MEMBER" },
                    { "8798c6d6-6d8c-417c-a2b4-dd44f1d942cd", "f042daba-e0e0-4e86-a561-165f56370b38", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "085d0e39-dd75-4a40-b2b4-c2c86b6454f1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8798c6d6-6d8c-417c-a2b4-dd44f1d942cd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "42a1a670-ca95-4353-a711-8cf7b667dd03", "d27e84db-dd8f-4b44-98d8-2ff39323eec8", "Admin", "ADMIN" },
                    { "573725d7-8d74-4522-a71b-560ca01af396", "f1dd33f4-1f99-41ba-9f39-f70b355bdfaf", "Member", "MEMBER" }
                });
        }
    }
}
