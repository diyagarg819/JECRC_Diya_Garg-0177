using System.Collections.Concurrent;
using Hospital.Api.Auth;
using Hospital.Api.Domain;

namespace Hospital.Api.Infrastructure;

public sealed class InMemoryHospitalRepository : IHospitalRepository
{
    private readonly ConcurrentDictionary<Guid, Patient> _patients = new();
    private readonly ConcurrentDictionary<Guid, Appointment> _appointments = new();
    private readonly ConcurrentDictionary<Guid, Invoice> _invoices = new();
    private readonly ConcurrentDictionary<Guid, PaymentTransaction> _payments = new();
    private readonly ConcurrentDictionary<Guid, PharmacyOrder> _pharmacyOrders = new();
    private readonly ConcurrentDictionary<Guid, TelemedicineSession> _telemedicineSessions = new();
    private readonly ConcurrentDictionary<Guid, EmergencyCase> _emergencies = new();
    private readonly List<HospitalBranch> _branches;
    private readonly List<Doctor> _doctors;
    private readonly List<Prescription> _prescriptions;
    private readonly List<LabReport> _labReports;
    private readonly List<PharmacyItem> _pharmacyInventory;
    private readonly List<UserAccount> _users;
    private readonly object _bookingLock = new();

    public InMemoryHospitalRepository(IPasswordHasher passwordHasher)
    {
        var north = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var south = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var doctorOne = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
        var doctorTwo = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        var patientOne = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc");

        _branches =
        [
            new(north, "Central Care North", "Bengaluru", "+91-80-1000-1000"),
            new(south, "Central Care South", "Hyderabad", "+91-40-2000-2000")
        ];

        _doctors =
        [
            new(doctorOne, "Dr. Asha Rao", "Cardiology", north, true),
            new(doctorTwo, "Dr. Neeraj Menon", "General Medicine", south, true)
        ];

        var patient = new Patient(patientOne, "MRN-10001", "Sakshi Verma", new DateOnly(1992, 4, 18), "+91-90000-10001", "patient@hospital.local", north, "Azure Health Shield");
        _patients[patient.Id] = patient;

        var appointment = new Appointment(Guid.NewGuid(), patient.Id, doctorOne, north, DateTimeOffset.UtcNow.AddHours(4), DateTimeOffset.UtcNow.AddHours(4.5), true, AppointmentStatus.Confirmed, "Chest pain follow-up");
        _appointments[appointment.Id] = appointment;

        var telemedicine = new TelemedicineSession(Guid.NewGuid(), appointment.Id, patient.Id, doctorOne, "In-app Secure Video Room", $"/consultation/{appointment.Id}", appointment.StartsAt, appointment.EndsAt.AddMinutes(30));
        _telemedicineSessions[telemedicine.Id] = telemedicine;

        _prescriptions =
        [
            new(Guid.NewGuid(), patient.Id, doctorOne, DateTimeOffset.UtcNow.AddDays(-2), ["Atorvastatin 10mg", "Aspirin 75mg"], "Review after lab report.")
        ];

        _labReports =
        [
            new(Guid.NewGuid(), patient.Id, "Lipid Profile", "Ready", DateTimeOffset.UtcNow.AddDays(-2), DateTimeOffset.UtcNow.AddDays(-1), "LDL is above target range."),
            new(Guid.NewGuid(), patient.Id, "CBC", "Processing", DateTimeOffset.UtcNow.AddHours(-5), null, null)
        ];

        var invoice = new Invoice(Guid.NewGuid(), patient.Id, 2450, "INR", "Pending", "Submitted", DateTimeOffset.UtcNow.AddDays(-1));
        _invoices[invoice.Id] = invoice;

        _pharmacyInventory =
        [
            new(Guid.NewGuid(), "Aspirin 75mg", "Cardiac", 420, 80, north),
            new(Guid.NewGuid(), "Atorvastatin 10mg", "Cardiac", 260, 60, north),
            new(Guid.NewGuid(), "Paracetamol 500mg", "General", 900, 150, south)
        ];

        var pharmacyOrder = new PharmacyOrder(Guid.NewGuid(), patient.Id, north, ["Aspirin 75mg", "Atorvastatin 10mg"], "ReadyForPickup", DateTimeOffset.UtcNow.AddHours(-2));
        _pharmacyOrders[pharmacyOrder.Id] = pharmacyOrder;

        var emergency = new EmergencyCase(Guid.NewGuid(), north, "Walk-in patient", EmergencySeverity.High, "North branch emergency bay", "Triage", DateTimeOffset.UtcNow.AddMinutes(-12));
        _emergencies[emergency.Id] = emergency;

        _users =
        [
            new(Guid.NewGuid(), "Platform Admin", "admin@hospital.local", Role.SuperAdmin, null, passwordHasher.Hash("Admin@123")),
            new(Guid.NewGuid(), "Dr. Asha Rao", "doctor@hospital.local", Role.Doctor, north, passwordHasher.Hash("Doctor@123")),
            new(Guid.NewGuid(), "Sakshi Verma", "patient@hospital.local", Role.Patient, north, passwordHasher.Hash("Patient@123"))
        ];
    }

