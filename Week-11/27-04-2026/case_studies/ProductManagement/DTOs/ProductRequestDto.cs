using System.ComponentModel.DataAnnotations;

namespace ProductManagement.DTOs
{
    public class ProductRequestDTOs
    {
        [Required]
        public string? Name { get; set; }   
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public string? Description { get; set; }
        public List<int>? TagIds { get; set; }
    }
}