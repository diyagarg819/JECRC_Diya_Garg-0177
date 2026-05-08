using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAdmissionSystem.Model;

namespace StudentAdmissionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private static List<Admission> admissions = new();

        [HttpGet]
        public IActionResult Get() => Ok(admissions);

        [HttpPost]
        public IActionResult Add(Admission admission)
        {
            admissions.Add(admission);
            return Ok(admission);
        }
    }
}
