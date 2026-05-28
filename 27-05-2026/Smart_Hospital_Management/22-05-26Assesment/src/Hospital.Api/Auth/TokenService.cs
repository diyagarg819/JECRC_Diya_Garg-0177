using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Hospital.Api.Domain;
using Microsoft.Extensions.Options;

namespace Hospital.Api.Auth;

public sealed class TokenService(IOptions<AuthOptions> options) : ITokenService
{
    private readonly AuthOptions _options = options.Value;

    public string CreateToken(UserAccount user)
    {
        var now = DateTimeOffset.UtcNow;
        var header = Base64Url(JsonSerializer.SerializeToUtf8Bytes(new { alg = "HS256", typ = "JWT" }));
        var payload = Base64Url(JsonSerializer.SerializeToUtf8Bytes(new Dictionary<string, object?>
        {
            ["iss"] = _options.Issuer,
            ["aud"] = _options.Audience,
            ["sub"] = user.Id.ToString(),
            ["name"] = user.FullName,
            ["email"] = user.Email,
            ["role"] = user.Role.ToString(),
            ["branchId"] = user.BranchId?.ToString(),
            ["iat"] = now.ToUnixTimeSeconds(),
            ["exp"] = now.AddHours(8).ToUnixTimeSeconds()
        }));
        var signature = Sign($"{header}.{payload}");
        return $"{header}.{payload}.{signature}";
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        var parts = token.Split('.');
        if (parts.Length != 3)
        {
            return null;
        }

        var expectedSignature = Sign($"{parts[0]}.{parts[1]}");
        if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(expectedSignature), Encoding.UTF8.GetBytes(parts[2])))
        {
            return null;
        }

        using var document = JsonDocument.Parse(Base64UrlDecode(parts[1]));
        var root = document.RootElement;
        if (!root.TryGetProperty("exp", out var exp) || DateTimeOffset.FromUnixTimeSeconds(exp.GetInt64()) < DateTimeOffset.UtcNow)
        {
            return null;
        }

        if (root.GetProperty("iss").GetString() != _options.Issuer || root.GetProperty("aud").GetString() != _options.Audience)
        {
            return null;
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, root.GetProperty("sub").GetString() ?? string.Empty),
            new(ClaimTypes.Name, root.GetProperty("name").GetString() ?? string.Empty),
            new(ClaimTypes.Email, root.GetProperty("email").GetString() ?? string.Empty),
            new(ClaimTypes.Role, root.GetProperty("role").GetString() ?? string.Empty)
        };

        if (root.TryGetProperty("branchId", out var branchId) && branchId.ValueKind == JsonValueKind.String)
        {
            claims.Add(new Claim("branchId", branchId.GetString() ?? string.Empty));
        }

        return new ClaimsPrincipal(new ClaimsIdentity(claims, SimpleJwtAuthenticationDefaults.Scheme));
    }

    private string Sign(string input)
    {
        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_options.SigningKey));
        return Base64Url(hmac.ComputeHash(Encoding.UTF8.GetBytes(input)));
    }

    private static string Base64Url(byte[] bytes) =>
        Convert.ToBase64String(bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');

    private static byte[] Base64UrlDecode(string value)
    {
        var base64 = value.Replace('-', '+').Replace('_', '/');
        base64 = base64.PadRight(base64.Length + (4 - base64.Length % 4) % 4, '=');
        return Convert.FromBase64String(base64);
    }
}
