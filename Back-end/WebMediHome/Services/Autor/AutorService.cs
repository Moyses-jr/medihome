//using Azure;
//using Microsoft.AspNetCore.Http.HttpResults;
//using System.Collections.Generic;
//using WebMediHome.Data;
//using WebMediHome.Dto.Autor;
//using WebMediHome.Model;

//namespace WebMediHome.Services.Autor
//{
//    public class AutorService : IAutorInterface
//    {
//        //TODO: Talvez mudar a forma que chamada as task
//        private readonly AppDbContext _context;
//        public AutorService(AppDbContext context)
//        {
//            _context = context;
//        }

//        async Task<ResponseModel<List<AutorModel>>> IAutorInterface.AlterarAutor(DtoAlterarAutor dtoAlterarautor)
//        {
//            ResponseModel<List<AutorModel>> response = new ResponseModel<List<AutorModel>>();
//            try
//            {
//                var autor = await _context.Autores.FirstOrDefaultAsync(a => a.Id == dtoAlterarautor.Id);
//                if (autor == null)
//                { 
//                    response.Mensagem = "Erro ao alterar";
//                    return response;
//                }
//                autor.Nome = dtoAlterarautor.Name ;
//                autor.Sobrenome = dtoAlterarautor.Sobrenome;
                
//                _context.Update(autor);
//                await _context.SaveChangesAsync();

//                response.Mensagem = "Autor alterado com sucesso";
//                response.Dados = await _context.Autores.ToListAsync();
//                return response;
//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }

//        async Task<ResponseModel<AutorModel>> IAutorInterface.BuscarAutorId(int idAutor)
//        {
//            ResponseModel<AutorModel> response = new ResponseModel<AutorModel>();
//            try
//            {
//                var autorId = await _context.Autores.FirstOrDefaultAsync(autorDB => autorDB.Id == idAutor);
//                if (autorId == null)
//                {
//                    response.Mensagem = "Não encontramos esse Autor ";
//                    response.Status = true;
//                    return response;
//                }
//                response.Dados = autorId;
//                response.Status = true;
//                response.Mensagem = "Autor econtrado!";
//                return response;
//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }

//        async Task<ResponseModel<AutorModel>> IAutorInterface.BuscarAutorPorIdLivro(int idLivro)
//        {
//            ResponseModel<AutorModel> response = new ResponseModel<AutorModel>();
//            try
//            {
//                var autorPorLivro = await _context.Livros.
//                    Include(a => a.Autor).FirstOrDefaultAsync(livroDB => livroDB.Id == idLivro);

//                if (autorPorLivro == null)
//                {
//                    response.Status = true;
//                    response.Mensagem = "Nenhum autor foi encontrado para esse livro.";
//                    return response;
//                }

//                response.Status = true;
//                response.Dados = autorPorLivro.Autor;
//                response.Mensagem = "Autor do Livro:";
//                return response;
//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }

//        async Task<ResponseModel<List<AutorModel>>> IAutorInterface.CriarAutor(DtoCriarAutor dtoCriarAutor)
//        {
//            ResponseModel<List<AutorModel>> response = new ResponseModel<List<AutorModel>>();
//            try
//            {
//                var autor = new AutorModel()
//                {
//                    Nome = dtoCriarAutor.Nome,
//                    Sobrenome = dtoCriarAutor.Sobrenome,
//                };
//                await _context.AddAsync(autor);
//                await _context.SaveChangesAsync();

//                response.Dados = await _context.Autores.ToListAsync();
//                response.Status = true;
//                response.Mensagem = "Autor criado com sucesso.";

//                return response;
//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }

//        async Task<ResponseModel<List<AutorModel>>> IAutorInterface.ExcluirAutor(int idAutor)
//        {
//            ResponseModel<List<AutorModel>> response = new ResponseModel<List<AutorModel>>();
//            try
//            {
//                var autor = await _context.Autores.FirstOrDefaultAsync(a => a.Id == idAutor);

//                if (autor == null)
//                {
//                    response.Mensagem = "Esse autor não está cadastrado";
//                    return response;
//                }
//                _context.Remove(autor);
//                await _context.SaveChangesAsync();
 
//                response.Dados = await _context.Autores.ToListAsync();
//                response.Mensagem = "Autor removido com sucesso.";
//                return response;

//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }

//        async Task<ResponseModel<List<AutorModel>>> IAutorInterface.ListarAutores()
//        {
//            ResponseModel<List<AutorModel>> response = new ResponseModel<List<AutorModel>>();
//            try
//            {
//                var autores = await _context.Autores.ToListAsync();
//                response.Dados = autores;
//                response.Mensagem = "Todos os autores foram carregados!";
//                return response;
//            }
//            catch (Exception erro)
//            {
//                response.Mensagem = erro.Message;
//                response.Status = false;
//                return response;
//            }
//        }
//    }
//}
