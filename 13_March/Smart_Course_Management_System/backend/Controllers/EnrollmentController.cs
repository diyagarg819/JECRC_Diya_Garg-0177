using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/enrollment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetEnrollments()
        {
            return await _context.Enrollments
                .Include(e => e.Student)
                .Include(e => e.Course)
                .ToListAsync();
        }

        // POST: api/enrollment/enroll
        [HttpPost("enroll")]
        public async Task<IActionResult> EnrollStudent(
            [FromQuery] int studentId,
            [FromQuery] int courseId)
        {
        var course = await _context.Courses.FindAsync(courseId);
        var student = await _context.Students.FindAsync(studentId);

        if (course == null || student == null)
            return NotFound("Student or Course not found");

        if (!course.SeatsAvailable)
            return BadRequest("No seats available");

        var enrollment = new Enrollment
        {
            StudentId = studentId,
            CourseId = courseId,
            EnrollmentDate = DateTime.Now
        };

        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();

        return Ok("Student enrolled successfully");
    }

        // POST: api/enrollment/drop
       [HttpPost("drop")]
        public async Task<IActionResult> DropCourse(
            [FromQuery] int studentId,
            [FromQuery] int courseId)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment == null)
                return NotFound("Enrollment not found");

            enrollment.DropDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok("Course dropped successfully");
        }
    }
}