    public IReadOnlyList<HospitalBranch> Branches => _branches;
    public IReadOnlyList<Doctor> Doctors => _doctors;
    public IReadOnlyList<Patient> Patients => _patients.Values.OrderBy(p => p.FullName).ToList();
    public IReadOnlyList<Prescription> Prescriptions => _prescriptions;
    public IReadOnlyList<LabReport> LabReports => _labReports;
    public IReadOnlyList<Invoice> Invoices => _invoices.Values.OrderByDescending(i => i.CreatedAt).ToList();
    public IReadOnlyList<PaymentTransaction> Payments => _payments.Values.OrderByDescending(p => p.CreatedAt).ToList();
    public IReadOnlyList<PharmacyItem> PharmacyInventory => _pharmacyInventory;
    public IReadOnlyList<PharmacyOrder> PharmacyOrders => _pharmacyOrders.Values.OrderByDescending(o => o.CreatedAt).ToList();
    public IReadOnlyList<TelemedicineSession> TelemedicineSessions => _telemedicineSessions.Values.OrderByDescending(s => s.StartsAt).ToList();
    public IReadOnlyList<EmergencyCase> EmergencyCases => _emergencies.Values.OrderByDescending(e => e.ReportedAt).ToList();
    public IReadOnlyList<UserAccount> Users => _users;

    public UserAccount? FindUserByEmail(string email) =>
        _users.FirstOrDefault(user => string.Equals(user.Email, email, StringComparison.OrdinalIgnoreCase));

    public Patient AddPatient(Patient patient)
    {
        _patients[patient.Id] = patient;
        return patient;
    }

    public Appointment? AddAppointment(Appointment appointment)
    {
        lock (_bookingLock)
        {
            var conflict = _appointments.Values.Any(existing =>
                existing.DoctorId == appointment.DoctorId &&
                existing.Status is AppointmentStatus.Pending or AppointmentStatus.Confirmed or AppointmentStatus.InProgress &&
                appointment.StartsAt < existing.EndsAt &&
                appointment.EndsAt > existing.StartsAt);

            if (conflict)
            {
                return null;
            }

            _appointments[appointment.Id] = appointment;
            return appointment;
        }
    }

    public Invoice AddInvoice(Invoice invoice)
    {
        _invoices[invoice.Id] = invoice;
        return invoice;
    }

    public PaymentTransaction AddPayment(PaymentTransaction payment)
    {
        _payments[payment.Id] = payment;
        return payment;
    }

    public PharmacyOrder AddPharmacyOrder(PharmacyOrder order)
    {
        _pharmacyOrders[order.Id] = order;
        return order;
    }

    public TelemedicineSession AddTelemedicineSession(TelemedicineSession session)
    {
        _telemedicineSessions[session.Id] = session;
        return session;
    }

    public EmergencyCase AddEmergencyCase(EmergencyCase emergencyCase)
    {
        _emergencies[emergencyCase.Id] = emergencyCase;
        return emergencyCase;
    }

    public IReadOnlyList<Appointment> GetAppointments(Guid? branchId = null, Guid? doctorId = null, Guid? patientId = null) =>
        _appointments.Values
            .Where(appointment => branchId is null || appointment.BranchId == branchId)
            .Where(appointment => doctorId is null || appointment.DoctorId == doctorId)
            .Where(appointment => patientId is null || appointment.PatientId == patientId)
            .OrderBy(appointment => appointment.StartsAt)
            .ToList();

    public bool TryUpdateAppointmentStatus(Guid appointmentId, AppointmentStatus status, out Appointment? updated)
    {
        updated = null;
        if (!_appointments.TryGetValue(appointmentId, out var appointment))
        {
            return false;
        }

        updated = appointment with { Status = status };
        _appointments[appointmentId] = updated;
        return true;
    }
}
