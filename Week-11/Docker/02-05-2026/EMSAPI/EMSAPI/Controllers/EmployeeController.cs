using EMSAPI.Models;
using EMSAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EMSAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repo;

        public EmployeeController(IEmployeeRepository repo)
        {
            _repo = repo;
        }

        // GET /api/employee
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _repo.GetAllAsync();
            return Ok(employees);
        }

        // GET /api/employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _repo.GetByIdAsync(id);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        // POST /api/employee
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            employee.CreatedDate = DateTime.Now;
            await _repo.CreateAsync(employee);
            return Ok("Employee created successfully");
        }

        // PUT /api/employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
        {
            employee.Id = id;
            await _repo.UpdateAsync(employee);
            return Ok("Employee updated successfully");
        }

        // DELETE /api/employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _repo.DeleteAsync(id);
            return Ok("Employee deleted successfully");
        }
    }
}
