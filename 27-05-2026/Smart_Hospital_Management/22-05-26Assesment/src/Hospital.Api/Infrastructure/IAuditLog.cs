using Hospital.Api.Domain;

namespace Hospital.Api.Infrastructure;

public interface IAuditLog
{
    void Record(string actor, string action, string resource, string metadata);
    IReadOnlyList<AuditEntry> Recent(int count = 50);
}
