using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input array
        Console.WriteLine("Enter access log numbers separated by commas:");
        string input = Console.ReadLine();

        // Input K value
        Console.Write("Enter value of K: ");
        int k = int.Parse(Console.ReadLine());

        // Convert input string into integer array
        int[] arr = input.Split(',')
                         .Select(int.Parse)
                         .ToArray();

        Console.WriteLine("\n--- Access Pattern Analysis ---\n");

        HashSet<int> set = new HashSet<int>(arr);

        int longestLength = 0;
        List<int> longestSequence = new List<int>();

        foreach (int num in set)
        {
            // Check starting point
            if (!set.Contains(num - 1))
            {
                int current = num;
                List<int> temp = new List<int>();

                while (set.Contains(current))
                {
                    temp.Add(current);
                    current++;
                }

                if (temp.Count > longestLength)
                {
                    longestLength = temp.Count;
                    longestSequence = temp;
                }
            }
        }

        Console.WriteLine("Longest Consecutive Sequence: " +
            string.Join(",", longestSequence) +
            " (Length: " + longestLength + ")");

        

        Dictionary<int, int> frequency = new Dictionary<int, int>();

        foreach (int num in arr)
        {
            if (frequency.ContainsKey(num))
                frequency[num]++;
            else
                frequency[num] = 1;
        }

        int mostFrequent = frequency
                            .OrderByDescending(x => x.Value)
                            .First().Key;

        int maxCount = frequency[mostFrequent];

        Console.WriteLine("\nMost Frequent Element: " +
            mostFrequent +
            " (appears " + maxCount + " times)");

        

        int firstNonRepeating = -1;

        foreach (int num in arr)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        Console.WriteLine("\nFirst Non-Repeating Element: " +
            firstNonRepeating);


        Console.WriteLine("\nPairs with Difference " + k + ":");

        List<string> pairs = new List<string>();

        HashSet<int> unique = new HashSet<int>(arr);

        foreach (int num in unique)
        {
            if (unique.Contains(num + k))
            {
                pairs.Add("(" + num + ", " + (num + k) + ")");
            }
        }

        Console.WriteLine(string.Join(", ", pairs));


        int n = arr.Length;

        int majorityElement = mostFrequent;
        double percentage =
            ((double)maxCount / n) * 100;

        if (maxCount > n / 2)
        {
            Console.WriteLine("\nMajority Element: " +
                majorityElement +
                " (appears " + maxCount +
                " out of " + n +
                " times - " +
                percentage.ToString("0.0") +
                "%)");
        }
        else
        {
            Console.WriteLine("\nMajority Element: " +
                majorityElement +
                " (appears " + maxCount +
                " out of " + n +
                " times - " +
                percentage.ToString("0.0") +
                "% - No majority)");
        }
    }
}
