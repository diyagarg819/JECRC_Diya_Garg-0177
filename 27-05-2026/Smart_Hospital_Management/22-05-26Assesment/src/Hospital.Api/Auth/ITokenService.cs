using System.Security.Claims;
using Hospital.Api.Domain;

namespace Hospital.Api.Auth;

public interface ITokenService
{
    string CreateToken(UserAccount user);
    ClaimsPrincipal? ValidateToken(string token);
}
