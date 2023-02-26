using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class eleminuar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Eleminuar",
                table: "Banoret",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "97834b87-df6d-4543-b6b9-d59925e6f46b");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "78c34db3-6462-4a6d-bb16-db8e212a8a87");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Eleminuar",
                table: "Banoret");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "82037df9-fb97-4676-b6a0-429597429c6e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "503a44e4-9df7-4670-bd00-556368dd8b3f");
        }
    }
}
