using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input number of sales records
        int n = int.Parse(Console.ReadLine());

        // Dictionary:
        // Product -> (Region -> Sales)
        Dictionary<string, Dictionary<string, int>> salesData =
            new Dictionary<string, Dictionary<string, int>>();

        // Store best selling products by region
        Dictionary<string, (string product, int sales)> bestRegionSales =
            new Dictionary<string, (string, int)>();

        // Read sales records
        for (int i = 0; i < n; i++)
        {
            string[] input = Console.ReadLine().Split(' ');

            string product = input[0];
            string region = input[1];
            int sales = int.Parse(input[2]);

            // Add product if not exists
            if (!salesData.ContainsKey(product))
            {
                salesData[product] =
                    new Dictionary<string, int>();
            }

            // Store region sales
            salesData[product][region] = sales;

            // Track best-selling product by region
            if (!bestRegionSales.ContainsKey(region) ||
                sales > bestRegionSales[region].sales)
            {
                bestRegionSales[region] = (product, sales);
            }
        }

        // Input threshold
        Console.Write("\nEnter threshold: ");
        int threshold = int.Parse(Console.ReadLine());

        Console.WriteLine("\n--- Sales Report by Product and Region ---\n");

        // Store underperforming products
        List<string> underperforming =
            new List<string>();

        // Process each product
        foreach (var productEntry in salesData)
        {
            string product = productEntry.Key;
            Dictionary<string, int> regions =
                productEntry.Value;

            Console.WriteLine("Product " + product + ":\n");

            int total = 0;

            foreach (var regionEntry in regions)
            {
                Console.WriteLine(
                    "  " + regionEntry.Key +
                    ": $" + regionEntry.Value
                );

                total += regionEntry.Value;
            }

            double average =
                (double)total / regions.Count;

            Console.WriteLine(
                "\n  Total: $" + total +
                ", Average: $" +
                average.ToString("0.00")
            );

            Console.WriteLine();

            // Check underperforming
            if (average < threshold)
            {
                underperforming.Add(
                    product + " ($" +
                    average.ToString("0.00") + ")"
                );
            }
        }

        // Best-selling product by region
        Console.WriteLine(
            "Best Selling Product by Region:\n"
        );

        foreach (var item in bestRegionSales)
        {
            Console.WriteLine(
                item.Key + ": " +
                item.Value.product +
                " ($" + item.Value.sales + ")"
            );
        }

        // Underperforming products
        Console.WriteLine(
            "\nUnderperforming Products (< $" +
            threshold + " average):\n"
        );

        foreach (string product in underperforming)
        {
            Console.WriteLine(product);
        }
    }
}
