namespace WebMediHome.Model
{
    public class ClientProfessionalModel
    {
        public int ClientId { get; set; }
        public ClientModel Client { get; set; } = null!;
        public int ProfessionalId { get; set; }
        public ProfessionalModel Professional { get; set; } = null!;
    }
}
