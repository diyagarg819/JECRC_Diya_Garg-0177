using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Data.SqlClient;

namespace Product_Management_System
{
    internal class ProductService
    {
        private readonly string connectionstring =
    "Data Source=(localdb)\\MSSQLLocalDB;" +
    "Initial Catalog=ProductDB;" +
    "Integrated Security=True;" +
    "Connect Timeout=30;" +
    "Encrypt=True;" +
    "Trust Server Certificate=False;";
        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("===Product Management System===");
                Console.WriteLine("1. View all products");
                Console.WriteLine("2. Insert a new product");
                Console.WriteLine("3. Update product details");
                Console.WriteLine("4. Delete a product");
                Console.WriteLine("5. Search product by ID");
                Console.WriteLine("6. Search product by category");
                Console.WriteLine("7. Sort Products");
                Console.WriteLine("8. Exit");
                Console.WriteLine("Enter the choice : ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        ViewProducts();
                        break;
                    case 2:
                        InsertProduct();
                        break;
                    case 3:
                        UpdateProduct();
                        break;
                    case 4:
                        DeleteProduct();
                        break;
                    case 5:
                        SearchProductByID();
                        break;
                    case 6:
                        SearchProductByCategory();
                        break;
                    case 7:
                        SortProducts();
                        break;
                    case 8:
                        break;
                    default:
                        Console.WriteLine("Invalid Choice !!!");
                        break;
                }
                Console.WriteLine("/n Press Enter to Continue...");
                Console.ReadLine();
            }
        }
        public void ViewProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Select Id,Name,Category,Price,InStock from Products";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine("\n ----Product List -----");
            while (reader.Read())
            {
                Console.WriteLine($"{reader.GetInt32(0)}" +
                    $" | {reader.GetString(1)}" +
                    $" | {reader.GetString(2)}" +
                    $" | {reader.GetDouble(3)}" +
                    $" | {reader.GetBoolean(4)}");
            }
        }

        ProductModel product = new ProductModel();

        public void InsertProduct()
        {

            Console.WriteLine("Enter Product Name");
            product.Name = Console.ReadLine();
            Console.WriteLine("Enter Product Category");
            product.Category = Console.ReadLine();
            Console.WriteLine("Enter Product Price");
            product.Price = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter Product InStock");
            product.InStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Insert into Products" +
                "(Name,Category,Price,Instock)VALUES(@Name,@Category,@Price,@InStock)";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", product.Name);
            cmd.Parameters.AddWithValue("@Category", product.Category);
            cmd.Parameters.AddWithValue("@Price", product.Price);
            cmd.Parameters.AddWithValue("@InStock", product.InStock);
            cmd.ExecuteNonQuery();
            Console.WriteLine("Product Inserted Successfully");
        }

        public void DeleteProduct()
        {
            Console.WriteLine("Enter employee Id");
            product.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "DELETE FROM Products WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", product.Id);

            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Product Deleted Successfully " : "Product Not Found");
        }

        public void UpdateProduct()
        {
            Console.WriteLine("Enter Product Id");
            product.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Product Name");
            product.Name = Console.ReadLine();
            Console.WriteLine("Enter Product Category");
            product.Category = Console.ReadLine();
            Console.WriteLine("Enter Product Price");
            product.Price = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter Product is in Stock or not");
            product.InStock = Convert.ToBoolean(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "Update Products " +
                "SET Name = @Name , Category = @Category , Price = @Price , InStock = @InStock " +
                "WHERE Id = @Id ";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", product.Id);
            cmd.Parameters.AddWithValue("@Name", product.Name);
            cmd.Parameters.AddWithValue("@Category", product.Category);
            cmd.Parameters.AddWithValue("@Price", product.Price);
            cmd.Parameters.AddWithValue("@InStock", product.InStock);
            int rowsAffected = cmd.ExecuteNonQuery();
            Console.WriteLine(rowsAffected > 0 ? "Product Updated Successfully" : "Product Not  Found");
        }

        public void SearchProductByID()
        {
            Console.WriteLine("Enter product Id");
            product.Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name ,Category ,Price,InStock " +
                "FROM Products " +
                "WHERE Id = @Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", product.Id);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                product.Id = reader.GetInt32(0);
                product.Name = reader.GetString(1);
                product.Category = reader.GetString(2);
                product.Price = reader.GetDouble(3);
                product.InStock = reader.GetBoolean(4);
                Console.WriteLine($"{product.Id} " +
                    $"|{product.Name}" +
                    $"|{product.Category}" +
                    $"|{product.Price}" +
                    $"|{product.InStock}");
            }
            else
            {
                Console.WriteLine("Product Not found !!!!");
            }

        }

        public void SearchProductByCategory()
        {
            Console.WriteLine("Enter product category");
            product.Category = Console.ReadLine();
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name ,Category ,Price,InStock " +
                "FROM Products " +
                "WHERE Category = @Category";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Category", product.Category);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                product.Id = reader.GetInt32(0);
                product.Name = reader.GetString(1);
                product.Category = reader.GetString(2);
                product.Price = reader.GetDouble(3);
                product.InStock = reader.GetBoolean(4);
                Console.WriteLine($"{product.Id} " +
                    $"|{product.Name}" +
                    $"|{product.Category}" +
                    $"|{product.Price}" +
                    $"|{product.InStock}");
            }
            else
            {
                Console.WriteLine("Product Not found !!!!");
            }
        }

        public void SortProducts()
        {
            using SqlConnection conn = new SqlConnection(connectionstring);
            conn.Open();

            string query = "SELECT Id, Name ,Category ,Price,InStock " +
                "FROM Products " +
                "Order By Category";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine("\n ----Product List -----");
            while (reader.Read())
            {
                Console.WriteLine($"{reader.GetInt32(0)}" +
                    $" | {reader.GetString(1)}" +
                    $" | {reader.GetString(2)}" +
                    $" | {reader.GetDouble(3)}" +
                    $" | {reader.GetBoolean(4)}");
            }
        }
    }
}

