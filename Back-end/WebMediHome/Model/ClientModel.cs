using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebMediHome.Model
{
    public class ClientModel
    {
        [Key]
        public int IdClient { get; set; }
        public int IdUser { get; set; }

        [ForeignKey("IdUser")]
        public UserModel? User { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "CPF deve conter 11 dígitos.")]
        public string CPF { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string PhoneNumber { get; set; } = string.Empty;

        public bool IsAdm { get; set; } = false;

        public bool IsActive { get; set; } = true;

        [Required]
        public DateOnly RegisterDate { get; set; }
        public DateOnly RegisterBorn { get; set; }
        public ICollection<ClientProfessionalModel> ClientProfessionals { get; set; } = new List<ClientProfessionalModel>();
    }

}
