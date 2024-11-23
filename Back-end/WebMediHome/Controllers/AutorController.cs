//using Microsoft.AspNetCore.Mvc;
//using WebMediHome.Dto.Autor;
//using WebMediHome.Model;
//using WebMediHome.Security;
//using WebMediHome.Services.Autor;

//namespace WebMediHome.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    [Authorize]
//    public class AutorController : ControllerBase
//    {
//        public readonly IAutorInterface _autorInterface;  
//        public AutorController(IAutorInterface autorInterface)
//        {
//            _autorInterface = autorInterface;
//        }

//        [HttpGet("ListarAutores")]
//        public async Task<ActionResult<ResponseModel<List<AutorModel>>>> ListarAutores()
//        {
//            var autores = await _autorInterface.ListarAutores();
//            return Ok(autores);
//        }

//        [HttpGet("BuscarAutore/{idAutor}")]
//        public async Task<ActionResult<ResponseModel<AutorModel>>> BuscarAutorId(int idAutor)
//        {
//            var autor = await _autorInterface.BuscarAutorId(idAutor);
//            return Ok(autor); 
//        }
//        [HttpGet("BuscarAutorPorIdLivro/{idLivro}")]
//        public async Task<ActionResult<ResponseModel<AutorModel>>> BuscarAutorPorIdLivro(int idLivro)
//        {
//            var autor = await _autorInterface.BuscarAutorPorIdLivro(idLivro);
//            return Ok(autor);
//        }

//        [HttpPost("CriarAutor")]
//        public async Task<ActionResult<ResponseModel<List<AutorModel>>>> CriarAutor(DtoCriarAutor dtoCriarAutor)
//        {
//            var autores = await _autorInterface.CriarAutor(dtoCriarAutor);
//            return Ok(autores);
//        }

//        [HttpPut("AlterarAutor")]
//        public async Task<ActionResult<ResponseModel<List<AutorModel>>>> AlterarAutor(DtoAlterarAutor dtoAlterarAutor)
//        {
//            var autores = await _autorInterface.AlterarAutor(dtoAlterarAutor);
//            return Ok(autores);
//        }

//        [HttpDelete("ExcluirAutor")]
//        public async Task<ActionResult<ResponseModel<List<AutorModel>>>> ExcluirAutor(int idAutor)
//        {
//            var autores = await _autorInterface.ExcluirAutor(idAutor);
//            return Ok(autores);
//        }

//    }
//}
