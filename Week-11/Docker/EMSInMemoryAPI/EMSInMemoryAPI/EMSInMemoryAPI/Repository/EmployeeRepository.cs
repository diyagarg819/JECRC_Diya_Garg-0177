using EMSInMemoryAPI.Models;

namespace EMSInMemoryAPI.Repository
{
    public class EmployeeRepository
    {
        public static readonly List<Employee> _employees = new()
        {
            new Employee { Id = 1, Name = "John Doe", Department = "HR", Email = "JohnDoe@gmail.com" , Salary = 50000 } ,
            new Employee { Id = 2, Name = "Jane Smith", Department = "IT", Email = "JaneSmith@gmail.com" , Salary = 60000 } ,
        };
        public static List<Employee> GetAll() => _employees;

        public static Employee? GetById(int id) => _employees.FirstOrDefault(e => e.Id == id);

        public static void Add(Employee employee)
        {
            employee.Id = _employees.Max(e => e.Id) + 1;
            _employees.Add(employee);
        }   

        public static void Update(Employee employee)
        {
            var existingEmployee = GetById(employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Department = employee.Department;
                existingEmployee.Email = employee.Email;
                existingEmployee.Salary = employee.Salary;
            }
        }

        public static bool Delete(int id)
        {
            var employee = GetById(id);
            if (employee != null)
            {
                _employees.Remove(employee);
                return true;
            }
            return false;
        }
    }
}
