using System.ComponentModel.DataAnnotations;
using WebApplication1.attribute;

namespace LibraryManagement.dto
{
    public class BookStructuredto
    {
        public Guid Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(200)]
        public string BookName { get; set; } = string.Empty;

        [Required]
        [MinLength(3)]
        [MaxLength(150)]
        public string Author { get; set; } = string.Empty;

        [Required]
        [ISBN("ISBN")]
        public string ISBN { get; set; } = string.Empty;

        [Required]
        public string Genre { get; set; } = string.Empty;

        [DataType(DataType.Date)]
        public DateTime? PublishedDate { get; set; }

        [Required]
        [MinLength(1)]
        public int TotalCopies { get; set; }

        [Required]
        public int AvailableCopies { get; set; }

        [MaxLength(150)]
        public string? Publisher { get; set; }

        [MaxLength(50)]
        public string? Language { get; set; }
    }
}