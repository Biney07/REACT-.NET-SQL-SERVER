using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class changees : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                    { "18cfaa95-c60b-4e17-88c9-d6326d62ea67", "65443d11-4739-425a-a6ce-36861811e3e6", "Member", "MEMBER" },
                    { "ae676cb3-1dab-4b26-88dd-2792957d685a", "53c08480-5018-4a53-967e-9c638401f3e8", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "5cb236bb-615c-49a7-b78a-a09b98ad2175", "a8bb8e54-8ecb-4abb-a6f0-1613bc9392b8", "Member", "MEMBER" },
                    { "fc52fd3f-3c9e-4c1d-98cc-fb525b7e8c44", "aba89dcd-f855-4ab2-8065-e3afcc3fa7cc", "Admin", "ADMIN" }
                });
        }
    }
}
