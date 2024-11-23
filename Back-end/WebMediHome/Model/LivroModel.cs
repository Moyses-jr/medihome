namespace WebMediHome.Model
{
    public class LivroModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public required AutorModel Autor { get; set; }
    }
}
