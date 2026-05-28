namespace Hospital.Api.Auth;

public sealed class AuthOptions
{
    public string Issuer { get; init; } = "HospitalPlatform";
    public string Audience { get; init; } = "HospitalPlatform.Web";
    public string SigningKey { get; init; } = "development-only-key";
}
