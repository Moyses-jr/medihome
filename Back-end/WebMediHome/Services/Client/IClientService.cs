using WebMediHome.Model;

namespace WebMediHome.Services.Client
{
    public interface IClientService
    {
        Task<IEnumerable<ClientModel>> GetAllClientsAsync();
        Task<ClientModel?> GetClientByIdAsync(int id);
        Task<ClientModel?> GetClientByIdUserAsync(int idUser);
        Task AddClientAsync(ClientModel client);
        Task UpdateClientAsync(ClientModel client);
        //Task<ClientModel?> UpdateClientAsync(int idUser, ClientModel client);

        Task DeleteClientAsync(int id);
        Task<ICollection<ProfessionalModel>> GetAssociatedProfessionalsAsync(int clientId);

    }
}
