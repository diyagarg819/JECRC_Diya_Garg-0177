using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Core.Common;
using HRMS.Core.Entities;
using HRMS.Core.Events;
using HRMS.Infrastructure.Data;

namespace HRMS.API.Controllers
{
    [ApiController]
    [Route("api/v1/employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITenantProvider _tenantProvider;

        public EmployeesController(ApplicationDbContext dbContext, ITenantProvider tenantProvider)
            {
            _dbContext = dbContext;
            _tenantProvider = tenantProvider;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var query = _dbContext.Employees
                .Include(e => e.Department)
                .Include(e => e.Designation)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                var lowerSearch = search.ToLower();
                query = query.Where(e => e.FirstName.ToLower().Contains(lowerSearch) || 
                                         e.LastName.ToLower().Contains(lowerSearch) || 
                                         e.EmployeeCode.ToLower().Contains(lowerSearch) || 
                                         e.Email.ToLower().Contains(lowerSearch));
            }

            var totalCount = await query.CountAsync();
            var items = await query
                .OrderBy(e => e.EmployeeCode)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                data = items,
                meta = new
                {
                    totalCount,
                    page,
                    pageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
                }
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var employee = await _dbContext.Employees
                .Include(e => e.Department)
                .Include(e => e.Designation)
                .Include(e => e.Manager)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
            {
                return NotFound(new { message = $"Employee with ID '{id}' not found." });
            }

            return Ok(new { data = employee, meta = new { } });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            if (string.IsNullOrEmpty(employee.EmployeeCode) || string.IsNullOrEmpty(employee.Email))
            {
                return BadRequest(new { message = "Validation failed", errors = new[] { "EmployeeCode and Email are required." } });
            }

            // Check if email or code already exists
            var exists = await _dbContext.Employees.AnyAsync(e => e.Email == employee.Email || e.EmployeeCode == employee.EmployeeCode);
            if (exists)
            {
                return Conflict(new { message = "Employee with this Email or EmployeeCode already exists in this tenant." });
            }

            // Entity framework will set the TenantId automatically on save
            employee.Id = Guid.NewGuid();
            employee.CreatedAt = DateTimeOffset.UtcNow;
            employee.Status = "active";

            _dbContext.Employees.Add(employee);

            // Add Event to Outbox
            var outboxMsg = new OutboxMessage
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EventType = nameof(EmployeeCreatedEvent),
                Payload = JsonSerializer.Serialize(new EmployeeCreatedEvent(
                    _tenantProvider.TenantId,
                    employee.Id,
                    employee.EmployeeCode,
                    employee.Email,
                    employee.DateOfJoining
                )),
                CreatedAt = DateTimeOffset.UtcNow
            };
            _dbContext.OutboxMessages.Add(outboxMsg);

            // Save inside a single transaction
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, new { data = employee, meta = new { } });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Employee model)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null) return NotFound(new { message = "Employee not found." });

            employee.FirstName = model.FirstName;
            employee.LastName = model.LastName;
            employee.PhoneNumber = model.PhoneNumber;
            employee.DepartmentId = model.DepartmentId;
            employee.DesignationId = model.DesignationId;
            employee.ManagerId = model.ManagerId;
            employee.UpdatedAt = DateTimeOffset.UtcNow;

            await _dbContext.SaveChangesAsync();
            return Ok(new { data = employee, meta = new { } });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null) return NotFound(new { message = "Employee not found." });

            // ApplicationDbContext automatically intercepts Delete and marks it as Soft Delete
            _dbContext.Employees.Remove(employee);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Employee soft-deleted successfully." });
        }

        [HttpPost("import")]
        public async Task<IActionResult> ImportCsv([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded." });
            }

            try
            {
                using var reader = new StreamReader(file.OpenReadStream());
                var headerLine = await reader.ReadLineAsync();
                
                int count = 0;
                while (!reader.EndOfStream)
                {
                    var line = await reader.ReadLineAsync();
                    if (string.IsNullOrEmpty(line)) continue;

                    var parts = line.Split(',');
                    if (parts.Length < 5) continue; // Basic validation

                    var employee = new Employee
                    {
                        EmployeeCode = parts[0].Trim(),
                        FirstName = parts[1].Trim(),
                        LastName = parts[2].Trim(),
                        Email = parts[3].Trim(),
                        DateOfJoining = DateTime.TryParse(parts[4].Trim(), out var doj) ? doj : DateTime.UtcNow.Date,
                        EmploymentType = parts.Length > 5 ? parts[5].Trim() : "FullTime",
                        Status = "active"
                    };

                    _dbContext.Employees.Add(employee);
                    count++;
                }

                await _dbContext.SaveChangesAsync();
                return Ok(new { message = $"Successfully imported {count} employees." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error importing CSV.", errors = new[] { ex.Message } });
            }
        }

        [HttpPost("{id}/transfer")]
        public async Task<IActionResult> TransferDepartment(Guid id, [FromBody] DepartmentTransferRequest request)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null) return NotFound(new { message = "Employee not found." });

            var oldDeptId = employee.DepartmentId;
            employee.DepartmentId = request.NewDepartmentId;
            employee.UpdatedAt = DateTimeOffset.UtcNow;

            // Audit transfer
            var auditLog = new AuditLog
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                Action = "DepartmentTransfer",
                EntityType = nameof(Employee),
                EntityId = employee.Id,
                OldValues = JsonSerializer.Serialize(new { DepartmentId = oldDeptId }),
                NewValues = JsonSerializer.Serialize(new { DepartmentId = request.NewDepartmentId }),
                CreatedAt = DateTime.UtcNow
            };
            _dbContext.AuditLogs.Add(auditLog);

            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Department transfer complete.", data = employee });
        }

        [HttpPost("{id}/terminate")]
        public async Task<IActionResult> TerminateEmployee(Guid id, [FromBody] TerminationRequest request)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == id);
            if (employee == null) return NotFound(new { message = "Employee not found." });

            employee.Status = "terminated";
            employee.UpdatedAt = DateTimeOffset.UtcNow;

            // Outbox event
            var outboxMsg = new OutboxMessage
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EventType = nameof(EmployeeTerminatedEvent),
                Payload = JsonSerializer.Serialize(new EmployeeTerminatedEvent(
                    _tenantProvider.TenantId,
                    employee.Id,
                    employee.EmployeeCode,
                    request.TerminationDate,
                    request.Reason
                )),
                CreatedAt = DateTimeOffset.UtcNow
            };
            _dbContext.OutboxMessages.Add(outboxMsg);

            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Employee status updated to Terminated." });
        }
    }

    public record DepartmentTransferRequest(Guid NewDepartmentId);
    public record TerminationRequest(DateTime TerminationDate, string Reason);
}
