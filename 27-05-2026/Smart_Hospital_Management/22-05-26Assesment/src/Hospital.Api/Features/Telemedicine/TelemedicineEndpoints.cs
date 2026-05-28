using System.Security.Claims;
using Hospital.Api.Application;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Telemedicine;

public static class TelemedicineEndpoints
{
    public static RouteGroupBuilder MapTelemedicineEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/telemedicine");

        group.MapGet("/sessions", (Guid? appointmentId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<TelemedicineSession>());
            }

            return Results.Ok(repository.TelemedicineSessions
                .Where(session => appointmentId is null || session.AppointmentId == appointmentId)
                .Where(session => currentPatient is null || session.PatientId == currentPatient.Id));
        });

        group.MapPost("/sessions", (CreateTelemedicineSessionRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            var appointment = repository.GetAppointments().FirstOrDefault(item => item.Id == request.AppointmentId);
            if (appointment is null)
            {
                return Results.NotFound();
            }

            if (user.IsInRole(nameof(Role.Patient)) && (currentPatient is null || appointment.PatientId != currentPatient.Id))
            {
                return Results.Forbid();
            }

            if (!appointment.IsVideoConsultation)
            {
                return Results.BadRequest(new { message = "Appointment is not marked as a video consultation." });
            }

            var session = repository.AddTelemedicineSession(new TelemedicineSession(
                Guid.NewGuid(),
                appointment.Id,
                appointment.PatientId,
                appointment.DoctorId,
                "In-app Secure Video Room",
                $"/consultation/{appointment.Id}",
                appointment.StartsAt,
                appointment.EndsAt.AddMinutes(30)));

            auditLog.Record(user.Identity?.Name ?? "unknown", "telemedicine.session.created", nameof(TelemedicineSession), session.Id.ToString());
            return Results.Created($"/api/telemedicine/sessions/{session.Id}", session);
        });

        group.MapPost("/symptom-check", (SymptomCheckRequest request, SymptomTriageService triageService, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            var result = triageService.Check(request.Symptoms);
            auditLog.Record(user.Identity?.Name ?? "unknown", "symptom-check.completed", "AIChatbot", result.Level);
            return Results.Ok(result);
        });

        return api;
    }
}

public sealed record CreateTelemedicineSessionRequest(Guid AppointmentId);
public sealed record SymptomCheckRequest(string Symptoms);
