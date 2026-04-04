namespace backend.DTOs
{
    public class CatalogItemDto
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal DefaultPrice { get; set; }
        public decimal TaxRate { get; set; }
    }

    public class BillDto
    {
        public string? Id { get; set; }
        public DateTime? Date { get; set; }
        public string Status { get; set; } = "COMPLETED"; // or DRAFT
        public string DiscountType { get; set; } = "percentage";
        public decimal DiscountValue { get; set; }
        public decimal Subtotal { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalTax { get; set; }
        public decimal FinalTotal { get; set; }
        public List<BillItemDto> Items { get; set; } = new List<BillItemDto>();
    }

    public class BillItemDto
    {
        public string? Id { get; set; }
        public string CatalogItemId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public int Quantity { get; set; }
        public decimal TaxRate { get; set; }
    }
}
