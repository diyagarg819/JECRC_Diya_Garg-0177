using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EmployeeLeaveAPI.Data;
using EmployeeLeaveAPI.Models;
using System.Security.Claims;

namespace EmployeeLeaveAPI.Controllers
{
    [ApiController]
    [Route("api/leave")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // POST /api/leave/apply  (Employee only)
        [HttpPost("apply")]
        [Authorize(Roles = "Employee")]
        public IActionResult ApplyLeave([FromBody] LeaveRequest request)
        {
            // Get the logged-in employee's ID from JWT claims
            var employeeIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (employeeIdClaim == null)
            {
                return Unauthorized("Invalid token.");
            }

            request.EmployeeId = int.Parse(employeeIdClaim.Value);
            request.Status = "Pending";

            _context.LeaveRequests.Add(request);
            _context.SaveChanges();

            return Ok("Leave request submitted successfully.");
        }

        // GET /api/leave/my-leaves  (Employee only)
        [HttpGet("my-leaves")]
        [Authorize(Roles = "Employee")]
        public IActionResult GetMyLeaves()
        {
            var employeeIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (employeeIdClaim == null)
            {
                return Unauthorized("Invalid token.");
            }

            int employeeId = int.Parse(employeeIdClaim.Value);
            var leaves = _context.LeaveRequests
                .Where(l => l.EmployeeId == employeeId)
                .ToList();

            return Ok(leaves);
        }

        // GET /api/leave/all  (Manager only)
        [HttpGet("all")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetAllLeaves()
        {
            var leaves = _context.LeaveRequests.ToList();
            return Ok(leaves);
        }

        // PUT /api/leave/approve/{id}  (Manager only)
        [HttpPut("approve/{id}")]
        [Authorize(Roles = "Manager")]
        public IActionResult ApproveLeave(int id)
        {
            var leave = _context.LeaveRequests.FirstOrDefault(l => l.Id == id);
            if (leave == null)
            {
                return NotFound("Leave request not found.");
            }

            leave.Status = "Approved";
            _context.SaveChanges();

            return Ok("Leave request approved.");
        }

        // PUT /api/leave/reject/{id}  (Manager only)
        [HttpPut("reject/{id}")]
        [Authorize(Roles = "Manager")]
        public IActionResult RejectLeave(int id)
        {
            var leave = _context.LeaveRequests.FirstOrDefault(l => l.Id == id);
            if (leave == null)
            {
                return NotFound("Leave request not found.");
            }

            leave.Status = "Rejected";
            _context.SaveChanges();

            return Ok("Leave request rejected.");
        }
    }
}
