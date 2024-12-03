using Microsoft.AspNetCore.Mvc;
using WebMediHome.Model;
using WebMediHome.Security;
using WebMediHome.Services.Client;

namespace WebMediHome.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await _clientService.GetAllClientsAsync();
            return Ok(clients);
        }

        [HttpGet("c/{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpGet("u/{idUser}")]
        public async Task<IActionResult> GetClientByIdUser(int idUser)
        {
            var client = await _clientService.GetClientByIdUserAsync(idUser);

            if (client == null)
                return NotFound(new { message = "No client associated with this IdUser" });

            return Ok(client);
        }

        [HttpPost]
        public async Task<IActionResult> AddClient(ClientModel client)
        {
            await _clientService.AddClientAsync(client);
            return CreatedAtAction(nameof(GetClientById), new { id = client.IdClient }, client);
        }

        [HttpPut("{idUser}")]
        public async Task<IActionResult> UpdateClient(int idUser, ClientModel client)
        {
            if (idUser != client.IdClient)
                return BadRequest();

            await _clientService.UpdateClientAsync(client);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            await _clientService.DeleteClientAsync(id);
            return NoContent();
        }

        [HttpGet("{clientId}/professionals")]
        public async Task<IActionResult> GetAssociatedProfessionals(int clientId)
        {
            var professionals = await _clientService.GetAssociatedProfessionalsAsync(clientId);
            return Ok(professionals);
        }
    }
}
