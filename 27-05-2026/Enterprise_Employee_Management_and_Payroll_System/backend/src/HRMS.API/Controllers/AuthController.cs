using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HRMS.API.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public record LoginRequest(string Email, string Password, string TenantId);

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Simple mock authentication
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Email and Password are required." });
            }

            // Resolve Tenant GUID from request or defaults
            Guid parsedTenantId;
            if (!Guid.TryParse(request.TenantId, out parsedTenantId))
            {
                parsedTenantId = Guid.Parse("e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6"); // India fallback
            }

            // Resolve Role based on email suffix
            string role = "Employee";
            if (request.Email.Contains("admin")) role = "SuperAdmin";
            else if (request.Email.Contains("hr")) role = "HR";
            else if (request.Email.Contains("payroll")) role = "PayrollAdmin";

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var keyStr = _configuration["JWT:Key"] ?? "super_secret_key_hrms_platform_1234567890";
            var key = Encoding.UTF8.GetBytes(keyStr);
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, request.Email),
                    new Claim(ClaimTypes.Role, role),
                    new Claim("tenant_id", parsedTenantId.ToString()),
                    new Claim("email", request.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = _configuration["JWT:Issuer"] ?? "HRMS_API",
                Audience = _configuration["JWT:Audience"] ?? "HRMS_Client",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                data = new
                {
                    token = tokenString,
                    email = request.Email,
                    role = role,
                    tenantId = parsedTenantId
                },
                meta = new { generatedAt = DateTime.UtcNow }
            });
        }
    }
}
