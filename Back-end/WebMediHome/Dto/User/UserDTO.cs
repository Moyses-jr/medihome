namespace WebMediHome.Dto.User
{
    public class UserDTO
    {
        public int IdUser { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
