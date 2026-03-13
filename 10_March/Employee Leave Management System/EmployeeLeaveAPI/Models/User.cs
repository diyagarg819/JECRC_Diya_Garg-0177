using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeLeaveAPI.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }  // Admin, Manager, Employee
    }
}
