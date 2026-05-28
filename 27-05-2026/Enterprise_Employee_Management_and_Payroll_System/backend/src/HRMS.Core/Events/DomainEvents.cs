using System;

namespace HRMS.Core.Events
{
    public interface IDomainEvent
    {
        Guid TenantId { get; }
        DateTimeOffset OccurredAt { get; }
    }

    public record EmployeeCreatedEvent(
        Guid TenantId,
        Guid EmployeeId,
        string EmployeeCode,
        string Email,
        DateTime DateOfJoining
    ) : IDomainEvent
    {
        public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
    }

    public record EmployeeTerminatedEvent(
        Guid TenantId,
        Guid EmployeeId,
        string EmployeeCode,
        DateTime TerminationDate,
        string Reason
    ) : IDomainEvent
    {
        public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
    }

    public record LeaveAppliedEvent(
        Guid TenantId,
        Guid LeaveRequestId,
        Guid EmployeeId,
        Guid LeaveTypeId,
        DateTime StartDate,
        DateTime EndDate,
        decimal TotalDays
    ) : IDomainEvent
    {
        public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
    }

    public record LeaveApprovedEvent(
        Guid TenantId,
        Guid LeaveRequestId,
        Guid EmployeeId,
        string ApprovedBy
    ) : IDomainEvent
    {
        public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
    }

    public record PayrollProcessedEvent(
        Guid TenantId,
        Guid PayrollRecordId,
        Guid EmployeeId,
        DateTime PayPeriodStart,
        DateTime PayPeriodEnd,
        decimal NetSalary
    ) : IDomainEvent
    {
        public DateTimeOffset OccurredAt { get; } = DateTimeOffset.UtcNow;
    }
}
