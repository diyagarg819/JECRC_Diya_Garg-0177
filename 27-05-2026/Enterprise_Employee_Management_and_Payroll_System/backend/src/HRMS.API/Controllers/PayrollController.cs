using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Core.Common;
using HRMS.Core.Entities;
using HRMS.Core.Events;
using HRMS.Application.Payroll;
using HRMS.Infrastructure.Data;

namespace HRMS.API.Controllers
{
    [ApiController]
    [Route("api/v1/payroll")]
    public class PayrollController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IEnumerable<IPayrollTaxStrategy> _taxStrategies;
        private readonly ITenantProvider _tenantProvider;

        public PayrollController(
            ApplicationDbContext dbContext,
            IEnumerable<IPayrollTaxStrategy> taxStrategies,
            ITenantProvider tenantProvider)
        {
            _dbContext = dbContext;
            _taxStrategies = taxStrategies;
            _tenantProvider = tenantProvider;
        }

        public record CalculationRequest(Guid EmployeeId, decimal BaseSalary, string CountryCode, DateTime PeriodStart, DateTime PeriodEnd);

        [HttpPost("calculate")]
        public async Task<IActionResult> CalculatePayroll([FromBody] CalculationRequest request)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Id == request.EmployeeId);
            if (employee == null)
            {
                return NotFound(new { message = $"Employee with ID '{request.EmployeeId}' not found." });
            }

            // Find strategy matching CountryCode
            var strategy = _taxStrategies.FirstOrDefault(s => s.CountryCode.Equals(request.CountryCode, StringComparison.OrdinalIgnoreCase));
            if (strategy == null)
            {
                return BadRequest(new { message = $"Tax strategy for country code '{request.CountryCode}' is not supported." });
            }

            // Execute decimal arithmetic calculation
            var taxResult = strategy.Calculate(employee, request.BaseSalary);

            // Create Immutable Payroll Record
            var payrollRecord = new PayrollRecord
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EmployeeId = employee.Id,
                PayPeriodStart = request.PeriodStart,
                PayPeriodEnd = request.PeriodEnd,
                CurrencyCode = request.CountryCode == "IN" ? "INR" : request.CountryCode == "UK" ? "GBP" : request.CountryCode == "UAE" ? "AED" : "USD",
                BasicSalary = request.BaseSalary,
                GrossSalary = taxResult.GrossSalary,
                TotalDeductions = taxResult.TotalDeductions,
                NetSalary = taxResult.NetSalary,
                Status = "Draft",
                PayslipUrl = $"/payslips/{Guid.NewGuid()}.pdf" // mock async generator path
            };

            _dbContext.PayrollRecords.Add(payrollRecord);

            // Outbox message
            var outboxMsg = new OutboxMessage
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EventType = nameof(PayrollProcessedEvent),
                Payload = JsonSerializer.Serialize(new PayrollProcessedEvent(
                    _tenantProvider.TenantId,
                    payrollRecord.Id,
                    employee.Id,
                    payrollRecord.PayPeriodStart,
                    payrollRecord.PayPeriodEnd,
                    payrollRecord.NetSalary
                )),
                CreatedAt = DateTimeOffset.UtcNow
            };
            _dbContext.OutboxMessages.Add(outboxMsg);

            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                data = new
                {
                    PayrollRecord = payrollRecord,
                    CalculationDetails = taxResult.Details
                },
                meta = new { strategyUsed = strategy.CountryCode }
            });
        }

        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetByEmployee(Guid employeeId)
        {
            var records = await _dbContext.PayrollRecords
                .Where(r => r.EmployeeId == employeeId)
                .OrderByDescending(r => r.PayPeriodStart)
                .ToListAsync();

            return Ok(new { data = records, meta = new { } });
        }

        [HttpPost("{id}/reverse")]
        public async Task<IActionResult> ReversePayroll(Guid id, [FromQuery] DateTime periodStart, [FromBody] string reason)
        {
            // Range-partitioned table requires the composite partition key (PayPeriodStart) to locate
            var record = await _dbContext.PayrollRecords
                .FirstOrDefaultAsync(r => r.Id == id && r.PayPeriodStart == periodStart);

            if (record == null)
            {
                return NotFound(new { message = "Payroll record not found." });
            }

            if (record.Status == "Reversed")
            {
                return BadRequest(new { message = "Payroll is already reversed." });
            }

            record.Status = "Reversed";
            record.LockVersion += 1;

            // Reversal creates a correction record (Immutable ledger rule)
            var correctionRecord = new PayrollRecord
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                EmployeeId = record.EmployeeId,
                PayPeriodStart = record.PayPeriodStart,
                PayPeriodEnd = record.PayPeriodEnd,
                CurrencyCode = record.CurrencyCode,
                BasicSalary = -record.BasicSalary,
                GrossSalary = -record.GrossSalary,
                TotalDeductions = -record.TotalDeductions,
                NetSalary = -record.NetSalary,
                Status = "Correction",
                PayslipUrl = record.PayslipUrl
            };

            _dbContext.PayrollRecords.Add(correctionRecord);

            // Audit
            var auditLog = new AuditLog
            {
                Id = Guid.NewGuid(),
                TenantId = _tenantProvider.TenantId,
                Action = "PayrollReversal",
                EntityType = nameof(PayrollRecord),
                EntityId = record.Id,
                OldValues = JsonSerializer.Serialize(new { Status = "Paid" }),
                NewValues = JsonSerializer.Serialize(new { Status = "Reversed", Reason = reason, CorrectionRecordId = correctionRecord.Id }),
                CreatedAt = DateTime.UtcNow
            };
            _dbContext.AuditLogs.Add(auditLog);

            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                message = "Payroll record successfully reversed and correction ledger created.",
                data = new
                {
                    ReversedRecord = record,
                    CorrectionRecord = correctionRecord
                }
            });
        }
    }
}
