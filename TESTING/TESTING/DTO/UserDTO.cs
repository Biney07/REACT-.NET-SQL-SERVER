﻿namespace TESTING.DTO
{
    public class UserDTO 
    {   public int Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public BasketDto Basket { get; set; }
        public string Role { get; set; }
    }
}
