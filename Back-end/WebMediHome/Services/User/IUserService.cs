using WebMediHome.Dto.User;
using WebMediHome.Model;

namespace WebMediHome.Services.User
{
    public interface IUserService
    {
        Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model);
        //Task<IEnumerable<UserModel>> GetAll();
        Task<UserModel?> GetUserId(int id);
        Task<ResponseModel<UserModel?>> AddAndUpdateUser(UserModel userObj);
    }
}
