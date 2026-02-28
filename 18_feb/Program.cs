
// Write a C# Sharp program to display ArithmaticOperation
//without construtor

/*namespace ConsoleApp
{
    class arithmetic_operations
    {
        public void Addition(int a , int b)
        {
            Console.WriteLine("Sum is : {0}" ,a + b);
        }
        public void Subtraction(int a , int b)
        {
            Console.WriteLine("Sub is : {0}" ,a - b);
        }
        public void Multiplication(int a , int b)
        {
            Console.WriteLine("Sum is : {0}" ,a * b);
        }
        public void Division(int a , int b)
        {
            if (b != 0)
                Console.WriteLine("Sum is : {0}" ,a / b);
            else
                Console.WriteLine("Division by zero is  not allowed");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter 1 number : ");
            int input1 = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter 2 number : ");
            int input2 = int.Parse(Console.ReadLine());

            arithmetic_operations ao = new arithmetic_operations();
            ao.Addition(input1,input2);
            ao.Subtraction(input1,input2);
            ao.Multiplication(input1,input2);
            ao.Division(input1,input2);
        }
    }
}*/

//with constructor
// using System;

// class ODLExercise
// {
//     int num1;
//     int num2;

//     // Constructor to take input
//     public ODLExercise()
//     {
//         Console.Write("Enter first number: ");
//         num1 = Convert.ToInt32(Console.ReadLine());

//         Console.Write("Enter second number: ");
//         num2 = Convert.ToInt32(Console.ReadLine());
//     }

//     public void Addition()
//     {
//         int sum = num1 + num2;
//         Console.WriteLine("The sum of {0} and {1} is: {2}", num1, num2, sum);
//     }

//     public void Subtraction()
//     {
//         int difference = num1 - num2;
//         Console.WriteLine("The difference between {0} and {1} is: {2}", num1, num2, difference);
//     }

//     public void Multiplication()
//     {
//         int product = num1 * num2;
//         Console.WriteLine("The product of {0} and {1} is: {2}", num1, num2, product);
//     }

//     public void Division()
//     {
//         if (num2 != 0)
//         {
//             double quotient = (double)num1 / num2;
//             Console.WriteLine("The quotient of {0} divided by {1} is: {2}", num1, num2, quotient);
//         }
//         else
//         {
//             Console.WriteLine("Division by zero is not allowed.");
//         }
//     }
// }
// class Demo
// {
//     public static void Main()
//     {
//         ODLExercise exercise = new ODLExercise();

//         exercise.Addition();
//         exercise.Subtraction();
//         exercise.Multiplication();
//         exercise.Division();

//         Console.ReadLine(); // keeps console open
//     }
// }



// Write a C# Sharp program to use Static Constructor and display Random number


// using System;
// class ODLExercise
// {
//     private static int number;
//     public static int Number { get {
//         return number; }}

//     static ODLExercise() {
//         Random r = new Random();
//         number = r.Next();
//     }
// }

// class Program
// {
//     static void Main(string[] args)
//     {
//         Console.WriteLine("Static Number = " + ODLExercise.Number);
//     }
// }


//Parametrized Constructor 

/*using System;

class OdlExercise
{
    private int number;
    public int Number
    {
        get { return number;}
    }

    public OdlExercise()
    {
        Random r = new Random();
        number = r.Next();
    }

    public OdlExercise(int seed)
    {
        Random r = new Random();
        number = r.Next();
    }
}
class Program
{
    static void Main(string[] args)
    {
        OdlExercise num = new  OdlExercise();
        Console.WriteLine("Static number = " + num.Number);
        OdlExercise num1 = new  OdlExercise(500);
        Console.WriteLine("Static number = " + num1.Number);
    }
}*/


