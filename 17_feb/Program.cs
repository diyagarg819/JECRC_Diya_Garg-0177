// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

//Nullable Types use of ?  

/*using System;
class  Program
{
    static void Main(string[] args)
    {
        DateTime? dt = null;
        dt = DateTime.Now;
        object o = dt;
        DateTime? dt2 = o as DateTime?;
        if(dt2 != null)
        {
            Console.WriteLine(dt2.Value.ToString());
        }
        Console.ReadLine();
    }
}*/

//Nullable Types use of operator ?? 

/*using System;
class Program
{
    static void Main(string[] args)
    {
        int? j = null; int? k = 54;
        int result1 =  j ?? 0 ;
        int result2 = k ?? 0;
        Console.WriteLine("result1 = {0} , result2 = {1}",result1,result2);
        Console.ReadLine();
    }
}*/

//Create Emplyee Deatails

/*using System;
using System.Dynamic;
namespace ConsoleApp
{
    class Employee
    {
        public string Name{get;set;}
        public int Id{get;set;}
        public string Department {get;set;}
        public double Salary { get;set;}
        public string Position {get;set;}
        public DateTime Date_Of_Joining {get;set;}

        public void GetEmployeeData()
        {
            Console.WriteLine("Enter Employee Name: ");
            Name = Console.ReadLine();
            Console.WriteLine("Enter Employee id: ");
            Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter your Department :");
            Department = Console.ReadLine();
            Console.WriteLine("Enter Salary: ");
            Salary = double.parse(Console.ReadLine());
            Console.WriteLine("Enter Position: ");
            Position = Console.ReadLine();
            Console.WriteLine("Enter Date of your joining :");
            Date_Of_Joining = DateTime.Now();

        }
        public void DisplayEmployeeData()
        {
            Console.WriteLine($"Employee Name : {Name}");
            Console.WriteLine($"Employee Id : {Id}");
            Console.WriteLine($"Employee Department : {Department}");
            Console.WriteLine($"Employee Salary : {Salary}");
            Console.WriteLine($"Employee Position : {Position}");
            Console.WriteLine($"Employee Date_of_Joining : {Date_Of_Joining}");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Employee emp = new Employee();
            emp.GetEmployeeData();
            emp.DisplayEmployeeData();
            Console.ReadLine();
        }
    } 
}
*/

//Using If-else Statement

/*int a = 12;
int b = 10;

if (a > b)
{
    Console.WriteLine("a is greater");
}
else
{
    Console.WriteLine("b is greater");
}*/

//Using Switch Statement

/*using System.ComponentModel;

string input;
int myint;

begin;
Console.Write("Please enter a number btw 1 and 3 :");
input = Console.ReadLine();
myint = Int32.Parse(input);

switch (myint)
{
    case 1:
    Console.WriteLine("Your number is  {0}" , myint);
    break;
    case 2:
    Console.WriteLine("Your number is  {0}" , myint);
    break;
    case 3:
    Console.WriteLine("Your number is  {0}" , myint);
    break;
    default:
    Console.WriteLine("Your number {0} is  not betweeen 1 and 3 ", myint);
    break;
}*/

//Using Do-While

/*int a = 4;
do
{
    Console.WriteLine(a);

}while(a<3);
*/

//"Write a C# Sharp program that takes three letters as input and display them in reverse order.

/*char[] characters = new char[3] ;
Array.Reverse(characters);
foreach(char c in characters)
{
    Console.Write(c + " ");

}*/

//Write a C# Sharp program that takes a number value as 2 and a width value as 6 also a number, as input and then displays a triangle of that width, using that number.

/*int number, width;
int i , j;

Console.WriteLine("Enter number : ");
number = int.Parse(Console.ReadLine());
Console.WriteLine("Enter width : ");
width = int.Parse(Console.ReadLine());

for (i = width; i >= 1; i--)
{
    for (j = 1; j <= i; j++)
    {
        Console.Write(number);
    }
    Console.WriteLine();
}*/

//Write a C# Sharp program that takes two numbers as input and returns true or false when both numbers are even or odd.


/*using System.Diagnostics;

Console.WriteLine("Enter 1 st number :");
int input1 = int.Parse(Console.ReadLine());
Console.WriteLine("Enter 2 st number :");
int input2 = int.Parse(Console.ReadLine());

if((input1%2==0) && (input2 % 2==0))
{
    Console.Write("True");
}
else
{
    Console.Write("False");
}*/

//Write a C# Sharp program to display Employe Data

/*using System;
using System.Dynamic;
namespace ConsoleApp
{
    class Employee
    {
        public string Name{get;set;}
        public int Id{get;set;}
        public string Department {get;set;}
        public double Salary { get;set;}
        public string Position {get;set;}
        public DateTime Date_Of_Joining {get;set;}

        public void GetEmployeeData()
        {
            Console.WriteLine("Enter Employee Name: ");
            Name = Console.ReadLine();
            Console.WriteLine("Enter Employee id: ");
            Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter your Department :");
            Department = Console.ReadLine();
            Console.WriteLine("Enter Salary: ");
            Salary = double.parse(Console.ReadLine());
            Console.WriteLine("Enter Position: ");
            Position = Console.ReadLine();
            Console.WriteLine("Enter Date of your joining :");
            Date_Of_Joining = DateTime.Now();

        }
        public void DisplayEmployeeData()
        {
            Console.WriteLine($"Employee Name : {Name}");
            Console.WriteLine($"Employee Id : {Id}");
            Console.WriteLine($"Employee Department : {Department}");
            Console.WriteLine($"Employee Salary : {Salary}");
            Console.WriteLine($"Employee Position : {Position}");
            Console.WriteLine($"Employee Date_of_Joining : {Date_Of_Joining}");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Employee emp = new Employee();
            emp.GetEmployeeData();
            emp.DisplayEmployeeData();
            Console.ReadLine();
        }
    } 
}
*/

//Write a C# Sharp program to display Product Data

/*using System;
using System.Dynamic;
namespace ConsoleApp
{
    class Product 
    {
        public string Name{get;set;}
        public int Id{get;set;}
        public int Quantity {get;set;}
        public double Price { get;set;}
        public Bool Iso_standard {get;set;}
        public DateTime Expiry_Date {get;set;}

        public void GetProductDetails()
        {
            Console.WriteLine("Enter Product Name: ");
            Name = Console.ReadLine();
            Console.WriteLine("Enter Product id: ");
            Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter your quantity :");
            Quantity = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Price: ");
            Price = double.parse(Console.ReadLine());
            Console.WriteLine("Enter Iso-Standard: ");
            Position = Bool.Parse.ReadLine();
            Console.WriteLine("Enter Expiry_date :");
            Date_Of_Joining = DateTime.Now();

        }
        public void DisplayProductDetails()
        {
            Console.WriteLine($"Product Name : {Name}");
            Console.WriteLine($"Product Id : {Id}");
            Console.WriteLine($"Quantity : {Quantity}");
            Console.WriteLine($"Price : {Price}");
            Console.WriteLine($"Iso_standard : {Iso_standard}");
            Console.WriteLine($"Expiry-Date : {Expiry_Date}");
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Product pd = new Product();
            pd.GetProductDetails();
            pd.DisplayProductDetails();
            Console.ReadLine();
        }
    } 
}*/


