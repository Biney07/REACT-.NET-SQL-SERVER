using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class small : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9577c378-ca00-469a-be3b-c56b19afdcc8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "beaef7cc-6a59-4335-9821-dc5452801aa5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "42a1a670-ca95-4353-a711-8cf7b667dd03", "d27e84db-dd8f-4b44-98d8-2ff39323eec8", "Admin", "ADMIN" },
                    { "573725d7-8d74-4522-a71b-560ca01af396", "f1dd33f4-1f99-41ba-9f39-f70b355bdfaf", "Member", "MEMBER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "9577c378-ca00-469a-be3b-c56b19afdcc8", "560cf3f1-cd2d-4e84-b851-8fe7c3d91361", "Admin", "ADMIN" },
                    { "beaef7cc-6a59-4335-9821-dc5452801aa5", "c0333f6b-5b26-47fe-8f07-70cbe57d36a5", "Member", "MEMBER" }
                });
        }
    }
}
