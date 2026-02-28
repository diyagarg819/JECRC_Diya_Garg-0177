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
