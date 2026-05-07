using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Input number of students
        int n = int.Parse(Console.ReadLine());

        // Dictionary to store student name and grades
        Dictionary<string, int[]> students =
            new Dictionary<string, int[]>();

        // HashSet to store unique grades
        HashSet<int> uniqueGrades =
            new HashSet<int>();

        // Read student data
        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string name = parts[0];

            int[] grades = new int[4];

            for (int j = 0; j < 4; j++)
            {
                grades[j] = int.Parse(parts[j + 1]);

                // Add grades into HashSet
                uniqueGrades.Add(grades[j]);
            }

            students[name] = grades;
        }

        Console.WriteLine("\n--- Student Grade Report ---\n");

        // Variables for top performer
        string topStudent = "";
        double highestAverage = 0;

        // List for students with all grades >= 80
        List<string> eligibleStudents =
            new List<string>();

        // Process each student
        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            double average = grades.Average();
            int highest = grades.Max();
            int lowest = grades.Min();

            Console.WriteLine(
                name +
                ": Average = " +
                average.ToString("0.00") +
                ", Highest = " +
                highest +
                ", Lowest = " +
                lowest
            );

            // Check top performer
            if (average > highestAverage)
            {
                highestAverage = average;
                topStudent = name;
            }

            // Check if all grades >= 80
            bool allAbove80 = true;

            foreach (int grade in grades)
            {
                if (grade < 80)
                {
                    allAbove80 = false;
                    break;
                }
            }

            if (allAbove80)
            {
                eligibleStudents.Add(
                    name + " (" +
                    string.Join(",", grades) + ")"
                );
            }
        }

        // Display top performer
        Console.WriteLine(
            "\nTop Performer: " +
            topStudent +
            " (Average: " +
            highestAverage.ToString("0.00") + ")"
        );

        // Display students with all grades >= 80
        Console.WriteLine(
            "\nStudents with all grades >= 80:\n"
        );

        foreach (string student in eligibleStudents)
        {
            Console.WriteLine(student);
        }

        // Display unique grades
        Console.WriteLine(
            "\nUnique Grade Values Across All Students:\n"
        );

        Console.WriteLine(
            string.Join(",",
            uniqueGrades.OrderBy(x => x))
        );

        Console.WriteLine(
            "\nTotal unique grades: " +
            uniqueGrades.Count
        );
    }
}