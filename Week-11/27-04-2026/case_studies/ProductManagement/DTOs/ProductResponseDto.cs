namespace ProductManagement.DTOs
{
    public class ProductResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public List<string>? Tags { get; set; }
    }
}

