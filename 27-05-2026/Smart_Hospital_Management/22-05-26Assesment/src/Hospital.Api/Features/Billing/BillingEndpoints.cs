using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Billing;

public static class BillingEndpoints
{
    public static RouteGroupBuilder MapBillingEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/billing");

        group.MapGet("/invoices", (Guid? patientId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<Invoice>());
            }

            if (currentPatient is null && !user.IsInAnyRole(Role.BillingOfficer, Role.BranchAdmin, Role.SuperAdmin))
            {
                return Results.Forbid();
            }

            var effectivePatientId = currentPatient?.Id ?? patientId;
            return Results.Ok(repository.Invoices.Where(invoice => effectivePatientId is null || invoice.PatientId == effectivePatientId));
        });

        group.MapPost("/invoices", (CreateInvoiceRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            if (!user.IsInRole(nameof(Role.BillingOfficer)) && !user.IsInRole(nameof(Role.BranchAdmin)) && !user.IsInRole(nameof(Role.SuperAdmin)))
            {
                return Results.Forbid();
            }

            var invoice = repository.AddInvoice(new Invoice(Guid.NewGuid(), request.PatientId, request.Amount, request.Currency, "Pending", "NotSubmitted", DateTimeOffset.UtcNow));
            auditLog.Record(user.Identity?.Name ?? "unknown", "invoice.created", nameof(Invoice), invoice.Id.ToString());
            return Results.Created($"/api/billing/invoices/{invoice.Id}", invoice);
        });

        group.MapPost("/payments/create-session", (CreatePaymentSessionRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            var invoice = repository.Invoices.FirstOrDefault(item => item.Id == request.InvoiceId);
            if (invoice is null)
            {
                return Results.NotFound();
            }

            if (user.IsInRole(nameof(Role.Patient)) && (currentPatient is null || invoice.PatientId != currentPatient.Id))
            {
                return Results.Forbid();
            }

            if (currentPatient is null && !user.IsInAnyRole(Role.BillingOfficer, Role.BranchAdmin, Role.SuperAdmin))
            {
                return Results.Forbid();
            }

            auditLog.Record(user.Identity?.Name ?? "unknown", "payment.session.created", "PaymentGateway", request.InvoiceId.ToString());
            return Results.Ok(new
            {
                request.InvoiceId,
                provider = "Payment gateway placeholder",
                checkoutUrl = $"https://payments.example.local/checkout/{request.InvoiceId}",
                expiresAt = DateTimeOffset.UtcNow.AddMinutes(20)
            });
        });

        group.MapPost("/payments/confirm", (ConfirmPaymentRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            var invoice = repository.Invoices.FirstOrDefault(item => item.Id == request.InvoiceId);
            if (invoice is null)
            {
                return Results.NotFound();
            }

            if (user.IsInRole(nameof(Role.Patient)) && (currentPatient is null || invoice.PatientId != currentPatient.Id))
            {
                return Results.Forbid();
            }

            var payment = repository.AddPayment(new PaymentTransaction(Guid.NewGuid(), request.InvoiceId, invoice.Amount, request.Provider, "Authorized", request.Reference, DateTimeOffset.UtcNow));
            auditLog.Record(user.Identity?.Name ?? "unknown", "payment.confirmed", nameof(PaymentTransaction), payment.Id.ToString());
            return Results.Ok(payment);
        });

        return api;
    }
}

public sealed record CreateInvoiceRequest(Guid PatientId, decimal Amount, string Currency);

public sealed record CreatePaymentSessionRequest(Guid InvoiceId);

public sealed record ConfirmPaymentRequest(Guid InvoiceId, string Provider, string Reference);
