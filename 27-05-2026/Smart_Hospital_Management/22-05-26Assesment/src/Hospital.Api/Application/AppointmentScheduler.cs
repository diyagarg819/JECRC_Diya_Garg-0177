using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Application;

public sealed class AppointmentScheduler(IHospitalRepository repository)
{
    public IHospitalRepository Repository => repository;

    public AppointmentBookingResult Book(CreateAppointmentCommand command)
    {
        if (command.DurationMinutes is < 10 or > 240)
        {
            return AppointmentBookingResult.Invalid("Appointment duration must be between 10 and 240 minutes.");
        }

        if (!repository.Patients.Any(patient => patient.Id == command.PatientId))
        {
            return AppointmentBookingResult.Invalid("Patient was not found.");
        }

        var doctor = repository.Doctors.FirstOrDefault(item => item.Id == command.DoctorId);
        if (doctor is null)
        {
            return AppointmentBookingResult.Invalid("Doctor was not found.");
        }

        if (command.IsVideoConsultation && !doctor.SupportsVideoConsultation)
        {
            return AppointmentBookingResult.Invalid("This doctor is not enabled for video consultation.");
        }

        var startsAt = command.StartsAt.ToUniversalTime();
        var appointment = new Appointment(
            Guid.NewGuid(),
            command.PatientId,
            command.DoctorId,
            command.BranchId,
            startsAt,
            startsAt.AddMinutes(command.DurationMinutes),
            command.IsVideoConsultation,
            AppointmentStatus.Confirmed,
            command.Reason);

        var created = repository.AddAppointment(appointment);
        return created is null
            ? AppointmentBookingResult.Conflict("The selected doctor already has an appointment in this time window.")
            : AppointmentBookingResult.Success(created);
    }
}

public sealed record CreateAppointmentCommand(
    Guid PatientId,
    Guid DoctorId,
    Guid BranchId,
    DateTimeOffset StartsAt,
    int DurationMinutes,
    bool IsVideoConsultation,
    string Reason);

public sealed record AppointmentBookingResult(Appointment? Appointment, string? Error, bool IsConflict)
{
    public static AppointmentBookingResult Success(Appointment appointment) => new(appointment, null, false);
    public static AppointmentBookingResult Conflict(string error) => new(null, error, true);
    public static AppointmentBookingResult Invalid(string error) => new(null, error, false);
}
