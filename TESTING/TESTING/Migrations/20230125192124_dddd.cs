using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class dddd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "5cb236bb-615c-49a7-b78a-a09b98ad2175", "a8bb8e54-8ecb-4abb-a6f0-1613bc9392b8", "Member", "MEMBER" },
                    { "fc52fd3f-3c9e-4c1d-98cc-fb525b7e8c44", "aba89dcd-f855-4ab2-8065-e3afcc3fa7cc", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5cb236bb-615c-49a7-b78a-a09b98ad2175");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fc52fd3f-3c9e-4c1d-98cc-fb525b7e8c44");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "085d0e39-dd75-4a40-b2b4-c2c86b6454f1", "a5a154d4-3122-44b4-8695-9b506f008579", "Member", "MEMBER" },
                    { "8798c6d6-6d8c-417c-a2b4-dd44f1d942cd", "f042daba-e0e0-4e86-a561-165f56370b38", "Admin", "ADMIN" }
                });
        }
    }
}
