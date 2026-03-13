using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.Models;
namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ProductController(ApplicationDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        /*public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }*/
        public IActionResult GetProducts()
        {
            var products = _context.Products.ToList();
            return Ok(products);
        }

        [HttpGet("{id}")]

        public  IActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);
            if(product == null)
            return NotFound();

            return Ok(product);
        }


        //Add Product

        [HttpPost]

        public  IActionResult AddProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return Ok(product);
        }

        //update product

        [HttpPut("{id}")]

        public IActionResult UpdateProduct (int id , Product updatedproduct)
        {
            var product = _context.Products.Find(id);
            if(product == null) return NotFound();
            product.Name = updatedproduct.Name;
            product.Price = updatedproduct.Price;
            product.Quantity = updatedproduct.Quantity;

            _context.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("{id}")]

        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if(product == null) return NotFound();

            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }

        

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct([FromQuery] string name)
        {
            var products = await _context.Products
            .Where(p => p.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();

            return Ok(products);
        }
    }
}