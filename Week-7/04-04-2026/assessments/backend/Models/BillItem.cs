using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class BillItem
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        
        [Required]
        public string BillId { get; set; } = string.Empty;
        
        [JsonIgnore]
        public Bill? Bill { get; set; }
        
        public string CatalogItemId { get; set; } = string.Empty;
        
        public string Name { get; set; } = string.Empty;
        
        public string Type { get; set; } = string.Empty;
        
        public decimal BasePrice { get; set; }
        
        public int Quantity { get; set; }
        
        public decimal TaxRate { get; set; }
    }
}
