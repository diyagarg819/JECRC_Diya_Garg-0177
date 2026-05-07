using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void SortPrices(int[] productPrices)
    {
        int totalPrices = productPrices.Length;

        for (int i = 0; i < totalPrices - 1; i++)
        {
            for (int j = 0; j < totalPrices - i - 1; j++)
            {
                if (productPrices[j] > productPrices[j + 1])
                {
                    int temporaryValue = productPrices[j];
                    productPrices[j] = productPrices[j + 1];
                    productPrices[j + 1] = temporaryValue;
                }
            }
        }
    }

    static int SearchPrice(int[] sortedPrices, int targetPrice)
    {
        int leftIndex = 0;
        int rightIndex = sortedPrices.Length - 1;

        while (leftIndex <= rightIndex)
        {
            int middleIndex = (leftIndex + rightIndex) / 2;

            if (sortedPrices[middleIndex] == targetPrice)
            {
                return middleIndex;
            }
            else if (sortedPrices[middleIndex] < targetPrice)
            {
                leftIndex = middleIndex + 1;
            }
            else
            {
                rightIndex = middleIndex - 1;
            }
        }

        return -1;
    }

    static void Main()
    {
        Console.WriteLine("Enter product prices separated by commas:");

        string inputPrices = Console.ReadLine();

        Console.Write("Enter target sum: ");

        int targetSum = int.Parse(Console.ReadLine());

        int[] originalPrices = inputPrices
            .Split(',')
            .Select(int.Parse)
            .ToArray();

        Console.WriteLine("\n--- Product Price Analysis ---\n");

        Console.WriteLine("Original Prices: " +
            string.Join(", ", originalPrices));

        int[] sortedPrices = new int[originalPrices.Length];

        Array.Copy(originalPrices, sortedPrices, originalPrices.Length);

        SortPrices(sortedPrices);

        Console.WriteLine("\nSorted Prices (Ascending): " +
            string.Join(", ", sortedPrices));

        Console.WriteLine("\nBinary Search Results:\n");

        int firstSearchPrice = 399;

        int firstSearchResult =
            SearchPrice(sortedPrices, firstSearchPrice);

        if (firstSearchResult != -1)
        {
            Console.WriteLine(
                "Price " + firstSearchPrice +
                " found at index " +
                firstSearchResult
            );
        }
        else
        {
            Console.WriteLine(
                "Price " + firstSearchPrice +
                " not found"
            );
        }

        int secondSearchPrice = 500;

        int secondSearchResult =
            SearchPrice(sortedPrices, secondSearchPrice);

        if (secondSearchResult != -1)
        {
            Console.WriteLine(
                "Price " + secondSearchPrice +
                " found at index " +
                secondSearchResult
            );
        }
        else
        {
            Console.WriteLine(
                "Price " + secondSearchPrice +
                " not found"
            );
        }

        Console.WriteLine(
            "\nPairs that sum to " +
            targetSum + ":\n"
        );

        HashSet<int> checkedPrices =
            new HashSet<int>();

        HashSet<string> displayedPairs =
            new HashSet<string>();

        foreach (int currentPrice in sortedPrices)
        {
            int remainingValue =
                targetSum - currentPrice;

            if (checkedPrices.Contains(remainingValue))
            {
                int smallerPrice =
                    Math.Min(currentPrice, remainingValue);

                int largerPrice =
                    Math.Max(currentPrice, remainingValue);

                string pairResult =
                    "(" + smallerPrice +
                    ", " + largerPrice + ")";

                if (!displayedPairs.Contains(pairResult))
                {
                    Console.WriteLine(pairResult);

                    displayedPairs.Add(pairResult);
                }
            }

            checkedPrices.Add(currentPrice);
        }

        List<int> increasingSequence =
            new List<int>();

        foreach (int currentPrice in sortedPrices)
        {
            if (
                increasingSequence.Count == 0 ||
                currentPrice >
                increasingSequence[increasingSequence.Count - 1]
            )
            {
                increasingSequence.Add(currentPrice);
            }
        }

        Console.WriteLine(
            "\nLongest Increasing Subsequence:\n"
        );

        Console.WriteLine(
            string.Join(", ", increasingSequence) +
            " (Length: " +
            increasingSequence.Count + ")"
        );

        int lowestPrice = sortedPrices.Min();

        int highestPrice = sortedPrices.Max();

        double averagePrice =
            sortedPrices.Average();

        double medianPrice;

        int totalElements =
            sortedPrices.Length;

        if (totalElements % 2 == 0)
        {
            medianPrice =
                (
                    sortedPrices[totalElements / 2 - 1] +
                    sortedPrices[totalElements / 2]
                ) / 2.0;
        }
        else
        {
            medianPrice =
                sortedPrices[totalElements / 2];
        }

        Console.WriteLine("\nStatistics:\n");

        Console.WriteLine(
            "Lowest Price: " + lowestPrice
        );

        Console.WriteLine(
            "Highest Price: " + highestPrice
        );

        Console.WriteLine(
            "Average Price: " +
            averagePrice.ToString("0.00")
        );

        Console.WriteLine(
            "Median Price: " +
            medianPrice.ToString("0.00")
        );
    }
}
