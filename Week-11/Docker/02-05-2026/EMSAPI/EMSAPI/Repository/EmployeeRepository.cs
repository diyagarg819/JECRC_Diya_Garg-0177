
using EMSAPI.Models;
using EMSAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace EMSAPI.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        // EF Core's AppDbContext is injected automatically
        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        // EF Core translates this to: SELECT * FROM Employees
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.Employees.ToListAsync();
        }

        // EF Core translates this to: SELECT * FROM Employees WHERE Id = @id
        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // EF Core translates this to: INSERT INTO Employees ...
        public async Task CreateAsync(Employee employee)
        {
            employee.CreatedDate = DateTime.Now;
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();  // this line actually runs the SQL
        }

        // EF Core translates this to: UPDATE Employees SET ... WHERE Id = @id
        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        // EF Core translates this to: DELETE FROM Employees WHERE Id = @id
        public async Task DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }
    }
}