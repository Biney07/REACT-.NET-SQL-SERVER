using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class baskets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18e1b266-1588-4b0f-9147-728c6dde1284");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fbea22b5-2c09-4702-9920-665290856fc2");

      

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1d2b51b8-5584-4886-921b-e1fcd933d557", "c49ec85c-2505-47b3-9ebf-4c251fdce747", "Member", "MEMBER" },
                    { "af841aa9-9852-49aa-834e-114498ae56ad", "07790c2e-af18-4dad-aa0a-3d347704510e", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1d2b51b8-5584-4886-921b-e1fcd933d557");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af841aa9-9852-49aa-834e-114498ae56ad");


            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18e1b266-1588-4b0f-9147-728c6dde1284", "ead6fa73-71bf-458b-9294-6f38850c4c5c", "Admin", "ADMIN" },
                    { "fbea22b5-2c09-4702-9920-665290856fc2", "b5afc7bb-9786-4714-a6c4-032d4d5536e7", "Member", "MEMBER" }
                });
        }
    }
}
