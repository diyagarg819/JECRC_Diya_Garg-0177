using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Patients;

public static class PatientEndpoints
{
    public static RouteGroupBuilder MapPatientEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/patients");

        group.MapGet("/", (IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            if (user.IsInRole(nameof(Role.Patient)))
            {
                var patient = CurrentUser.GetPatient(user, repository);
                return Results.Ok(patient is null ? Array.Empty<Patient>() : new[] { patient });
            }

            var doctor = CurrentUser.GetDoctor(user, repository);
            if (doctor is not null)
            {
                var assignedPatientIds = repository.GetAppointments(doctorId: doctor.Id)
                    .Select(appointment => appointment.PatientId)
                    .ToHashSet();
                return Results.Ok(repository.Patients.Where(patient => assignedPatientIds.Contains(patient.Id)));
            }

            if (user.IsInAnyRole(Role.Nurse, Role.Pharmacist, Role.LabTechnician, Role.BillingOfficer, Role.BranchAdmin))
            {
                var branchId = CurrentUser.GetBranchId(user);
                return Results.Ok(repository.Patients.Where(patient => branchId is null || patient.BranchId == branchId));
            }

            if (!user.IsInRole(nameof(Role.SuperAdmin)))
            {
                return Results.Forbid();
            }

            return Results.Ok(repository.Patients);
        });

        group.MapPost("/", (CreatePatientRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            if (!user.IsInRole(nameof(Role.BranchAdmin)) && !user.IsInRole(nameof(Role.SuperAdmin)) && !user.IsInRole(nameof(Role.Nurse)))
            {
                return Results.Forbid();
            }

            var patient = new Patient(
                Guid.NewGuid(),
                $"MRN-{Random.Shared.Next(10000, 99999)}",
                request.FullName,
                request.DateOfBirth,
                request.Phone,
                request.Email,
                request.BranchId,
                request.InsuranceProvider);

            repository.AddPatient(patient);
            auditLog.Record(user.Identity?.Name ?? "unknown", "patient.registered", nameof(Patient), patient.Id.ToString());
            return Results.Created($"/api/patients/{patient.Id}", patient);
        });

        return api;
    }
}

public sealed record CreatePatientRequest(
    string FullName,
    DateOnly DateOfBirth,
    string Phone,
    string Email,
    Guid BranchId,
    string InsuranceProvider);
