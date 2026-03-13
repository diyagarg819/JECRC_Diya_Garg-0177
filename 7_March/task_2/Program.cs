using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
}

// 3. Analysis Engine (Core Component)
public class AnalysisEngine
{
    public void DisplayPassedStudents(List<Student> students)
    {
        Console.WriteLine("Passed Students:");
        
        // LINQ: Filter by Marks >= 50, grab the Name, and print line-by-line
        students.Where(s => s.Marks >= 50)
                .Select(s => s.Name)
                .ToList()
                .ForEach(Console.WriteLine);
                
        Console.WriteLine(); // Blank line to match expected output format
    }

    public void DisplayTopper(List<Student> students)
    {
        Console.WriteLine("Topper:");
        
        // LINQ: Sort descending and grab the very first item (highest marks)
        var topper = students.OrderByDescending(s => s.Marks).First();
        
        Console.WriteLine($"{topper.Name} - {topper.Marks}");
        Console.WriteLine();
    }

    public void DisplaySortedStudents(List<Student> students)
    {
        Console.WriteLine("Students Sorted by Marks:");
        
        // LINQ: Sort descending by marks, format the string, and print line-by-line
        students.OrderByDescending(s => s.Marks)
                .Select(s => $"{s.Name} - {s.Marks}")
                .ToList()
                .ForEach(Console.WriteLine);
    }
}

public class Solution
{
    public static void Main()
    {        List<Student> students = new List<Student>
        {
            new Student { StudentId = 101, Name = "Ananya", Marks = 78 },
            new Student { StudentId = 102, Name = "Ravi", Marks = 45 },
            new Student { StudentId = 103, Name = "Neha", Marks = 88 },
            new Student { StudentId = 104, Name = "Arjun", Marks = 67 }
        };

        AnalysisEngine engine = new AnalysisEngine();

        engine.DisplayPassedStudents(students);
        engine.DisplayTopper(students);
        engine.DisplaySortedStudents(students);
        Console.WriteLine();
    }
}