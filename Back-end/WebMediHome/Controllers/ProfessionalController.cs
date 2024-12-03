using Microsoft.AspNetCore.Mvc;
using WebMediHome.Model;
using WebMediHome.Security;
using WebMediHome.Services.Professional;

namespace WebMediHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfessionalController : ControllerBase
    {
        private readonly IProfessionalService _professionalService;

        public ProfessionalController(IProfessionalService professionalService)
        {
            _professionalService = professionalService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProfessionals()
        {
            var professionals = await _professionalService.GetAllProfessionalsAsync();
            return Ok(professionals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProfessionalById(int id)
        {
            var professional = await _professionalService.GetProfessionalByIdAsync(id);
            if (professional == null)
                return NotFound();

            return Ok(professional);
        }

        [HttpPost]
        public async Task<IActionResult> AddProfessional(ProfessionalModel professional)
        {
            await _professionalService.AddProfessionalAsync(professional);
            return CreatedAtAction(nameof(GetProfessionalById), new { id = professional.IdProfessional }, professional);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProfessional(int id, ProfessionalModel professional)
        {
            if (id != professional.IdProfessional)
                return BadRequest("Professional ID mismatch");

            await _professionalService.UpdateProfessionalAsync(professional);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfessional(int id)
        {
            await _professionalService.DeleteProfessionalAsync(id);
            return NoContent();
        }

        [HttpPost("{professionalId}/clients/{clientId}")]
        public async Task<IActionResult> AssociateClient(int professionalId, int clientId)
        {
            await _professionalService.AssociateClientAsync(professionalId, clientId);
            return Ok(new { message = "Client associated successfully." });
        }

        [HttpDelete("{professionalId}/clients/{clientId}")]
        public async Task<IActionResult> DisassociateClient(int professionalId, int clientId)
        {
            await _professionalService.DisassociateClientAsync(professionalId, clientId);
            return Ok(new { message = "Client disassociated successfully." });
        }

        [HttpGet("{professionalId}/clients")]
        public async Task<IActionResult> GetAssociatedClients(int professionalId)
        {
            var clients = await _professionalService.GetAssociatedClientsAsync(professionalId);
            return Ok(clients);
        }
    }
}
