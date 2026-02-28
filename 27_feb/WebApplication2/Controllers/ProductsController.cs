using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route ("shop")]
    public class ProductsController : Controller
    {

        private static List<Product> products = new List<Product>()
        {
            new Product { Id = 1, Name = "Laptop" , Price = 50000 },
            new Product { Id = 2, Name = "Mouse" , Price = 500 },
            new Product { Id = 3, Name = "Keyboard" , Price = 1500 },
        };
        public IActionResult Index()
        {
            return View(products);
        }
    }
}
