namespace WebMediHome.Dto.Client
{
    public class ClientDTO
    {
        public int IdClient { get; set; }
        public int IdUser { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public DateOnly RegisterDate { get; set; }
        public DateOnly RegisterBorn { get; set; }
    }
}
