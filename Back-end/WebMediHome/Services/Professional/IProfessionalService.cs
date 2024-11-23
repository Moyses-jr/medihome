using WebMediHome.Model;

namespace WebMediHome.Services.Professional
{
    public interface IProfessionalService
    {
        Task<IEnumerable<ProfessionalModel>> GetAllProfessionalsAsync();
        Task<ProfessionalModel?> GetProfessionalByIdAsync(int id);
        Task AddProfessionalAsync(ProfessionalModel professional);
        Task UpdateProfessionalAsync(ProfessionalModel professional);
        Task DeleteProfessionalAsync(int id);
        Task AssociateClientAsync(int professionalId, int clientId);
        Task DisassociateClientAsync(int professionalId, int clientId);
        Task<ICollection<ClientModel>> GetAssociatedClientsAsync(int professionalId);
    }
}
