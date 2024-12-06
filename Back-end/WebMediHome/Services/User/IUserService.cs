using WebMediHome.Dto;
using WebMediHome.Dto.User;
using WebMediHome.Model;

namespace WebMediHome.Services.User
{
    public interface IUserService
    {
        Task<AuthenticateDTO?> Authenticate(LoginDTO model);
        //Task<IEnumerable<UserModel>> GetAll();
        Task<UserModel?> GetUserId(int id);
        Task<ResponseDTO<UserModel?>> AddAndUpdateUser(UserModel userObj);
    }
}
