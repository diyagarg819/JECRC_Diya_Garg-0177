/*using System;

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
            Product pd = new Product();
            pd.GetProductDetails();
            pd.DisplayProductDetails();
            Console.ReadLine();
        }
    }
}*/

/*using System;

namespace ConsoleApp
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

/*using System;

namespace ConsoleApp
{
    class Static
    {
        private static  int  number;
        public static  int Number{get { return number;}}

        static Static()
        {
            Random r = new  Random();
            number = r.Next();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Static Num : " + Static.Number);
        }
    }
}*/

/*using System;

namespace ConsoleApp
{
    class Static
    {
        private  int  number;
        public int Number{get { return number;}}

        public Static()
        {
            Random r = new  Random();
            number = r.Next();
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Static s = new Static();
            Console.WriteLine("Static Num : " + s.Number);
        }
    }
}*/

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

using System;
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
}