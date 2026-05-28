using System.Security.Claims;
using Hospital.Api.Application;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;
using Hospital.Api.Realtime;
using Microsoft.AspNetCore.SignalR;

namespace Hospital.Api.Features.Appointments;

public static class AppointmentEndpoints
{
    public static RouteGroupBuilder MapAppointmentEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/appointments");

        group.MapGet("/", (Guid? branchId, Guid? doctorId, Guid? patientId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<Appointment>());
            }

            var effectivePatientId = currentPatient?.Id ?? patientId;
            return Results.Ok(repository.GetAppointments(branchId, doctorId, effectivePatientId));
        });

        group.MapPost("/", async (CreateAppointmentRequest request, AppointmentScheduler scheduler, IAuditLog auditLog, IHubContext<HospitalHub> hub, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, scheduler.Repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Forbid();
            }

            var result = scheduler.Book(new CreateAppointmentCommand(
                currentPatient?.Id ?? request.PatientId,
                request.DoctorId,
                currentPatient?.BranchId ?? request.BranchId,
                request.StartsAt,
                request.DurationMinutes,
                request.IsVideoConsultation,
                request.Reason));

            if (result.Appointment is null)
            {
                var action = result.IsConflict ? "appointment.conflict" : "appointment.invalid";
                auditLog.Record(user.Identity?.Name ?? "unknown", action, nameof(Appointment), request.DoctorId.ToString());
                return result.IsConflict
                    ? Results.Conflict(new { message = result.Error })
                    : Results.BadRequest(new { message = result.Error });
            }

            var created = result.Appointment;
            auditLog.Record(user.Identity?.Name ?? "unknown", "appointment.created", nameof(Appointment), created.Id.ToString());
            await hub.Clients.Group($"branch:{created.BranchId}").SendAsync("appointment.created", created);
            await hub.Clients.Group($"patient:{created.PatientId}").SendAsync("appointment.created", created);
            return Results.Created($"/api/appointments/{created.Id}", created);
        });

        group.MapPatch("/{appointmentId:guid}/status", async (Guid appointmentId, UpdateAppointmentStatusRequest request, IHospitalRepository repository, IAuditLog auditLog, IHubContext<HospitalHub> hub, ClaimsPrincipal user) =>
        {
            var appointment = repository.GetAppointments().FirstOrDefault(item => item.Id == appointmentId);
            if (appointment is null)
            {
                return Results.NotFound();
            }

            var currentPatient = CurrentUser.GetPatient(user, repository);
            var currentDoctor = CurrentUser.GetDoctor(user, repository);
            var canUpdate =
                user.IsInAnyRole(Role.BranchAdmin, Role.SuperAdmin) ||
                currentDoctor?.Id == appointment.DoctorId;

            if (!canUpdate)
            {
                return Results.Forbid();
            }

            if (!repository.TryUpdateAppointmentStatus(appointmentId, request.Status, out var updated) || updated is null)
            {
                return Results.NotFound();
            }

            auditLog.Record(user.Identity?.Name ?? "unknown", "appointment.status.updated", nameof(Appointment), updated.Id.ToString());
            await hub.Clients.Group($"branch:{updated.BranchId}").SendAsync("appointment.updated", updated);
            await hub.Clients.Group($"patient:{updated.PatientId}").SendAsync("appointment.updated", updated);
            return Results.Ok(updated);
        });

        return api;
    }
}

public sealed record CreateAppointmentRequest(
    Guid PatientId,
    Guid DoctorId,
    Guid BranchId,
    DateTimeOffset StartsAt,
    int DurationMinutes,
    bool IsVideoConsultation,
    string Reason);

public sealed record UpdateAppointmentStatusRequest(AppointmentStatus Status);
