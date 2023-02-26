using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class full : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "55316697-4625-44af-a9c6-cb77e65163d6");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "0c79b0a5-06d7-41bc-87b6-b343b3df96e4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "a3ebbb93-e6b1-45dc-bab4-e2f30d295750");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "b592a01b-5d16-486c-ae89-29778c5f16e2");
        }
    }
}
