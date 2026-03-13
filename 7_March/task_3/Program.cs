using System;
using System.Collections.Generic;
using System.Linq;

public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
}

public class InventoryEngine
{
    private List<Product> products;

    public InventoryEngine(List<Product> products)
    {
        this.products = products;
    }

    public IEnumerable<Product> GetLowStockProducts()
    {
        return products.Where(p => p.Quantity < 10);
    }

    public IEnumerable<Product> GetProductsSortedByPrice()
    {
        return products.OrderBy(p => p.Price);
    }

    public int GetTotalInventoryValue()
    {
        return (int)products.Sum(p => p.Price * p.Quantity);
    }
}

public class Solution
{
    public static void Main(string[] args)
    {
        List<Product> products = new List<Product>
        {
            new Product { ProductId = 201, Name = "Laptop", Price = 60000, Quantity = 5 },
            new Product { ProductId = 202, Name = "Mouse", Price = 800, Quantity = 25 },
            new Product { ProductId = 203, Name = "Keyboard", Price = 1500, Quantity = 8 },
            new Product { ProductId = 204, Name = "Monitor", Price = 12000, Quantity = 12 }
        };

        InventoryEngine engine = new InventoryEngine(products);

        Console.WriteLine(" Low Stock Products:");
        engine.GetLowStockProducts()
              .Select(p => p.Name)
              .ToList()
              .ForEach(Console.WriteLine);

        Console.WriteLine();

        Console.WriteLine("Products Sorted by Price:");
        engine.GetProductsSortedByPrice()
              .Select(p => p.Name + " - " + p.Price)
              .ToList()
              .ForEach(Console.WriteLine);

        Console.WriteLine();

        Console.WriteLine("Total Inventory Value:");
        Console.WriteLine("Rs " + engine.GetTotalInventoryValue());
    }
}