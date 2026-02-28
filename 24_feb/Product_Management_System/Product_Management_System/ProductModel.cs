using System;
using System.Collections.Generic;
using System.Text;

namespace Product_Management_System
{
    internal class ProductModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public double Price { get; set; }
        public bool InStock { get; set; }
    }
}
