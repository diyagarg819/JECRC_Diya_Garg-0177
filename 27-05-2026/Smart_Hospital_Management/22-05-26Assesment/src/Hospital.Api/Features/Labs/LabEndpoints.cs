using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Labs;

public static class LabEndpoints
{
    public static RouteGroupBuilder MapLabEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/clinical");

        group.MapGet("/prescriptions", (Guid? patientId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<Prescription>());
            }

            var effectivePatientId = currentPatient?.Id ?? patientId;
            return Results.Ok(repository.Prescriptions.Where(p => effectivePatientId is null || p.PatientId == effectivePatientId));
        });

        group.MapGet("/lab-reports", (Guid? patientId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<LabReport>());
            }

            var effectivePatientId = currentPatient?.Id ?? patientId;
            return Results.Ok(repository.LabReports.Where(r => effectivePatientId is null || r.PatientId == effectivePatientId));
        });

        return api;
    }
}
