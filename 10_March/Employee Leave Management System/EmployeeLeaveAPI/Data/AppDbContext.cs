using Microsoft.EntityFrameworkCore;
using EmployeeLeaveAPI.Models;

namespace EmployeeLeaveAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
    }
}
