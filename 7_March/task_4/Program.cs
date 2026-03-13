using System;

public class Employee
{
    public int EmployeeId { get; set; }
    public string Name { get; set; }
    public int Experience { get; set; }
    public double Salary { get; set; }
    public int PerformanceRating { get; set; }
}

public class PromotionEngine
{
    public void Validate(Employee employee, string department, Predicate<Employee> rule)
    {
        bool result = rule(employee);

        Console.WriteLine("========= PROMOTION VALIDATION =========");
        Console.WriteLine("Employee Name : " + employee.Name);
        Console.WriteLine("Department    : " + department);
        Console.WriteLine("Eligible      : " + result);
        Console.WriteLine("--------------------------------------");
        Console.WriteLine();
    }
}

public class Solution
{
    public static void Main()
    {
        Employee employee = new Employee
        {
            EmployeeId = 501,
            Name = "Ravi",
            Experience = 5,
            Salary = 65000,
            PerformanceRating = 4
        };

        Predicate<Employee> TechnicalPromotionRule = e => e.Experience >= 3;
        Predicate<Employee> HRPromotionRule = e => e.Experience >= 2 && e.PerformanceRating >= 4;
        Predicate<Employee> ManagementPromotionRule = e => e.Experience >= 5 && e.Salary >= 60000;

        PromotionEngine engine = new PromotionEngine();

        engine.Validate(employee, "Technical", TechnicalPromotionRule);
        engine.Validate(employee, "HR", HRPromotionRule);
        engine.Validate(employee, "Management", ManagementPromotionRule);
    }
}