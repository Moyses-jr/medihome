﻿using WebMediHome.Model;

namespace WebMediHome.Dto.User
{
    public class AuthenticateResponse
    {
        public int IdUser { get; set; }
        public string Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }

        public AuthenticateResponse(UserModel userModel, string token)
        {
            IdUser = userModel.IdUser;
            FirstName = userModel.FirstName;
            LastName = userModel.LastName;
            Email = userModel.Email;
            Token = token;
        }
    }
}
