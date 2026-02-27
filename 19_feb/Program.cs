// See https://aka.ms/new-console-template for more information
//Console.WriteLine("Hello, World!");

//Interface

//Using inteface and interfce inheritance

/*using System;
namespace TnterfaceDemo
{
    interface IArea
    {
        void CalArea(double radius);
    }

    interface IVolume
    {
        void CalVolume(int side);
    }

    public class CircleCube : IArea , IVolume
    {
        public void CalArea(double radius)
        {
            double pie = 3.14;
            double result;
            result = pie*radius*radius;
            Console.WriteLine("Area  is {0}", result);
        }

        public void CalVolume(int side)
        {
            int result;
            result = side*side*side;
            Console.WriteLine("Result is {0}",result);
        }
    }

    class TestApp
    {
        public static void Main(string[] args)
        {
            CircleCube cc = new CircleCube();

            Console.WriteLine("Enter the value for Radius : ");
            double radius = double.Parse(Console.ReadLine());
            cc.CalArea(radius);
            Console.WriteLine("Enter your side :  ");
            int side = int.Parse(Console.ReadLine());
            cc.CalVolume(side);
            Console.ReadLine();
        }
    }
}*/




//Abstract Class,Abstarctmethod and contructor 

/*using System;
namespace TnterfaceDemo
{
    public abstract class CalcArea
    {
        public abstract void Area(double radius);
        public void bFunction()
        {
            Console.WriteLine("I am Non - abstract Method");
        }
    }

    interface IVolume
    {
        void CalVolume(int side);
    }

    public class CircleCube : CalcArea , IVolume
    {
        public override void Area(double radius)
        {
            double pie = 3.14;
            double result;
            result = pie*radius*radius;
            Console.WriteLine("Area  is {0}", result);
        }

        public void CalVolume(int side)
        {
            int result;
            result = side*side*side;
            Console.WriteLine("Result is {0}",result);
        }
    }

    class TestApp
    {
        public static void Main(string[] args)
        {
            CircleCube cc = new CircleCube();

            Console.WriteLine("Enter the value for Radius : ");
            double radius = double.Parse(Console.ReadLine());
            cc.Area(radius);
            Console.WriteLine("Enter your side :  ");
            int side = int.Parse(Console.ReadLine());
            cc.CalVolume(side);
            Console.ReadLine();
            cc.bFunction();
        }
    }
}*/

// Exercise-Example

/*namespace Objects
{
    public class DrawingObject
    {
        public virtual void Draw()
        {
            
        }
    }
    
    public class Line : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("I am a Line");
        }
    }

    public class Circle : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("I am a circle");
        }
    }

    public class Square : DrawingObject
    {
        public override void Draw()
        {
            Console.WriteLine("I am a Sqaure");
        }
    }

    class Program{
        public static void Main(string[] args)
        {
            DrawingObject[] drawings = new DrawingObject[3] { new Line() , new Circle() , new Square()};
            //drawings[0] = new Line();
            //drawings[1] = new Circle();
            //drawings[2] = new Square();

            for(int i = 0 ; i < 3 ; i++)
            {
                drawings[i].Draw();
            }

        }

    }
}*/




//Delegates,Singli-cast delegates and multi-cast delegates

/*namespace Delegate{

    public delegate void ArithmaticOperations(int x , int y);

    class UsingDelegate{
        static void Simple()
        {
            Console.WriteLine("it is a simple function");
        }

        static void Add(int x , int y)
    {
        Console.WriteLine(x+y);
    }
     static void Sub(int x , int y)
    {
        Console.WriteLine(x-y);
    }

     static void Multi(int x , int y)
    {
        Console.WriteLine(x*y);
    }

     static void Div(int x , int y)
    {
        Console.WriteLine(x/y);
    }

    static void Main(string[] args)
        {
            //singlecast
            //ArithmaticOperations obj = new ArithmaticOperations(Add);
            //obj(45,30);
            //ArithmaticOperations obj1 = new ArithmaticOperations(Sub);
            //obj(45,30);
            ArithmaticOperations obj = new ArithmaticOperations(Add);
            obj += new ArithmaticOperations(Sub);
            obj -= new ArithmaticOperations(Multi);
            obj += new ArithmaticOperations(Div);
            obj += new ArithmaticOperations(Multi);
            obj += new ArithmaticOperations(Div);
            obj(45,30);
            Console.ReadLine();
            
        } 


    }
    
}*/

/*using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;

namespace Delegate
{
    public delegate void NotificationMessanger(string message);

    class Notifiers
    {
        public static void SendEmail(string message)
        {
            Console.WriteLine("It is  sending mail " + message);
        }

        public static void SendSMS(string message)
        {
            Console.WriteLine("It is  sending sms " + message);
        }

        public static void SendPushNotification(string message)
        {
            Console.WriteLine("It is  sending mail" + message);
        }
    }

    class NotificationManager
    {
        public static void NotifyUser(string message , NotificationMessanger Sender)
        {
            Sender(message);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            NotificationManager.NotifyUser("This is something important",SendMail);
            NotificationManager.NotifyUser("This is important",SendSMS);
            NotificationManager.NotifyUser("This is very something important",SendPushNotification);
        }
    }
}*/



//Using Arraylist and  String methods and operations


