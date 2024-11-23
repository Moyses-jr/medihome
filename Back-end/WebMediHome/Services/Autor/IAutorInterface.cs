using WebMediHome.Dto.Autor;
using WebMediHome.Model;

namespace WebMediHome.Services.Autor
{
    public interface IAutorInterface
    {
        Task<ResponseModel<List<AutorModel>>> ListarAutores();
        Task<ResponseModel<AutorModel>> BuscarAutorId(int idAutor);
        Task<ResponseModel<AutorModel>> BuscarAutorPorIdLivro(int idLivro);
        Task<ResponseModel<List<AutorModel>>> CriarAutor(DtoCriarAutor dtoCriarAutor);
        Task<ResponseModel<List<AutorModel>>> AlterarAutor(DtoAlterarAutor dtoAlterarautor);
        Task<ResponseModel<List<AutorModel>>> ExcluirAutor(int idAutor);

    }
}
