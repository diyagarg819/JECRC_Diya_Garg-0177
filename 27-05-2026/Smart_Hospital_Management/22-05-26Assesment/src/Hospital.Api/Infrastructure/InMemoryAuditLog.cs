using System.Collections.Concurrent;
using Hospital.Api.Domain;

namespace Hospital.Api.Infrastructure;

public sealed class InMemoryAuditLog : IAuditLog
{
    private readonly ConcurrentQueue<AuditEntry> _entries = new();

    public void Record(string actor, string action, string resource, string metadata)
    {
        _entries.Enqueue(new AuditEntry(Guid.NewGuid(), DateTimeOffset.UtcNow, actor, action, resource, metadata));
        while (_entries.Count > 500)
        {
            _entries.TryDequeue(out _);
        }
    }

    public IReadOnlyList<AuditEntry> Recent(int count = 50) =>
        _entries.Reverse().Take(count).ToList();
}
