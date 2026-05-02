using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EMSInMemoryAPI.Repository;
using EMSInMemoryAPI.Models;

namespace EMSInMemoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var employees = EmployeeRepository.GetAll();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = EmployeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            EmployeeRepository.Add(employee);
            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            var existingEmployee = EmployeeRepository.GetById(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            EmployeeRepository.Update(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = EmployeeRepository.Delete(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}   