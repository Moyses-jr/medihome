using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebMediHome.Data;
using WebMediHome.Dto.User;
using WebMediHome.Model;

namespace WebMediHome.Services.User
{
    public class UserService : IUserService
    {
        public readonly AppDbContext _appDbContext;
        public readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSetings, AppDbContext appDbContext)
        {
            _appSettings = appSetings.Value;
            _appDbContext = appDbContext;
        }
        public async Task<IEnumerable<UserModel>> GetAll()
        {
            return await _appDbContext.Users.Where(x => x.IsActive == true).ToListAsync();
        }

        public async Task<UserModel?> GetUserId(int id)
        {
            return await _appDbContext.Users.FirstOrDefaultAsync(x => x.IdUser == id);
        }
        public async Task<ResponseModel<UserModel?>> AddAndUpdateUser(UserModel userObj)
        {
            bool isSuccess = false;
            UserModel? updatedUser = null;
            string message;

            if (userObj.IdUser > 0)
            {
                var obj = await _appDbContext.Users.FirstOrDefaultAsync(c => c.IdUser == userObj.IdUser);
                if (obj != null)
                {
                    obj.FirstName = userObj.FirstName;
                    obj.LastName = userObj.LastName;
                    _appDbContext.Users.Update(obj);
                    isSuccess = await _appDbContext.SaveChangesAsync() > 0;

                    if (isSuccess)
                    {
                        updatedUser = obj;
                        message = "Usuário atualizado com sucesso.";
                    }
                    else
                    {
                        message = "Falha ao atualizar o usuário.";
                    }
                }
                else
                {
                    message = "Usuário não encontrado.";
                }
            }
            else
            {
                await _appDbContext.Users.AddAsync(userObj);
                isSuccess = await _appDbContext.SaveChangesAsync() > 0;

                if (isSuccess)
                {
                    updatedUser = userObj;
                    message = "Usuário criado com sucesso.";
                }
                else
                {
                    message = "Falha ao criar o usuário.";
                }
            }

            return new ResponseModel<UserModel?>
            {
                Dados = updatedUser,
                Mensagem = message,
                Status = isSuccess
            };

        }

        public async Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model)
        {
            var user = await _appDbContext.Users.SingleOrDefaultAsync(x => x.Email == model.Email && x.Password == model.Password);

            if (user == null) return null;

            var token = await GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);

        }

        private async Task<string> GenerateJwtToken(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {

                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("IdUser", user.IdUser.ToString()) }),
                    Expires = DateTime.UtcNow.AddSeconds(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);

        }
    }
}
