using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Taking input from user
        Console.Write("Enter Electronics customers: ");
        string electronicsInput = Console.ReadLine();

        Console.Write("Enter Clothing customers: ");
        string clothingInput = Console.ReadLine();

        Console.Write("Enter Books customers: ");
        string booksInput = Console.ReadLine();

        // Convert input strings into HashSets
        HashSet<string> electronics = new HashSet<string>(
            electronicsInput.Split(',')
        );

        HashSet<string> clothing = new HashSet<string>(
            clothingInput.Split(',')
        );

        HashSet<string> books = new HashSet<string>(
            booksInput.Split(',')
        );

        Console.WriteLine("\n--- Customer Preference Analysis ---\n");

        // 1. Union -> Customers in ANY category
        HashSet<string> anyCategory = new HashSet<string>(electronics);
        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        Console.WriteLine("1. Customers in ANY category (Union):");
        Console.WriteLine(string.Join(", ", anyCategory.OrderBy(x => x)));
        Console.WriteLine("Total: " + anyCategory.Count + " customers\n");

        // 2. Intersection -> Customers in ALL categories
        HashSet<string> allCategories = new HashSet<string>(electronics);
        allCategories.IntersectWith(clothing);
        allCategories.IntersectWith(books);

        Console.WriteLine("2. Customers in ALL categories (Intersection):");
        Console.WriteLine(string.Join(", ", allCategories.OrderBy(x => x)));
        Console.WriteLine("Total: " + allCategories.Count + " customer(s)\n");

        // 3. Customers ONLY in Electronics
        HashSet<string> onlyElectronics = new HashSet<string>(electronics);
        onlyElectronics.ExceptWith(clothing);
        onlyElectronics.ExceptWith(books);

        Console.WriteLine("3. Customers ONLY in Electronics (Difference):");
        Console.WriteLine(string.Join(", ", onlyElectronics.OrderBy(x => x)));
        Console.WriteLine("Total: " + onlyElectronics.Count + " customer(s)\n");

        // 4. Electronics AND Books but NOT Clothing
        HashSet<string> electronicsAndBooks = new HashSet<string>(electronics);
        electronicsAndBooks.IntersectWith(books);
        electronicsAndBooks.ExceptWith(clothing);

        Console.WriteLine("4. Customers in Electronics AND Books but NOT Clothing:");
        Console.WriteLine(string.Join(", ", electronicsAndBooks.OrderBy(x => x)));
        Console.WriteLine("Total: " + electronicsAndBooks.Count + " customer(s)");
    }
}
