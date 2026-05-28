using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Features;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Pharmacy;

public static class PharmacyEndpoints
{
    public static RouteGroupBuilder MapPharmacyEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/pharmacy");

        group.MapGet("/inventory", (Guid? branchId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            if (!user.IsInAnyRole(Role.Doctor, Role.Pharmacist, Role.BranchAdmin, Role.SuperAdmin))
            {
                return Results.Forbid();
            }

            var userBranchId = CurrentUser.GetBranchId(user);
            var effectiveBranchId = user.IsInRole(nameof(Role.SuperAdmin)) ? branchId : userBranchId ?? branchId;
            return Results.Ok(repository.PharmacyInventory.Where(item => effectiveBranchId is null || item.BranchId == effectiveBranchId));
        });

        group.MapGet("/orders", (Guid? patientId, IHospitalRepository repository, ClaimsPrincipal user) =>
        {
            var currentPatient = CurrentUser.GetPatient(user, repository);
            if (user.IsInRole(nameof(Role.Patient)) && currentPatient is null)
            {
                return Results.Ok(Array.Empty<PharmacyOrder>());
            }

            if (currentPatient is null && !user.IsInAnyRole(Role.Pharmacist, Role.BranchAdmin, Role.SuperAdmin))
            {
                return Results.Forbid();
            }

            var effectivePatientId = currentPatient?.Id ?? patientId;
            return Results.Ok(repository.PharmacyOrders.Where(order => effectivePatientId is null || order.PatientId == effectivePatientId));
        });

        group.MapPost("/orders", (CreatePharmacyOrderRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            if (!user.IsInAnyRole(Role.Pharmacist, Role.BranchAdmin, Role.SuperAdmin))
            {
                return Results.Forbid();
            }

            var missingItems = request.Items
                .Where(requested => !repository.PharmacyInventory.Any(item =>
                    item.BranchId == request.BranchId &&
                    item.StockOnHand > 0 &&
                    string.Equals(item.Name, requested, StringComparison.OrdinalIgnoreCase)))
                .ToList();

            if (missingItems.Count > 0)
            {
                return Results.BadRequest(new { message = $"Unavailable pharmacy item(s): {string.Join(", ", missingItems)}" });
            }

            var order = repository.AddPharmacyOrder(new PharmacyOrder(Guid.NewGuid(), request.PatientId, request.BranchId, request.Items, "Requested", DateTimeOffset.UtcNow));
            auditLog.Record(user.Identity?.Name ?? "unknown", "pharmacy.order.created", nameof(PharmacyOrder), order.Id.ToString());
            return Results.Created($"/api/pharmacy/orders/{order.Id}", order);
        });

        return api;
    }
}

public sealed record CreatePharmacyOrderRequest(Guid PatientId, Guid BranchId, IReadOnlyList<string> Items);
