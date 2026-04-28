namespace ProductManagement.Models
{
    public class ProductTag
    {
        public int productId { get; set; }
        public Product? Product { get; set; }

        public int TagId { get; set; }
        public Tag? Tag { get; set; }

    }
}