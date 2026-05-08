namespace LibraryManagement.dto
{
    /// <summary>
    /// Represents book data returned by the API.
    /// </summary>
    public class BookResponseDto
    {
        /// <summary>
        /// Unique identifier for the book.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Display title of the book.
        /// </summary>
        public required string BookName { get; set; }

        /// <summary>
        /// Author of the book.
        /// </summary>
        public required string Author { get; set; }

        /// <summary>
        /// ISBN-10 or ISBN-13 identifier.
        /// </summary>
        public required string ISBN { get; set; }

        /// <summary>
        /// Genre or category.
        /// </summary>
        public required string Genre { get; set; }

        /// <summary>
        /// Publication date when known.
        /// </summary>
        public DateTime? PublishedDate { get; set; }

        /// <summary>
        /// Total number of copies owned.
        /// </summary>
        public int TotalCopies { get; set; }

        /// <summary>
        /// Number of copies currently available.
        /// </summary>
        public int AvailableCopies { get; set; }

        /// <summary>
        /// Publisher name when available.
        /// </summary>
        public string? Publisher { get; set; }

        /// <summary>
        /// Language of the book content.
        /// </summary>
        public string? Language { get; set; }
    }
}
