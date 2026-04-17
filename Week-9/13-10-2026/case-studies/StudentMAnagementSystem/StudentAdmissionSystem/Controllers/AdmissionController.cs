using Microsoft.AspNetCore.Mvc;
using StudentAdmissionSystem.Model;

namespace StudentAdmissionSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private static List<Admission> admissions = new List<Admission>();

        [HttpGet]

        public IActionResult Get() => Ok(admissions); 

        [HttpPost]

        public IActionResult Post(Admission admission)
        {
            if (admission == null)
            {
                return BadRequest("Admission cannot be null.");
            }
            admissions.Add(admission);
            return CreatedAtAction(nameof(Get), new { id = admission.Id }, admission);
        }
    }
}
