namespace WebMediHome.Model
{
    public class UserModel
    {
        public int Id { get; set; }
        public required string FirstName { get; set; }
        public string LastName { get; set; } = string.Empty;
        public required string Email { get; set; }
        public string Password { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

}
