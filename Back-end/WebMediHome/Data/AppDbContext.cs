using WebMediHome.Model;

namespace WebMediHome.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        //public DbSet<LivroModel> Livros { get; set; }
        //public DbSet<AutorModel> Autores { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<ClientModel> Clients { get; set; }
        public DbSet<ProfessionalModel> Professionals { get; set; }
        public DbSet<ClientProfessionalModel> ClientsProfessional { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuração da chave composta em ClientProfessional
            modelBuilder.Entity<ClientProfessionalModel>()
                .HasKey(cp => new { cp.ClientId, cp.ProfessionalId });

            // Configuração do relacionamento ClientModel -> ClientProfessional
            modelBuilder.Entity<ClientProfessionalModel>()
                .HasOne(cp => cp.Client)
                .WithMany(c => c.ClientProfessionals)
                .HasForeignKey(cp => cp.ClientId);

            // Configuração do relacionamento ProfessionalModel -> ClientProfessional
            modelBuilder.Entity<ClientProfessionalModel>()
                .HasOne(cp => cp.Professional)
                .WithMany(p => p.ClientProfessionals)
                .HasForeignKey(cp => cp.ProfessionalId);
        }

    }
}
