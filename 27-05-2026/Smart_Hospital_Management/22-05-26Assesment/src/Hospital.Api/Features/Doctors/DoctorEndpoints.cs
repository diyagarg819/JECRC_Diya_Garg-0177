using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Doctors;

public static class DoctorEndpoints
{
    public static RouteGroupBuilder MapDoctorEndpoints(this RouteGroupBuilder api)
    {
        api.MapGet("/doctors", (Guid? branchId, string? specialty, IHospitalRepository repository) =>
        {
            var doctors = repository.Doctors
                .Where(doctor => branchId is null || doctor.BranchId == branchId)
                .Where(doctor => string.IsNullOrWhiteSpace(specialty) || doctor.Specialty.Contains(specialty, StringComparison.OrdinalIgnoreCase));

            return Results.Ok(doctors);
        });

        return api;
    }
}
