using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Reflection;

public class ExportService<T>
{
    // Export to CSV
    public string ExportToCSV(List<T> data)
    {
        if (data == null || data.Count == 0)
            return "No data available";

        StringBuilder csv = new StringBuilder();

        // Get Properties dynamically using Reflection
        PropertyInfo[] properties = typeof(T).GetProperties();

        // Header Row
        foreach (var prop in properties)
        {
            csv.Append(prop.Name + ",");
        }
        csv.Length--; // Remove last comma
        csv.AppendLine();

        // Data Rows
        foreach (var item in data)
        {
            foreach (var prop in properties)
            {
                var value = prop.GetValue(item);
                csv.Append(value + ",");
            }
            csv.Length--;
            csv.AppendLine();
        }

        return csv.ToString();
    }

    // Export to JSON
    public string ExportToJSON(List<T> data)
    {
        return JsonSerializer.Serialize(data, 
            new JsonSerializerOptions { WriteIndented = true });
    }
}

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Salary { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
}

public class DefaultSolution
{
    public static void Main()
    {
        // Create sample employee list
        List<Employee> employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "John", Salary = 50000 },
            new Employee { Id = 2, Name = "Sara", Salary = 60000 }
        };

        // Create sample product list
        List<Product> products = new List<Product>
        {
            new Product { Id = 101, Name = "Laptop", Price = 75000 },
            new Product { Id = 102, Name = "Mobile", Price = 25000 }
        };

        // Create generic export service
        ExportService<Employee> empExport = new ExportService<Employee>();
        ExportService<Product> prodExport = new ExportService<Product>();

        Console.WriteLine("===== EMPLOYEE CSV =====");
        Console.WriteLine(empExport.ExportToCSV(employees));

        Console.WriteLine("===== EMPLOYEE JSON =====");
        Console.WriteLine(empExport.ExportToJSON(employees));

        Console.WriteLine("===== PRODUCT CSV =====");
        Console.WriteLine(prodExport.ExportToCSV(products));

        Console.WriteLine("===== PRODUCT JSON =====");
        Console.WriteLine(prodExport.ExportToJSON(products));
    }
}