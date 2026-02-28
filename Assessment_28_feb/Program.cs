using System;

namespace StudentEligibilitySystem
{
    // 2.1 Entity Class
    class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public int Marks { get; set; }
        public int Age { get; set; }
        public int Attendance { get; set; }
    }

    class EligibilityEngine
    {
        
        public void CheckEligibility(Student student, string program, Predicate<Student> rule)
        {
            bool isEligible = rule(student);

            Console.WriteLine("========= ELIGIBILITY CHECK =========");
            Console.WriteLine($"Student Name : {student.Name}");
            Console.WriteLine($"Program      : {program}");
            Console.WriteLine($"Eligible     : {isEligible}");
            Console.WriteLine("-----------------------------------\n");
        }
    }

    class Program
    {
        static void Main()
        {
            
            Student student = new Student
            {
                StudentId = 301,
                Name = "Ananya",
                Marks = 78,
                Age = 18,
                Attendance = 85
            };

            

            Predicate<Student> engineeringEligibility =
                s => s.Marks >= 60;

            Predicate<Student> medicalEligibility =
                s => s.Marks >= 70 && s.Age >= 17;

            Predicate<Student> managementEligibility =
                s => s.Marks >= 55 && s.Attendance >= 75;

            
            EligibilityEngine engine = new EligibilityEngine();

           
            engine.CheckEligibility(student, "Engineering", engineeringEligibility);
            engine.CheckEligibility(student, "Medical", medicalEligibility);
            engine.CheckEligibility(student, "Management", managementEligibility);
        }
    }
}