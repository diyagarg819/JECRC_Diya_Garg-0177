using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Admin;

public static class AdminEndpoints
{
    public static RouteGroupBuilder MapAdminEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/admin");

        group.MapGet("/analytics", (IHospitalRepository repository) =>
        {
            var appointments = repository.GetAppointments();
            return Results.Ok(new
            {
                branches = repository.Branches.Count,
                registeredPatients = repository.Patients.Count,
                doctors = repository.Doctors.Count,
                appointmentsToday = appointments.Count(a => a.StartsAt.Date == DateTimeOffset.UtcNow.Date),
                emergencyOpenCases = repository.EmergencyCases.Count(e => !string.Equals(e.Status, "Closed", StringComparison.OrdinalIgnoreCase)),
                pendingInvoices = repository.Invoices.Count(i => i.Status == "Pending"),
                videoConsultations = appointments.Count(a => a.IsVideoConsultation),
                branchLoad = repository.Branches.Select(branch => new
                {
                    branch.Id,
                    branch.Name,
                    activeEmergencies = repository.EmergencyCases.Count(e => e.BranchId == branch.Id),
                    upcomingAppointments = appointments.Count(a => a.BranchId == branch.Id && a.Status is AppointmentStatus.Pending or AppointmentStatus.Confirmed)
                })
            });
        }).RequireAuthorization(policy => policy.RequireRole(nameof(Role.BranchAdmin), nameof(Role.SuperAdmin)));

        group.MapGet("/audit", (int? count, IAuditLog auditLog) =>
            Results.Ok(auditLog.Recent(count.GetValueOrDefault(50))))
            .RequireAuthorization(policy => policy.RequireRole(nameof(Role.BranchAdmin), nameof(Role.SuperAdmin)));

        group.MapGet("/branches", (IHospitalRepository repository) => Results.Ok(repository.Branches));

        return api;
    }
}
