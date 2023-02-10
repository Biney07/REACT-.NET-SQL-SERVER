using Microsoft.AspNetCore.Identity;
namespace TESTING.Model
{
    public class User :  IdentityUser<int>
    {
         public UserAddress Address { get; set; }
}
}
