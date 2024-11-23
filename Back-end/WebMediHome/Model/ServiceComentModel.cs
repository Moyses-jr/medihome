namespace WebMediHome.Model
{
    public class ServiceComentModel
    {
        public int IdClient { get; set; }
        public int IdProfessional { get; set; }
        public int StarRate { get; set; }
        public string Rating { get; set; } = string.Empty;
        public Boolean Recomendation { get; set; }
    }
}
