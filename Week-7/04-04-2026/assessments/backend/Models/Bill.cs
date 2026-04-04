using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Bill
    {
        [Key]
        public string Id { get; set; } = string.Empty; // e.g. INV-20260404-1234
        
        public DateTime Date { get; set; } = DateTime.UtcNow;
        
        public string Status { get; set; } = "DRAFT"; // DRAFT, COMPLETED
        
        public string DiscountType { get; set; } = "percentage"; // percentage, fixed
        
        public decimal DiscountValue { get; set; }
        
        public decimal Subtotal { get; set; }
        
        public decimal DiscountAmount { get; set; }
        
        public decimal TotalTax { get; set; }
        
        public decimal FinalTotal { get; set; }

        public ICollection<BillItem> Items { get; set; } = new List<BillItem>();
    }
}
