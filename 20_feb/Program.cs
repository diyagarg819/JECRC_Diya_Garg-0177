//	Using Gen and list

/*namespace Collection
{
    class UsingGenrics<T>
    {
        T obj;
        public UsingGenrics(T obj)
        {
            this.obj = obj;
        }
        public T Get()
        {
            return obj;
        }
        public void Show()
        {
            Console.WriteLine("Type of T is " + typeof(T));
        }

    }
    class Program
    {
        public static void Main(string[] args)
        {
            UsingGenrics<int> objdata = new UsingGenrics<int>(500);
            objdata.Show();
            UsingGenrics<string> objdata1 = new UsingGenrics<string>("hello");
            objdata1.Show();
        }
    }
}*/

/*using System;
using  System.Collections;

namespace ProductDemo
{
    public class Product
    {
        public int Id{get;set;}
        public string Name{get;set;}
        public string Description{get;set;}
        public double Price{get;set;}
        public bool IsStock{get;set;}
    }

    public class ProductCatalog
    {
        private List<Product> products;

        public ProductCatalog()
        {
            products = new List<Product>{
                new Product{Id = 100 , Name = "Laptop" , Description = "Electronics Item" , Price = 75000 , IsStock = true},
                new Product{Id = 101 , Name = "TV" , Description = "Electronics Item" , Price = 175000 , IsStock = true},
                new Product{Id = 102 , Name ="SmartPhone" , Description = "Electronics Item" , Price = 50000 , IsStock = true},
                new Product{Id = 103 , Name = "Fridge" , Description = "Electronics Item" , Price = 65000 , IsStock = true},
            };
        }

        public void DisplayProducts()
        {
            foreach(var product in products)
            {
                Console.WriteLine(product.Name);
                Console.WriteLine(product.Description);
                Console.WriteLine(product.Price);

            }
        }
    }

    class TestProgram
    {
        static void Main(string[] args)
        {
            ProductCatalog catalog = new ProductCatalog();
            catalog.DisplayProducts();
        }
    }
}*/

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace ProductDemo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }
    }

    public class ProductCatalog
    {
        private List<Product> products;

        public ProductCatalog()
        {
            products = new List<Product>
            {
                new Product { Id = 100, Name = "Laptop", Description = "Electronics Item", Price = 75000, IsStock = true },
                new Product { Id = 101, Name = "TV", Description = "Electronics Item", Price = 175000, IsStock = true },
                new Product { Id = 102, Name = "SmartPhone", Description = "Electronics Item", Price = 50000, IsStock = true },
                new Product { Id = 103, Name = "Fridge", Description = "Electronics Item", Price = 65000, IsStock = true }
            };
        }

        public void AddProduct()
        {
            Product product = new Product();

            Console.Write("Enter product ID: ");
            while (!int.TryParse(Console.ReadLine(), out product.Id))
                Console.Write("Invalid ID. Enter again: ");

            Console.Write("Enter product Name: ");
            product.Name = Console.ReadLine();

            Console.Write("Enter product Description: ");
            product.Description = Console.ReadLine();

            Console.Write("Enter product Price: ");
            while (!double.TryParse(Console.ReadLine(), out product.Price))
                Console.Write("Invalid price. Enter again: ");

            Console.Write("Is product in stock? (true/false): ");
            while (!bool.TryParse(Console.ReadLine(), out product.IsStock))
                Console.Write("Enter true or false: ");

            products.Add(product);
            Console.WriteLine(" Product added successfully");
        }

        public bool DeleteProducts(int id)
        {
            var product = products.FirstOrDefault(p => p.Id == id);

            if (product == null)
                return false;

            products.Remove(product);
            return true;
        }

        public void DisplayProducts()
        {
            foreach (var product in products)
            {
                Console.WriteLine($"ID: {product.Id}");
                Console.WriteLine($"Name: {product.Name}");
                Console.WriteLine($"Description: {product.Description}");
                Console.WriteLine($"Price: {product.Price}");
                Console.WriteLine($"In Stock: {product.IsStock}");
                Console.WriteLine("-----------------------");
            }
        }
    }

    class TestProgram
    {
        static void Main(string[] args)
        {
            ProductCatalog catalog = new ProductCatalog();
            int choice;

            do
            {
                Console.WriteLine("\n1. Add Product");
                Console.WriteLine("2. Display Products");
                Console.WriteLine("3. Delete Product");
                Console.WriteLine("0. Exit");
                Console.Write("Enter your choice: ");

                if (!int.TryParse(Console.ReadLine(), out choice))
                {
                    Console.WriteLine("Invalid input");
                    continue;
                }

                switch (choice)
                {
                    case 1:
                        catalog.AddProduct();
                        break;

                    case 2:
                        catalog.DisplayProducts();
                        break;

                    case 3:
                        Console.Write("Enter product ID to delete: ");
                        if (int.TryParse(Console.ReadLine(), out int id))
                        {
                            if (catalog.DeleteProducts(id))
                                Console.WriteLine(" Product deleted");
                            else
                                Console.WriteLine(" Product not found");
                        }
                        break;

                    case 0:
                        Console.WriteLine("Exiting...");
                        break;

                    default:
                        Console.WriteLine("Invalid choice");
                        break;
                }

            } while (choice != 0);
        }
    }
}