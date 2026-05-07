using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<int, int> inventory = new Dictionary<int, int>();

        bool firstDisplay = true;

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string operation = parts[0];

            switch (operation)
            {
                case "ADD":
                    {
                        int productId = int.Parse(parts[1]);
                        int quantity = int.Parse(parts[2]);

                        if (inventory.ContainsKey(productId))
                            inventory[productId] += quantity;
                        else
                            inventory[productId] = quantity;

                        break;
                    }

                case "REMOVE":
                    {
                        int productId = int.Parse(parts[1]);
                        int quantity = int.Parse(parts[2]);

                        if (inventory.ContainsKey(productId))
                        {
                            if (inventory[productId] >= quantity)
                            {
                                inventory[productId] -= quantity;
                            }
                            else
                            {
                                Console.WriteLine($"Cannot remove {quantity} units from Product {productId}");
                            }
                        }
                        else
                        {
                            Console.WriteLine($"Product {productId} not found");
                        }

                        break;
                    }

                case "CHECK":
                    {
                        int productId = int.Parse(parts[1]);

                        if (inventory.ContainsKey(productId))
                        {
                            Console.WriteLine($"Product {productId}: {inventory[productId]} units");
                        }
                        else
                        {
                            Console.WriteLine($"Product {productId}: 0 units");
                        }

                        break;
                    }

                case "BULK":
                    {
                        string bulkData = input.Substring(5);

                        string[] items = bulkData.Split(',');

                        foreach (string item in items)
                        {
                            string[] data = item.Split(':');

                            int productId = int.Parse(data[0]);
                            int quantity = int.Parse(data[1]);

                            if (inventory.ContainsKey(productId))
                                inventory[productId] += quantity;
                            else
                                inventory[productId] = quantity;
                        }

                        break;
                    }

                case "DISPLAY":
                    {
                        if (firstDisplay)
                        {
                            Console.WriteLine("--- Current Inventory ---");
                            firstDisplay = false;
                        }
                        else
                        {
                            Console.WriteLine("--- Updated Inventory ---");
                        }

                        foreach (var item in inventory)
                        {
                            if (item.Value > 0)
                            {
                                Console.WriteLine($"{item.Key}: {item.Value} units");
                            }
                        }

                        break;
                    }
            }
        }
    }
}