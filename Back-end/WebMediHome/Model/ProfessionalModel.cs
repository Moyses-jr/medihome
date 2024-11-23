using System.ComponentModel.DataAnnotations;

namespace WebMediHome.Model
{
    public class ProfessionalModel
    {
        [Key]
        public int IdProfessional { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string CRM { get; set; } = string.Empty;
        public DateOnly ExpirationCRM { get; set; }
        public char ProfessionalType { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateOnly RegisterDate { get; set; }
        public ICollection<ClientProfessionalModel> ClientProfessionals { get; set; } = new List<ClientProfessionalModel>();
    }

}
