using Microsoft.EntityFrameworkCore;
using WebMediHome.Data;
using WebMediHome.Model;

namespace WebMediHome.Services.Client
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _dbContext;

        public ClientService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ClientModel>> GetAllClientsAsync()
        {
            return await _dbContext.Clients.ToListAsync();
        }

        public async Task<ClientModel?> GetClientByIdAsync(int id)
        {
            return await _dbContext.Clients.FindAsync(id);
        }

        public async Task AddClientAsync(ClientModel client)
        {
            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateClientAsync(ClientModel client)
        {
            var existingClient = await _dbContext.Clients.FindAsync(client.IdClient);
            if (existingClient != null)
            {
                existingClient.FirstName = client.FirstName;
                existingClient.LastName = client.LastName;
                existingClient.Password = client.Password;
                existingClient.CPF = client.CPF;
                existingClient.Email = client.Email;
                existingClient.PhoneNumber = client.PhoneNumber;
                existingClient.IsAdm = client.IsAdm;
                existingClient.IsActive = client.IsActive;
                existingClient.RegisterDate = client.RegisterDate;

                _dbContext.Clients.Update(existingClient);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteClientAsync(int id)
        {
            var client = await _dbContext.Clients.FindAsync(id);
            if (client != null)
            {
                _dbContext.Clients.Remove(client);
                await _dbContext.SaveChangesAsync();
            }
        }
        public async Task<ICollection<ProfessionalModel>> GetAssociatedProfessionalsAsync(int clientId)
        {
            return await _dbContext.ClientsProfessional
                .Where(cp => cp.ClientId == clientId)
                .Select(cp => cp.Professional)
                .ToListAsync();
        }
    }
}
