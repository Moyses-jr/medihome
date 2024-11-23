namespace WebMediHome.Model
{
    public class AuthenticateRequest
    {
            public required string Email { get; set; }
            public required string Password { get; set; }
    }
}
