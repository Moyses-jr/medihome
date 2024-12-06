using System.ComponentModel.DataAnnotations;
using WebMediHome.Model;

namespace WebMediHome.Dto.ProfessionalDTO
{
    public class ProfessionalDTO
    {
        public int ?IdProfessional { get; set; }
        public int IdUser { get; set; }
        public string CNPJ { get; set; } = string.Empty;
        public string CRM { get; set; } = string.Empty;
        public DateOnly ExpirationCRM { get; set; }
        public char ProfessionalType { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public DateOnly RegisterDate { get; set; }
        public DateOnly RegisterBorn { get; set; }
        public IFormFile ?Image { get; set; }
    }
}
