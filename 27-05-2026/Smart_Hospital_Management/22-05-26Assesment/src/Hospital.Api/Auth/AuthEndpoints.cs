using Hospital.Api.Infrastructure;

namespace Hospital.Api.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", (LoginRequest request, IHospitalRepository repository, IPasswordHasher passwordHasher, ITokenService tokenService, IAuditLog auditLog) =>
        {
            var user = repository.FindUserByEmail(request.Email);
            if (user is null || !passwordHasher.Verify(request.Password, user.PasswordHash))
            {
                auditLog.Record("anonymous", "auth.login.failed", "UserAccount", request.Email);
                return Results.Unauthorized();
            }

            auditLog.Record(user.Email, "auth.login.succeeded", "UserAccount", user.Id.ToString());
            return Results.Ok(new LoginResponse(tokenService.CreateToken(user), user.FullName, user.Email, user.Role.ToString(), user.BranchId));
        });

        return app;
    }
}

public sealed record LoginRequest(string Email, string Password);

public sealed record LoginResponse(string AccessToken, string FullName, string Email, string Role, Guid? BranchId);
