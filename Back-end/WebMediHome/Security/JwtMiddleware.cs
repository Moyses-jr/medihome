using WebMediHome.Model;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WebMediHome.Services.User;

namespace WebMediHome.Security
{
    public class JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
    {
        private readonly RequestDelegate _next = next;
        private readonly AppSettings _appSettings = appSettings.Value;

        public async Task Invoke(HttpContext context, IUserService userService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
            {
                await AttachUserToContext(context, userService, token);
            }
            await _next(context);
        }

        private async Task AttachUserToContext(HttpContext context, IUserService userService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "Id");
                if (userIdClaim == null)
                {
                    Console.WriteLine("Id do usuário não encontrado.");
                    return;
                }

                var userId = int.Parse(userIdClaim.Value);

                // Vincular o usuário ao contexto
                var user = await userService.GetById(userId);
                if (user != null)
                {
                    context.Items["User"] = user;
                    Console.WriteLine($"Usuário {userId} anexado no Contexto.");
                }
                else
                {
                    Console.WriteLine($"Usuário {userId} não encontrado no banco de Dados.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro JWT: {ex.Message}");
            }
        }
    }
}
