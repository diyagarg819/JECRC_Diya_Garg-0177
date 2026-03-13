using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        // This endpoint is protected and can only be accessed by users with the "Admin" role
        [HttpGet("dashboard")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAdminDashboard()
        {
            return Ok("Welcome to the Admin Dashboard! only users with the Admin role can see this.");
        }
    }
}