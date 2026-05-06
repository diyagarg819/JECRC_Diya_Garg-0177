namespace LibraryManagement.Models
{
    /// <summary>
    /// Represents a book stored by the API.
    /// </summary>
    public class Book
    {
        /// <summary>
        /// Unique identifier for the book.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Display title of the book.
        /// </summary>
        public string BookName { get; set; } = string.Empty;

        /// <summary>
        /// Author credited for the book.
        /// </summary>
        public string Author { get; set; } = string.Empty;

        /// <summary>
        /// ISBN-10 or ISBN-13 identifier.
        /// </summary>
        public string ISBN { get; set; } = string.Empty;

        /// <summary>
        /// Category or genre assigned to the book.
        /// </summary>
        public string Genre { get; set; } = string.Empty;

        /// <summary>
        /// Original publication date when known.
        /// </summary>
        public DateTime? PublishedDate { get; set; }

        /// <summary>
        /// Number of physical or digital copies owned.
        /// </summary>
        public int TotalCopies { get; set; }

        /// <summary>
        /// Number of copies currently available for borrowing.
        /// </summary>
        public int AvailableCopies { get; set; }

        /// <summary>
        /// Publisher name when supplied.
        /// </summary>
        public string? Publisher { get; set; }

        /// <summary>
        /// Primary language of the book.
        /// </summary>
        public string? Language { get; set; }
    }
}
