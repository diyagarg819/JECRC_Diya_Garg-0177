using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CatalogItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Type { get; set; } = string.Empty; // Entrance Fee, Donation, Selling Price, Custom Item
        
        public decimal DefaultPrice { get; set; }
        
        public decimal TaxRate { get; set; }
    }
}
