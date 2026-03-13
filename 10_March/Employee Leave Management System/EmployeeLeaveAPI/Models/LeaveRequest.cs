using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeLeaveAPI.Models
{
    public class LeaveRequest
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string LeaveType { get; set; }   // Sick Leave, Casual Leave, etc.
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; } = "Pending";  // Pending, Approved, Rejected
    }
}
