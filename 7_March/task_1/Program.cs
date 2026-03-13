using System;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
    public int Age { get; set; }
    public int Attendance { get; set; }
}

// Core Component: Must not contain hardcoded rules
public class EligibilityEngine
{
    public void CheckEligibility(Student student, string program, Predicate<Student> rule)
    {
        // Invoke the predicate
        bool isEligible = rule(student);

        // Display output matching the expected format
        Console.WriteLine("========= ELIGIBILITY CHECK =========");
        Console.WriteLine($"Student Name : {student.Name}");
        Console.WriteLine($"Program      : {program}");
        Console.WriteLine($"Eligible     : {isEligible}");
        Console.WriteLine("-----------------------------------");
        Console.WriteLine(); 
    }
}

public class Solution
{
    public static void Main()
    {
        // STEP 1: Create student object (hardcoded dataset)
        Student student = new Student
        {
            StudentId = 301,
            Name = "Ananya",
            Marks = 78,
            Age = 18,
            Attendance = 85
        };

        // STEP 2: Define eligibility predicates
        Predicate<Student> engineeringRule = s => s.Marks >= 60;
        Predicate<Student> medicalRule = s => s.Marks >= 70 && s.Age >= 17;
        Predicate<Student> managementRule = s => s.Marks >= 55 && s.Attendance >= 75;

        // STEP 3: Create eligibility engine
        EligibilityEngine engine = new EligibilityEngine();

        // STEP 4: Validate eligibility for each program
        engine.CheckEligibility(student, "Engineering", engineeringRule);
        engine.CheckEligibility(student, "Medical", medicalRule);
        engine.CheckEligibility(student, "Management", managementRule);
    }
}