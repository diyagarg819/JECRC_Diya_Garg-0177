namespace Hospital.Api.Application;

public sealed class SymptomTriageService
{
    public SymptomTriageResult Check(string symptoms)
    {
        var text = symptoms.ToLowerInvariant();
        var urgentSignals = new[] { "chest pain", "breathing", "stroke", "seizure", "unconscious", "bleeding" };
        var prioritySignals = new[] { "fever", "cough", "dizzy", "vomiting", "infection", "pain" };

        if (urgentSignals.Any(text.Contains))
        {
            return new SymptomTriageResult("Emergency", "Seek emergency care immediately and alert the nearest branch.");
        }

        if (prioritySignals.Any(text.Contains))
        {
            return new SymptomTriageResult("Priority consultation", "Book a doctor consultation within 24 hours and monitor symptoms.");
        }

        return new SymptomTriageResult("Self-care guidance", "Hydrate, rest, and schedule a routine consultation if symptoms continue.");
    }
}

public sealed record SymptomTriageResult(string Level, string Recommendation);
