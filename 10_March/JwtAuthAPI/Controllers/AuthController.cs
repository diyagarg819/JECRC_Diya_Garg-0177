using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using JwtRoleAuthAPI.Data;
using JwtRoleAuthAPI.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _config = config;
            _context = context;
        }

        // Implement authentication and authorization logic here
        //User registration
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Invalid user data.");
            }

            // Check if the username already exists
            if (_context.Users.Any(u => u.Username == user.Username))
            {
                return Conflict("Username already exists.");
            }

            // Add the new user to the database
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully.");
        }
        //user login
        [HttpPost("login")]
        public IActionResult Login([FromBody] User login)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == login.Username && u.Password == login.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials.");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(2),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}