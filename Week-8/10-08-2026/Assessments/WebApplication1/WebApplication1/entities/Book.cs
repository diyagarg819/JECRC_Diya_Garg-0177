namespace LibraryManagement.Models
{
    public class Book
    {
        public Guid Id { get; set; }

        public string BookName { get; set; } = string.Empty;

        public string Author { get; set; } = string.Empty;

        public string ISBN { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;

        public DateTime? PublishedDate { get; set; }

        public int TotalCopies { get; set; }

        public int AvailableCopies { get; set; }

        public string? Publisher { get; set; }

        public string? Language { get; set; }
    }
}