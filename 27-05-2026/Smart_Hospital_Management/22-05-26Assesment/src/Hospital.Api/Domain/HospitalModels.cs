namespace Hospital.Api.Domain;

public enum Role
{
    Patient,
    Doctor,
    Nurse,
    Pharmacist,
    LabTechnician,
    BillingOfficer,
    BranchAdmin,
    SuperAdmin
}

public enum AppointmentStatus
{
    Pending,
    Confirmed,
    InProgress,
    Completed,
    Cancelled
}

public enum EmergencySeverity
{
    Low,
    Medium,
    High,
    Critical
}

public sealed record HospitalBranch(Guid Id, string Name, string City, string EmergencyPhone);

public sealed record UserAccount(
    Guid Id,
    string FullName,
    string Email,
    Role Role,
    Guid? BranchId,
    string PasswordHash);

public sealed record Patient(
    Guid Id,
    string MedicalRecordNumber,
    string FullName,
    DateOnly DateOfBirth,
    string Phone,
    string Email,
    Guid BranchId,
    string InsuranceProvider);

public sealed record Doctor(
    Guid Id,
    string FullName,
    string Specialty,
    Guid BranchId,
    bool SupportsVideoConsultation);

public sealed record Appointment(
    Guid Id,
    Guid PatientId,
    Guid DoctorId,
    Guid BranchId,
    DateTimeOffset StartsAt,
    DateTimeOffset EndsAt,
    bool IsVideoConsultation,
    AppointmentStatus Status,
    string Reason);

public sealed record Prescription(
    Guid Id,
    Guid PatientId,
    Guid DoctorId,
    DateTimeOffset IssuedAt,
    IReadOnlyList<string> Medications,
    string Notes);

public sealed record LabReport(
    Guid Id,
    Guid PatientId,
    string TestName,
    string Status,
    DateTimeOffset OrderedAt,
    DateTimeOffset? ReportedAt,
    string? ResultSummary);

public sealed record Invoice(
    Guid Id,
    Guid PatientId,
    decimal Amount,
    string Currency,
    string Status,
    string InsuranceClaimStatus,
    DateTimeOffset CreatedAt);

public sealed record PaymentTransaction(
    Guid Id,
    Guid InvoiceId,
    decimal Amount,
    string Provider,
    string Status,
    string Reference,
    DateTimeOffset CreatedAt);

public sealed record PharmacyItem(
    Guid Id,
    string Name,
    string Category,
    int StockOnHand,
    int ReorderLevel,
    Guid BranchId);

public sealed record PharmacyOrder(
    Guid Id,
    Guid PatientId,
    Guid BranchId,
    IReadOnlyList<string> Items,
    string Status,
    DateTimeOffset CreatedAt);

public sealed record TelemedicineSession(
    Guid Id,
    Guid AppointmentId,
    Guid PatientId,
    Guid DoctorId,
    string Provider,
    string RoomUrl,
    DateTimeOffset StartsAt,
    DateTimeOffset ExpiresAt);

public sealed record EmergencyCase(
    Guid Id,
    Guid BranchId,
    string PatientName,
    EmergencySeverity Severity,
    string Location,
    string Status,
    DateTimeOffset ReportedAt);

public sealed record AuditEntry(
    Guid Id,
    DateTimeOffset OccurredAt,
    string Actor,
    string Action,
    string Resource,
    string Metadata);
