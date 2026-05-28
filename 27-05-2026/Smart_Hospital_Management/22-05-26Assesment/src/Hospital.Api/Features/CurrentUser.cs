using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features;

public static class CurrentUser
{
    public static Patient? GetPatient(ClaimsPrincipal user, IHospitalRepository repository)
    {
        if (!user.IsInRole(nameof(Role.Patient)))
        {
            return null;
        }

        var email = user.FindFirstValue(ClaimTypes.Email);
        return string.IsNullOrWhiteSpace(email)
            ? null
            : repository.Patients.FirstOrDefault(patient => string.Equals(patient.Email, email, StringComparison.OrdinalIgnoreCase));
    }

    public static Doctor? GetDoctor(ClaimsPrincipal user, IHospitalRepository repository)
    {
        if (!user.IsInRole(nameof(Role.Doctor)))
        {
            return null;
        }

        var fullName = user.FindFirstValue(ClaimTypes.Name);
        return string.IsNullOrWhiteSpace(fullName)
            ? null
            : repository.Doctors.FirstOrDefault(doctor => string.Equals(doctor.FullName, fullName, StringComparison.OrdinalIgnoreCase));
    }

    public static Guid? GetBranchId(ClaimsPrincipal user)
    {
        var branchId = user.FindFirstValue("branchId");
        return Guid.TryParse(branchId, out var value) ? value : null;
    }

    public static bool IsInAnyRole(this ClaimsPrincipal user, params Role[] roles) =>
        roles.Any(role => user.IsInRole(role.ToString()));
}
