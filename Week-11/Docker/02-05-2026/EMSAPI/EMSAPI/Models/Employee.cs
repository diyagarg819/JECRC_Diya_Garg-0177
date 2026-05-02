namespace EMSAPI.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Salary { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
