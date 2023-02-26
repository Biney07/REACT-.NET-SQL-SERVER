using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TESTING.Migrations
{
    /// <inheritdoc />
    public partial class ndryshime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Banoret_Nominimet_NominimetId",
                table: "Banoret");

            migrationBuilder.DropTable(
                name: "Nominimet");

            migrationBuilder.DropIndex(
                name: "IX_Banoret_NominimetId",
                table: "Banoret");

            migrationBuilder.DropColumn(
                name: "NominimetId",
                table: "Banoret");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "60e79146-8da1-4e36-b7ba-418ef4773968");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "ConcurrencyStamp",
                value: "6252be1c-474e-43b8-9a11-e087eff5c333");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NominimetId",
                table: "Banoret",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Nominimet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nominimet", x => x.Id);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Banoret_NominimetId",
                table: "Banoret",
                column: "NominimetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Banoret_Nominimet_NominimetId",
                table: "Banoret",
                column: "NominimetId",
                principalTable: "Nominimet",
                principalColumn: "Id");
        }
    }
}