/*using System.Collections;
using System.IO.Compression;
using System.Runtime.CompilerServices;

namespace ArrayListDemo
{
    class UsingArrayList
    {
        static void Main(string[] args)
        {
            ArrayList listdata = new ArrayList();
            listdata.Add(100);
            listdata.Add(101);
            listdata.Add(102);
            listdata.Add(103);
            listdata.Add("Java");
            foreach (string  i in listdata)
            {
                Console.WriteLine(i);
            }
            string order = "  Order#1001 | Laptop | Dell | 75000   ";

            Console.WriteLine(order);

            string trimorder =  order.Trim();

            Console.WriteLine(trimorder);
            Console.WriteLine(order.Length);
            Console.WriteLine(trimorder.Length);

            string [] parts = trimorder.Split('|');
            Console.WriteLine("After Split");
            foreach( var item in parts)
            {
                Console.Write(item.Trim());
            }
        }
    }
}*/

//Exercise

//Console Application that demonstrates Abstraction using a Product Order Processing System

/*using System.Dynamic;

namespace Abstract
{
    public abstract class OrderProcessor
    {
         int OrderId;
         int Amount;

        public OrderProcessor(int OrderId , int Amount)
        {
            this.OrderId = OrderId;
            this.Amount = Amount;
        }
        public   abstract void ProcessPayment();
        public  abstract void GeneralVoice();
        public   abstract void SendNotification();
        
        public void DispalyOrderDetails()
        {
            Console.WriteLine("Your order id is {0}" , OrderId);
            Console.WriteLine("Your amount is {0}" , Amount);
        }

    }

    public class OnlineOrder : OrderProcessor
    {

        public OnlineOrder(int OrderId , int  Amount) : base(OrderId,Amount){}
        public override void ProcessPayment()
        {
            Console.WriteLine("Your payment is proceeded");
        }
        public override void GeneralVoice()
        {
            Console.WriteLine("This is  your general voice");
        }
        public override void SendNotification()
        {
            Console.WriteLine("Notification is sent");
        }

        class Program
        {
            public static void Main(string[] args)
            {
                OrderProcessor order = new OnlineOrder(12,200);
                //order.OrderId = int.Parse(Console.ReadLine());
                //order.Amount = int.Parse(Console.ReadLine());

                order.DispalyOrderDetails();
                order.GeneralVoice();
                order.SendNotification();
                order.ProcessPayment();
            }
        }
    }
}*/




//Using Exception Handling try and catch Block

using System;

/*class ExDemo
{
    public static  void Main(string[] args)
    {
        int[] nums = new int[4];
        try
        {
            Console.WriteLine("Before an exception is  generated.");
            for(int i = 0 ; i < 10 ; i++)
            {
                nums[i] = i;
                Console.WriteLine("nums[{0}] : {1}",i, nums[i]);
            }
            Console.WriteLine("this won't be displayed");
        }
        catch(IndexOutOfRangeException)
        {
            Console.WriteLine("Index out-of-bounds");
        }
        Console.WriteLine("After catch statements");
    }
}*/



//Using Multiple catch Statements



/*class Multi_catch
{
    public static void Main()
    {
        int[] numer = {4,8,16,32,64,128,512};
        int [] denom = {2,0,4,4,0,8};
        for(int i = 0 ; i < numer.Length ; i++)
        {
            try
            {
                Console.WriteLine(numer[i] + " / " + denom[i] + " is " + numer[i]/denom[i]);
            }
            catch(DivideByZeroException)
            {
                Console.WriteLine("Can't be divideb by zero.");
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("no matching element found");
            }
        }
    }
}*/


//Using Catching All Exceptions

/*class Multi_catch
{
    public static void Main()
    {
        int[] numer = {4,8,16,32,64,128,512};
        int [] denom = {2,0,4,4,0,8};
        for(int i = 0 ; i < numer.Length ; i++)
        {
            try
            {
                Console.WriteLine(numer[i] + " / " + denom[i] + " is " + numer[i]/denom[i]);
            }
            catch
            {
                Console.WriteLine("Something Wrong Occured");
            }
        }
    }
}*/


//Using Nesting try Blocks ,Using Finally

/*
using System;
using System.Globalization;
class ExcDemo4
{
    public static void Main(string[] args)
    {
        int[] numer = { 4, 0, 16, 32, 64, 128, 256, 512 };
        int[] denom = { 2, 0, 4, 4, 0, 8 };

        for (int i = 0; i < numer.Length; i++)
        {
            try
            {
                Console.WriteLine(numer[i] + " / " + denom[i] + " is " + numer[i] / denom[i]);
                throw new DivideByZeroException();
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine("Can't Divide by Zero! ");
            }
            catch (IndexOutOfRangeException)
            {
                Console.WriteLine("No matching element found");
            }
            catch
            {
                Console.WriteLine("Some exception Occured");
            }
            finally
            {
                Console.WriteLine("Final block");
            }

        }
    }
}*/



//	Using User Defined Exception

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CustomExceptionExampleCode
{
    class MyException : Exception
    {
        public MyException(string message) : base(message) {}
        public MyException()
        {
            
        }
        public MyException(string message , Exception inner) : base (message,inner)  {}
    }

    class Program
    {
        public static void Main(string[] args)
        {
            int a = 50;
            int b = 10;
            int k = a/b;

            try
            {
                if (k < 10)
                {
                    throw new MyException("value of k is less then 10");
                }
            }
            catch(MyException e)
            {
                Console.WriteLine("Caught my exception");
                Console.WriteLine(e.Message);
            }
            Console.Read();
        }
    }
}