// Intialising Product using constructor
/*using System;
using System.Security.Cryptography;

namespace ConsoleApp
{
    class Product
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public bool Iso_standard { get; set; }
        public DateTime Expiry_Date { get; set; }

       public Product(string Name,int Id ,int Quantity , double Price , bool Iso_standard , DateTime Expiry_Date)
        {
            this.Name = Name;
            this.Id = Id;
            this.Quantity = Quantity;
            this.Price = Price;
            this.Iso_standard=Iso_standard;
            this.Expiry_Date = Expiry_Date;
        }

        public void GetProductDetails()
        {
            Console.WriteLine("Enter Product Name:");
            Name = Console.ReadLine();

            Console.WriteLine("Enter Product Id:");
            Id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Quantity:");
            Quantity = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Price:");
            Price = double.Parse(Console.ReadLine());

            Console.WriteLine("Enter Iso-Standard (true/false):");
            Iso_standard = bool.Parse(Console.ReadLine());

            Console.WriteLine("Enter Expiry Date (yyyy-MM-dd):");
            Expiry_Date = DateTime.ParseExact(
                Console.ReadLine(),
                "yyyy-MM-dd",
                null
            );
        }
        public void DisplayProductDetails()
        {
            Console.WriteLine($"Product Name : {Name}");
            Console.WriteLine($"Product Id : {Id}");
            Console.WriteLine($"Quantity : {Quantity}");
            Console.WriteLine($"Price : {Price}");
            Console.WriteLine($"Iso Standard : {Iso_standard}");
            Console.WriteLine($"Expiry Date : {Expiry_Date:yyyy-MM-dd}");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Product pd = new Product("Cup",5,3,30,true,new DateTime(2003, 6, 12));
            
            //pd.GetProductDetails();
            pd.DisplayProductDetails();
            Console.ReadLine();
        }
    }
}*/


//overloaded constructor
/*using System;

class ODLExercise
{
    private int number;

    public int Number {get {return 
    number; }
}

public ODLExercise ()
{
    Random r = new Random();

    number = r.Next();
}

public ODLExercise (int seed)
{
    Random r = new Random(seed);

    number = r.Next();
}


class Program
{
    static void Main(string[] args)
    {
        ODLExercise num = new ODLExercise();
        Console.WriteLine("static number: "+ num.Number);
        ODLExercise num1 = new ODLExercise(500);
        Console.WriteLine("static speed: " + num1.Number);
    }
}
}*/



//Using C#'s access modifiers



/*using System;
using System.Runtime.Serialization;
using AccessModifierDemo;
namespace AccessModifierDemo
{
    class UsingAccessModifier
    {
        public void PublicMethod()
        {
            Console.WriteLine("It is a public method.");
        }
        private void PrivateMethod()
        {
            Console.WriteLine("It is a private method.");
        }
        protected void ProtectedMethod()
        {
            Console.WriteLine("It is a protected method.");
        }
        internal void InternalMethod()
        {
            Console.WriteLine("It is a internal method.");
        }
        protected internal void ProtectedInternalMethod()
        {
            Console.WriteLine("It is a protected internral method.");
        }

        void SomeMethod()
        {
            Console.WriteLine("Some method");
        }
    }
    class Program
    {        static void Main(string[] args)
        {
            UsingAccessModifier obj = new UsingAccessModifier();
            obj.PublicMethod();
            obj.InternalMethod();
            obj.ProtectedInternalMethod();
        }
    }   
}*/



//Single Inheritance, Multi Level Inheritance, Multiple Inheritance with interface, Hybrid Inheritance


