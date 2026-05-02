using EMSAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EMSAPI.Data
{
    public class AppDbContext : DbContext
    {
        // DbContext receives options from Program.cs (connection string lives there)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // This tells EF Core: "there is a table called Employees"
        public DbSet<Employee> Employees { get; set; }
    }
}