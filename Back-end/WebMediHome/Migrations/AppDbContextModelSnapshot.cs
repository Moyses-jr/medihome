﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebMediHome.Data;

#nullable disable

namespace WebMediHome.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("WebMediHome.Model.ClientModel", b =>
                {
                    b.Property<int>("IdClient")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("IdClient"));

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasMaxLength(11)
                        .HasColumnType("varchar(11)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("IdUser")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsAdm")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateOnly>("RegisterBorn")
                        .HasColumnType("date");

                    b.Property<DateOnly>("RegisterDate")
                        .HasColumnType("date");

                    b.HasKey("IdClient");

                    b.HasIndex("IdUser");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("WebMediHome.Model.ClientProfessionalModel", b =>
                {
                    b.Property<int>("ClientId")
                        .HasColumnType("int");

                    b.Property<int>("ProfessionalId")
                        .HasColumnType("int");

                    b.HasKey("ClientId", "ProfessionalId");

                    b.HasIndex("ProfessionalId");

                    b.ToTable("ClientsProfessional");
                });

            modelBuilder.Entity("WebMediHome.Model.ProfessionalModel", b =>
                {
                    b.Property<int>("IdProfessional")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("IdProfessional"));

                    b.Property<string>("CNPJ")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CRM")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateOnly>("ExpirationCRM")
                        .HasColumnType("date");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ProfessionalType")
                        .IsRequired()
                        .HasColumnType("varchar(1)");

                    b.Property<DateOnly>("RegisterDate")
                        .HasColumnType("date");

                    b.HasKey("IdProfessional");

                    b.ToTable("Professionals");
                });

            modelBuilder.Entity("WebMediHome.Model.UserModel", b =>
                {
                    b.Property<int>("IdUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("IdUser"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("IdUser");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebMediHome.Model.ClientModel", b =>
                {
                    b.HasOne("WebMediHome.Model.UserModel", "User")
                        .WithMany("Client")
                        .HasForeignKey("IdUser")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebMediHome.Model.ClientProfessionalModel", b =>
                {
                    b.HasOne("WebMediHome.Model.ClientModel", "Client")
                        .WithMany("ClientProfessionals")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebMediHome.Model.ProfessionalModel", "Professional")
                        .WithMany("ClientProfessionals")
                        .HasForeignKey("ProfessionalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Professional");
                });

            modelBuilder.Entity("WebMediHome.Model.ClientModel", b =>
                {
                    b.Navigation("ClientProfessionals");
                });

            modelBuilder.Entity("WebMediHome.Model.ProfessionalModel", b =>
                {
                    b.Navigation("ClientProfessionals");
                });

            modelBuilder.Entity("WebMediHome.Model.UserModel", b =>
                {
                    b.Navigation("Client");
                });
#pragma warning restore 612, 618
        }
    }
}
