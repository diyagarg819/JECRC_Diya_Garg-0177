using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAttendenceSystem.Model;

namespace StudentAttendenceSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendenceController : ControllerBase
    {
        private static List<Attendence> attendenceRecords = new();

        [HttpGet]
        public IActionResult Get() => Ok(attendenceRecords);

        [HttpPost]
        public IActionResult Add(Attendence attendence)
        {
            attendenceRecords.Add(attendence);
            return Ok(attendence);
        }
    }
}
