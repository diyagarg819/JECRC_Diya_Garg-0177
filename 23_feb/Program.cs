using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Employee
{
    public class Employee
    {
        public int EMP_ID { get; set; }
        public string? EMP_NAME { get; set; }
        public string? EMP_DEPARTMENT { get; set; }
        public string? EMP_SALARY { get; set; }
    }
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = "Server=(localdb)\\MSSQLLocalDB;Database=Capgemini;Trusted_Connection=True;";
            List<Employee> employees = new List<Employee>();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT EMP_ID, EMP_NAME, EMP_DEPARTMENT, EMP_SALARY FROM Employee";
                using(SqlCommand command = new SqlCommand(query, connection))
                using(SqlDataReader reader = command.ExecuteReader())
                {
                while (reader.Read())
                {
                    Employee employee = new Employee
                    {
                        EMP_ID = reader.GetInt32(0),
                        EMP_NAME = reader.GetString(1),
                        EMP_DEPARTMENT = reader.GetString(2),
                        EMP_SALARY = reader.GetString(3)
                    };
                    employees.Add(employee);
                }
            }
                }
            foreach (var emp in employees)
            {
                Console.WriteLine($"ID: {emp.EMP_ID}, Name: {emp.EMP_NAME}, Department: {emp.EMP_DEPARTMENT}, Salary: {emp.EMP_SALARY}");
            }
        }
        catch(Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }   
        Console.ReadLine();
    }
}
}