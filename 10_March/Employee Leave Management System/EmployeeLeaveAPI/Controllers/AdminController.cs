using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EmployeeLeaveAPI.Data;

namespace EmployeeLeaveAPI.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET /api/admin/employees  (Admin only)
        [HttpGet("employees")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.Users
                .Select(u => new { u.Id, u.Username, u.Role })
                .ToList();

            return Ok(employees);
        }

        // DELETE /api/admin/delete/{id}  (Admin only)
        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("Employee not found.");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok("Employee deleted successfully.");
        }
    }
}
