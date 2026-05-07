using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        // Input paragraph
        Console.WriteLine("Enter paragraph:");
        string text = Console.ReadLine();

        // Input N value
        Console.Write("Enter value of N: ");
        int n = int.Parse(Console.ReadLine());

        // Convert text to lowercase
        text = text.ToLower();

        // Remove punctuation marks
        text = Regex.Replace(text, @"[^\w\s]", "");

        // Split text into words
        string[] words = text.Split(
            new char[] { ' ' },
            StringSplitOptions.RemoveEmptyEntries
        );

        // Dictionary to store word frequencies
        Dictionary<string, int> frequency = new Dictionary<string, int>();

        // Count frequency of each word
        foreach (string word in words)
        {
            if (frequency.ContainsKey(word))
            {
                frequency[word]++;
            }
            else
            {
                frequency[word] = 1;
            }
        }

        // Total number of words
        int totalWords = words.Length;

        // Total unique words
        int uniqueWords = frequency.Count;

        // Top N frequent words
        var topWords = frequency
            .OrderByDescending(x => x.Value)
            .ThenBy(x => x.Key)
            .Take(n);

        // Words appearing exactly once
        var singleWords = frequency
            .Where(x => x.Value == 1)
            .Select(x => x.Key)
            .OrderBy(x => x);

        // Average frequency
        double averageFrequency =
            (double)totalWords / uniqueWords;

        // Output
        Console.WriteLine("\n--- Word Frequency Analysis ---\n");

        Console.WriteLine("Total words: " + totalWords);
        Console.WriteLine("Unique words: " + uniqueWords);

        Console.WriteLine("\nTop " + n + " Frequent Words:\n");

        foreach (var item in topWords)
        {
            Console.WriteLine(item.Key + ": " + item.Value + " times");
        }

        Console.WriteLine("\nWords appearing exactly once:\n");

        Console.WriteLine(string.Join(", ", singleWords));

        Console.WriteLine("\nAverage frequency: " +
            averageFrequency.ToString("0.00") +
            " times per unique word");
    }
}
