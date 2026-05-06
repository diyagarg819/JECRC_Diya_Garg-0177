using System.ComponentModel.DataAnnotations;
using LibraryManagement.Validation;

namespace LibraryManagement.dto
{
    /// <summary>
    /// Represents the payload required to create or update a book.
    /// </summary>
    public class BookRequestDto : IValidatableObject
    {
        /// <summary>
        /// Optional identifier supplied by the caller. A new value is generated when omitted.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Display title of the book.
        /// </summary>
        [Required]
        [MinLength(3)]
        [MaxLength(200)]
        public string BookName { get; set; } = string.Empty;

        /// <summary>
        /// Author of the book.
        /// </summary>
        [Required]
        [MinLength(3)]
        [MaxLength(150)]
        public string Author { get; set; } = string.Empty;

        /// <summary>
        /// ISBN-10 or ISBN-13 value.
        /// </summary>
        [Required]
        [Isbn]
        public string ISBN { get; set; } = string.Empty;

        /// <summary>
        /// Genre or category used for grouping.
        /// </summary>
        [Required]
        [MinLength(3)]
        [MaxLength(100)]
        public string Genre { get; set; } = string.Empty;

        /// <summary>
        /// Publication date when known.
        /// </summary>
        public DateTime? PublishedDate { get; set; }

        /// <summary>
        /// Total number of copies owned by the library.
        /// </summary>
        [Range(1, int.MaxValue)]
        public int TotalCopies { get; set; }

        /// <summary>
        /// Number of copies currently available.
        /// </summary>
        [Range(0, int.MaxValue)]
        public int AvailableCopies { get; set; }

        /// <summary>
        /// Publisher name when available.
        /// </summary>
        [MaxLength(150)]
        public string? Publisher { get; set; }

        /// <summary>
        /// Language of the book content.
        /// </summary>
        [MaxLength(50)]
        public string? Language { get; set; }

        /// <summary>
        /// Enforces rules that depend on multiple fields together.
        /// </summary>
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (AvailableCopies > TotalCopies)
            {
                yield return new ValidationResult(
                    "Available copies cannot be greater than total copies.",
                    [nameof(AvailableCopies), nameof(TotalCopies)]);
            }
        }
    }
}
