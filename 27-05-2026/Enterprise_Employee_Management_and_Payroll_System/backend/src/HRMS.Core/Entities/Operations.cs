using System;

namespace HRMS.Core.Entities
{
    public class AttendanceRecord
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public Guid? ShiftId { get; set; }
        public Shift? Shift { get; set; }
        public DateTime BusinessDate { get; set; }
        public DateTimeOffset? CheckIn { get; set; }
        public DateTimeOffset? CheckOut { get; set; }
        public int WorkedMinutes { get; set; } = 0;
        public int OvertimeMinutes { get; set; } = 0;
        public string? Status { get; set; } // Present, Absent, OnLeave, HalfDay
        public string? Source { get; set; } // Biometric, Web, Mobile
        public string TimezoneId { get; set; } = "UTC";
        public bool AutoCheckout { get; set; } = false;
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class AttendancePunch
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public DateTimeOffset PunchTime { get; set; }
        public string PunchType { get; set; } = "IN"; // IN or OUT
        public string? DeviceId { get; set; }
        public string? RawPayload { get; set; } // JSON string in DB
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class LeaveType
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int MaxDays { get; set; }
        public bool AllowNegativeBalance { get; set; } = false;
        public bool IsCarryForward { get; set; } = true;
        public bool IsLWP { get; set; } = false;
    }

    public class LeaveRequest
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public Guid LeaveTypeId { get; set; }
        public LeaveType? LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal TotalDays { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
        public string? WorkflowInstanceId { get; set; }
        public string? Reason { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class PayrollRecord
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public DateTime PayPeriodStart { get; set; }
        public DateTime PayPeriodEnd { get; set; }
        public string CurrencyCode { get; set; } = "INR";
        public decimal BasicSalary { get; set; }
        public decimal GrossSalary { get; set; }
        public decimal TotalDeductions { get; set; }
        public decimal NetSalary { get; set; }
        public string Status { get; set; } = "Draft"; // Draft, Approved, Paid
        public int LockVersion { get; set; } = 0;
        public string? PayslipUrl { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class SalaryRevision
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public DateTime EffectiveDate { get; set; }
        public decimal OldSalary { get; set; }
        public decimal NewSalary { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class Asset
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public string AssetCode { get; set; } = string.Empty;
        public string AssetName { get; set; } = string.Empty;
        public string? Category { get; set; }
        public string? SerialNumber { get; set; }
        public string Status { get; set; } = "Available"; // Available, Assigned, UnderRepair, Scrapped
        public Guid? AssignedTo { get; set; }
        public Employee? AssignedEmployee { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public decimal? PurchaseCost { get; set; }
        public decimal? CurrentValue { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class AuditLog
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public Guid? UserId { get; set; }
        public string Action { get; set; } = string.Empty;
        public string EntityType { get; set; } = string.Empty;
        public Guid EntityId { get; set; }
        public string? OldValues { get; set; } // JSON
        public string? NewValues { get; set; } // JSON
        public Guid? CorrelationId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class IdempotencyKey
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public string Key { get; set; } = string.Empty;
        public string? RequestHash { get; set; }
        public string? Response { get; set; } // JSON
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }

    public class OutboxMessage
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid TenantId { get; set; }
        public string EventType { get; set; } = string.Empty;
        public string Payload { get; set; } = string.Empty; // JSON
        public DateTimeOffset? ProcessedAt { get; set; }
        public string? Error { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
