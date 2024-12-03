using Microsoft.AspNetCore.Mvc;
using WebMediHome.Dto.Profile;
using WebMediHome.Model;
using WebMediHome.Services.Profile;

namespace WebMediHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet("{idUser}")]
        public async Task<IActionResult> GetProfileById(int idUser)
        {
            var result = await _profileService.GetProfileAsync(idUser);

            if (result == null)
                return NotFound("Usuário ou cliente não encontrado.");

            return Ok(result);
        }

        [HttpPut("{idUser}")]
        public async Task<IActionResult> UpdateProfile(int idUser, [FromBody] UpdateProfileDTO updatedProfile)
        {
            if (updatedProfile == null)
            {
                return BadRequest("Os dados do perfil não podem estar vazios.");
            }

            var success = await _profileService.UpdateProfileAsync(
                idUser,
                new ClientModel
                {
                    FirstName = updatedProfile.FirstName,
                    LastName = updatedProfile.LastName,
                    Email = updatedProfile.Email,
                    CPF = updatedProfile.CPF,
                    PhoneNumber = updatedProfile.PhoneNumber,
                    RegisterBorn = updatedProfile.RegisterBorn,
                },
                updatedProfile.Password
            );

            if (!success)
            {
                return BadRequest("Erro ao atualizar o perfil.");
            }

            return Ok("Perfil atualizado com sucesso.");
        }
    }
}