using WebMediHome.Data;
using WebMediHome.Dto.Client;
using WebMediHome.Dto.User;
using WebMediHome.Model;

namespace WebMediHome.Services.Profile
{
    public class ProfileService : IProfileService
    {
        private readonly AppDbContext _dbContext;

        public ProfileService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // Buscar informações
        public async Task<object?> GetProfileAsync(int userId)
        {
            // Busca por cliente vinculado ao usuário
            var client = await _dbContext.Clients
                .Include(c => c.User)
                .FirstOrDefaultAsync(c => c.IdUser == userId);

            if (client != null)
            {
                // Retorna o ClientDTO
                return new ClientDTO
                {
                    IdClient = client.IdClient,
                    IdUser = client.IdUser,
                    FirstName = client.FirstName,
                    LastName = client.LastName,
                    Email = client.Email,
                    CPF = client.CPF,
                    PhoneNumber = client.PhoneNumber,
                    RegisterBorn = client.RegisterBorn,
                    RegisterDate = client.RegisterDate
                };
            }

            // Caso não seja cliente, busca apenas o usuário
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.IdUser == userId);

            if (user != null)
            {
                // Retorna o UserDTO
                return new UserDTO
                {
                    IdUser = user.IdUser,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                };
            }

            // Retorna null caso não encontre nada
            return null;
        }

        public async Task<bool> UpdateProfileAsync(int userId, ClientModel updatedProfile)
        {
            var client = await _dbContext.Clients
                .FirstOrDefaultAsync(c => c.IdUser == userId);

            if (client != null)
            {
                client.FirstName = updatedProfile.FirstName;
                client.LastName = updatedProfile.LastName;
                client.Email = updatedProfile.Email;
                client.CPF = updatedProfile.CPF;
                client.PhoneNumber = updatedProfile.PhoneNumber;
                client.RegisterBorn = updatedProfile.RegisterBorn;

                // Atualiza as informações do usuário associado
                if (client.User != null)
                {
                    client.User.FirstName = updatedProfile.FirstName;
                    client.User.LastName = updatedProfile.LastName;
                    client.User.Email = updatedProfile.Email;
                }
            }
            else
            {
                var user = await _dbContext.Users
                    .FirstOrDefaultAsync(u => u.IdUser == userId);

                if (user == null) return false;

                user.FirstName = updatedProfile.FirstName;
                user.LastName = updatedProfile.LastName;
                user.Email = updatedProfile.Email;
            }

            var changes = await _dbContext.SaveChangesAsync();
            return changes > 0;
        }
    }
}