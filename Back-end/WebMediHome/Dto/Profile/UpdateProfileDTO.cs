namespace WebMediHome.Dto.Profile
{
    public class UpdateProfileDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateOnly RegisterBorn { get; set; }
        public string? Password { get; set; }
    }

}
