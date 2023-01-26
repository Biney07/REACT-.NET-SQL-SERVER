using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class CiftiUser : IdentityUser
    {
        public string Partner1 {get; set;}
        public string Partner2 {get; set;}
        public string City {get; set;}
         
    }
}