using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Data.SqlClient;

namespace Employee_Management_System1
{
    internal class EmployeeService
    {
        private readonly string connectionstring =
    "Data Source=(localdb)\\MSSQLLocalDB;" +
    "Initial Catalog=EmployeeDb;" +
    "Integrated Security=True;" +
    "Connect Timeout=30;" +
    "Encrypt=True;" +
    "Trust Server Certificate=False;";
        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("===Employee Management System===");
                Console.WriteLine("1. View all databases");
                Console.WriteLine("2. Insert employee");
                Console.WriteLine("3. Update employee");
                Console.WriteLine("4. Delete employee");
                Console.WriteLine("5. Search by employee ID");
                Console.WriteLine("6. Search by department name");
                Console.WriteLine("7. Exit");
                Console.WriteLine("Enter the choice : ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        ViewEmployees();
                        break;
                    case 2:
                        InsertEmployee();
                        break;
                    case 3:
                        UpdateEmployee();
                        break; 
                    case 4:
                        DeleteEmployee();
                        break;
                     case 5:
                        SearchEmployeeById();
                        break;
                    case 6:

                        break;
                    case 7:
                        break;
                    default:
                        Console.WriteLine("Invalid Choice !!!");
                        break;
                }
                Console.WriteLine("/n Press Enter to Continue...");
                Console.ReadLine();
            }
        }
        public void ViewEmployees()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Select Id , Name , Department , Salary from Employee";
            using SqlCommand cmd = new SqlCommand(query,conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine("\n ----Employee List -----");
            while (reader.Read())
            {
                Console.WriteLine($"{reader.GetInt32(0)}" + 
                    $" | {reader.GetString(1)}" +
                    $" | {reader.GetString(2)}" +
                    $" | {reader.GetInt32(3)}");
            }
        }

        EmployeeModel emp = new EmployeeModel();

        public void InsertEmployee()
        {
            
            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();
            Console.WriteLine("Enter Employee Deaprtment");
            emp.Department = Console.ReadLine();
            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Insert into Employee" +
                "(Name,Department,Salary)VALUES(@Name,@Department,@Salary)";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            cmd.ExecuteNonQuery();
            Console.WriteLine("Employee Inserted Successfully");
        }

        public void DeleteEmployee()
        {
            Console.WriteLine("Enter employee Id");
            emp.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "DELETE FROM Employee WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);

            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Deleted Successfully " : "Employee Not Found");
        }

        public void UpdateEmployee()
        {
            Console.WriteLine("Enter Employee Id");
            emp.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();
            Console.WriteLine("Enter Employee Deaprtment");
            emp.Department = Console.ReadLine();
            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Update Employee " +
                "SET Name = @Name , Department = @Department , Salary = @Salary " +
                "WHERE Id = @Id ";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            int rowsAffected = cmd.ExecuteNonQuery();
            Console.WriteLine(rowsAffected > 0 ? "Employees Updated Successfully" : "employee Not  Found");
        }

        public void SearchEmployeeById()
        {
            Console.WriteLine("Enter employee Id");
            emp.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name , Department , Salary " +
                "FROM Employee " +
                "WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                emp.Id = reader.GetInt32(0);
                emp.Name = reader.GetString(1);
                emp.Department = reader.GetString(2);
                emp.Salary = reader.GetInt32(3);
                Console.WriteLine($"{emp.Id} " +
                    $"|{emp.Name}" +
                    $"|{emp.Department}" +
                    $"|{emp.Salary}");
            }
            else
            {
                Console.WriteLine("Employee Not found !!!!");
            }
            
        }

        public void SearchEmployeeByDepartment()
        {
            Console.WriteLine("Enter employee Department");
            emp.Department = Console.ReadLine();
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name , Department , Salary " +
                "FROM Employee " +
                "WHERE Department = @Department";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                emp.Id = reader.GetInt32(0);
                emp.Name = reader.GetString(1);
                emp.Department = reader.GetString(2);
                emp.Salary = reader.GetInt32(3);
                Console.WriteLine($"{emp.Id} " +
                    $"|{emp.Name}" +
                    $"|{emp.Department}" +
                    $"|{emp.Salary}");
            }
            else
            {
                Console.WriteLine("Employee Not found !!!!");
            }

        }
    }
}
