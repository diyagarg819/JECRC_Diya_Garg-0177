using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Core.Common;
using HRMS.Core.Entities;
using HRMS.Infrastructure.Data;

namespace HRMS.API.Controllers
{
    [ApiController]
    [Route("api/v1/attendance")]
    public class AttendanceController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ITenantProvider _tenantProvider;

        public AttendanceController(ApplicationDbContext dbContext, ITenantProvider tenantProvider)
        {
            _dbContext = dbContext;
            _tenantProvider = tenantProvider;
        }

        // POST: Record a biometric / web / mobile punch
        [HttpPost("punch")]
        public async Task<IActionResult> RecordPunch([FromBody] PunchRequest request)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == request.EmployeeId);
            if (employee == null)
                return NotFound(new { message = $"Employee '{request.EmployeeId}' not found." });

            // Duplicate punch guard — ignore punches within 60 seconds of the last punch
            var lastPunch = await _dbContext.AttendancePunches
                .Where(p => p.EmployeeId == request.EmployeeId)
                .OrderByDescending(p => p.PunchTime)
                .FirstOrDefaultAsync();

            if (lastPunch != null && (DateTimeOffset.UtcNow - lastPunch.PunchTime).TotalSeconds < 60)
            {
                return Conflict(new { message = "Duplicate punch detected. Minimum 60-second gap enforced." });
            }

            var punch = new AttendancePunch
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EmployeeId = request.EmployeeId,
                PunchTime = request.PunchTime ?? DateTimeOffset.UtcNow,
                PunchType = request.PunchType ?? "IN",
                DeviceId = request.DeviceId,
                RawPayload = request.RawPayload != null ? JsonSerializer.Serialize(request.RawPayload) : null
            };

            _dbContext.AttendancePunches.Add(punch);
            await _dbContext.SaveChangesAsync();

            return Ok(new { data = punch, meta = new { } });
        }

        // GET: Daily attendance summary for an employee
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetByEmployee(Guid employeeId, [FromQuery] DateTime? date)
        {
            var targetDate = date ?? DateTime.UtcNow.Date;

            var records = await _dbContext.AttendanceRecords
                .Where(r => r.EmployeeId == employeeId && r.BusinessDate == targetDate)
                .ToListAsync();

            var punches = await _dbContext.AttendancePunches
                .Where(p => p.EmployeeId == employeeId && p.PunchTime.Date == targetDate)
                .OrderBy(p => p.PunchTime)
                .ToListAsync();

            return Ok(new
            {
                data = new { records, punches },
                meta = new { businessDate = targetDate }
            });
        }

        // POST: Sync / consolidate daily attendance from raw punches
        [HttpPost("sync")]
        public async Task<IActionResult> SyncDailyAttendance([FromBody] SyncRequest request)
        {
            var businessDate = request.BusinessDate ?? DateTime.UtcNow.Date;

            var employeeIds = await _dbContext.Employees
                .Where(e => e.Status == "active")
                .Select(e => e.Id)
                .ToListAsync();

            int processed = 0;

            foreach (var empId in employeeIds)
            {
                // Get all punches for this employee on the business date
                var punches = await _dbContext.AttendancePunches
                    .Where(p => p.EmployeeId == empId && p.PunchTime.Date == businessDate)
                    .OrderBy(p => p.PunchTime)
                    .ToListAsync();

                if (punches.Count == 0) continue;

                var firstIn = punches.FirstOrDefault(p => p.PunchType == "IN");
                var lastOut = punches.LastOrDefault(p => p.PunchType == "OUT");

                var workedMinutes = 0;
                if (firstIn != null && lastOut != null)
                {
                    workedMinutes = (int)(lastOut.PunchTime - firstIn.PunchTime).TotalMinutes;
                }

                // Check for existing record to avoid duplicates
                var existing = await _dbContext.AttendanceRecords
                    .FirstOrDefaultAsync(r => r.EmployeeId == empId && r.BusinessDate == businessDate);

                if (existing != null) continue; // Already synced

                var overtimeMinutes = Math.Max(0, workedMinutes - 480); // Beyond 8 hrs

                var record = new AttendanceRecord
                {
                    Id = Guid.NewGuid(),
                    TenantId = _tenantProvider.TenantId,
                    EmployeeId = empId,
                    BusinessDate = businessDate,
                    CheckIn = firstIn?.PunchTime,
                    CheckOut = lastOut?.PunchTime,
                    WorkedMinutes = workedMinutes,
                    OvertimeMinutes = overtimeMinutes,
                    Status = workedMinutes >= 240 ? (workedMinutes >= 480 ? "Present" : "HalfDay") : "Absent",
                    Source = punches.First().DeviceId != null ? "Biometric" : "Web",
                    AutoCheckout = lastOut == null
                };

                _dbContext.AttendanceRecords.Add(record);
                processed++;
            }

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = $"Synced attendance for {processed} employees on {businessDate:yyyy-MM-dd}." });
        }

        // GET: Attendance summary across all employees for a date range
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary([FromQuery] DateTime from, [FromQuery] DateTime to)
        {
            var records = await _dbContext.AttendanceRecords
                .Where(r => r.BusinessDate >= from && r.BusinessDate <= to)
                .GroupBy(r => r.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            return Ok(new { data = records, meta = new { from, to } });
        }
    }

    public record PunchRequest(Guid EmployeeId, DateTimeOffset? PunchTime, string? PunchType, string? DeviceId, object? RawPayload);
    public record SyncRequest(DateTime? BusinessDate);
}