/*using System;
using System.Text.RegularExpressions;
namespace InheritanceDemo
{
    public class Person
    {
        private string  name;
        private int  age;
        public void GetInformation()
        {
            Console.WriteLine("Enter your name: ");
            name = Console.ReadLine();
            Console.WriteLine("Enter your age:");
            age = int.Parse(Console.ReadLine());
        }

        public void DisplayInformation()
        {
            Console.WriteLine("Welcome to Training Mr./Mrs. {0} and  your age is {1}",name,age);
        }
    }
    public class Employee : Person
    {
        public string  Company_name;
        private int Employee_Id;
        private int Employee_Score;

        public int GetEmployeeData()
        {
            Console.WriteLine("Enter your company name :");
            Company_name = Console.ReadLine();
            Console.WriteLine("Enter your id :");
            Employee_Id = int.Parse(Console.ReadLine());
            Console.WriteLine("Enter your score :");
            Employee_Score = int.Parse(Console.ReadLine());
            return Employee_Score;
        }
        public void DisplayEmployeeInformation()
        {
            Console.WriteLine("Welcome to this company {0} , and your id  is {1} , and your score is {2}",Company_name,Employee_Id,Employee_Score);
        }
    }

    interface IDepartment
    {
        string  DepartmentName{get;set;}
        void DispalyDepartmentDetails();
    }
    public class GradeLevel : Employee , IDepartment
    {

        public string DepartmentName
        {
            get => throw new NotImplementedException();
            set => throw new NotImplementedException();
        }
        public void CheckEligibility()
        {
            Console.WriteLine("Every employee should have above 150");
            if (this.GetEmployeeData() > 150)
            {
                Console.WriteLine("You are Eligible");
            }
            else
            {
                Console.WriteLine("You are not  eligible");
            }
        }
        public void DispalyDepartmentDetails()
        {
            Console.WriteLine("Department Name : ",DepartmentName);
        }
    }
    public class TestProgram
    {
        static void  Main(String[] args)
        {
            GradeLevel emp = new  GradeLevel();
            emp.GetInformation();
            emp.DisplayInformation();
            emp.GetEmployeeData();
            emp.DisplayEmployeeInformation();
            emp.DepartmentName = "IT";
            emp.CheckEligibility();
            emp.DispalyDepartmentDetails();
            Console.ReadLine();
        }
    }
}*/



//Polymorphism-overloading

/*using System;

namespace Polymorphism
{
    class Car
    {
        public string Name ;
        public int NumberOfDoors ;

        public Car()
        {
            Name = "No name";
            NumberOfDoors = 4;
            
        }
        public Car(string name , int numberOfDoors)
        {
            Name = name;
            NumberOfDoors = numberOfDoors;
        }
        public Car(string name)
        {
            Name = name;
            NumberOfDoors = 0;
        }
        public Car(int numberOfDoors)
        {
            Name = "No name";
            NumberOfDoors = numberOfDoors;
        }

    }

    class Program
    {
        static void Main(string[] args)
        {
            Car c1 = new Car();
            Car c2 = new Car(3);
            Car c3 = new Car("My name");
            Car c4 = new Car("My name",4);
            Console.WriteLine(c1.NumberOfDoors);
            Console.WriteLine(c1.Name);

        }
    }
}*/



// overriding

/*using System;

namespace Virtualisation
{
    class GroupAgent
    {
        public virtual void show()
        {
            Console.WriteLine("Group Agent Created !!!");
        }
    }
    class Agent : GroupAgent
    {
        public override void show()
        {
            Console.WriteLine("Agent Created !!!!");
        }
    }
    class Program
    {
        static void  Main(string[] args)
        {
            GroupAgent a1 = new GroupAgent();
            a1.show();
            Agent b1 = new Agent();
            b1.show();
            GroupAgent a2 = new  Agent();
            a2.show();
        }
    }
}*/



//over-hiding
/*using System;

namespace Virtualisation
{
    class GroupAgent
    {
        public void show()
        {
            Console.WriteLine("Group Agent Created !!!");
        }
    }
    class Agent : GroupAgent
    {
        public new void show()
        {
            Console.WriteLine("Agent Created !!!!");
        }
    }
    class Program
    {
        static void  Main(string[] args)
        {
            GroupAgent a1 = new GroupAgent();
            a1.show();
            Agent b1 = new Agent();
            b1.show();
            GroupAgent a2 = new  Agent();
            a2.show();
        }
    }
}*/



/*using System;

namespace Virtualisation
{
    class GroupAgent
    {
        public virtual void show()
        {
            Console.WriteLine("Group Agent Created !!!");
        }
    }
    class Agent : GroupAgent
    {
        public override void show()
        {
            Console.WriteLine("Agent Created !!!!");
        }
    }

    public class Booking : Agent
    {
        public override void show()
        {
            Console.WriteLine("Booking Created !!!!");
        }
    }
    class Program
    {
        static void  Main(string[] args)
        {
            GroupAgent a1 = new GroupAgent();
            a1.show();
            Agent b1 = new Agent();
            b1.show();
            GroupAgent a2 = new  Agent();
            a2.show();
        }
    }
}*/








