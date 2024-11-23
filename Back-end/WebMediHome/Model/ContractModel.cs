namespace WebMediHome.Model
{
    public class ContractModel
    {
        public int IdContract { get; set; }
        public int IdClient { get; set; }
        public int IdProfessional { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Texto { get; set; } = string.Empty;
        //public string EffectiveDate { get; set; }
        //public string EndDate { get; set; }
    }
}
