namespace WebMediHome.Model
{
    public class AuthenticateResponse
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }

        public AuthenticateResponse(UserModel userModel, string token)
        {
            Id = userModel.Id;
            FirstName = userModel.FirstName;
            LastName = userModel.LastName;
            Username = userModel.Username;
            Token = token;
        }
    }
}
