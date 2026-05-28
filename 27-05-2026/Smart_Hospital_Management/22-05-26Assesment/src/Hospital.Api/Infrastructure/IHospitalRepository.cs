using Hospital.Api.Domain;

namespace Hospital.Api.Infrastructure;

public interface IHospitalRepository
{
    IReadOnlyList<HospitalBranch> Branches { get; }
    IReadOnlyList<Doctor> Doctors { get; }
    IReadOnlyList<Patient> Patients { get; }
    IReadOnlyList<Prescription> Prescriptions { get; }
    IReadOnlyList<LabReport> LabReports { get; }
    IReadOnlyList<Invoice> Invoices { get; }
    IReadOnlyList<PaymentTransaction> Payments { get; }
    IReadOnlyList<PharmacyItem> PharmacyInventory { get; }
    IReadOnlyList<PharmacyOrder> PharmacyOrders { get; }
    IReadOnlyList<TelemedicineSession> TelemedicineSessions { get; }
    IReadOnlyList<EmergencyCase> EmergencyCases { get; }
    IReadOnlyList<UserAccount> Users { get; }

    UserAccount? FindUserByEmail(string email);
    Patient AddPatient(Patient patient);
    Appointment? AddAppointment(Appointment appointment);
    Invoice AddInvoice(Invoice invoice);
    PaymentTransaction AddPayment(PaymentTransaction payment);
    PharmacyOrder AddPharmacyOrder(PharmacyOrder order);
    TelemedicineSession AddTelemedicineSession(TelemedicineSession session);
    EmergencyCase AddEmergencyCase(EmergencyCase emergencyCase);
    IReadOnlyList<Appointment> GetAppointments(Guid? branchId = null, Guid? doctorId = null, Guid? patientId = null);
    bool TryUpdateAppointmentStatus(Guid appointmentId, AppointmentStatus status, out Appointment? updated);
}
