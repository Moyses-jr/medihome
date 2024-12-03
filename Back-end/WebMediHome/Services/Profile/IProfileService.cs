using WebMediHome.Model;

namespace WebMediHome.Services.Profile
{
    public interface IProfileService
    {
        Task<object?> GetProfileAsync(int userId);
        Task<bool> UpdateProfileAsync(int userId, ClientModel updatedProfile, string? newPassword = null);
    }
}
