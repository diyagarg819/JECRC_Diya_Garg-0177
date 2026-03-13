using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        // This endpoint is protected and can only be accessed by users with the "Manager" role
        [HttpGet("dashboard")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetManagerDashboard()
        {
            return Ok("Welcome to the Manager Dashboard! only users with the Manager role can see this.");
        }

        [HttpGet("reports")]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult GetManagerReports()
        {
            return Ok("Here are the Admin and Manager reports! only users with the Admin and Manager role can see this.");
        }
    }
}