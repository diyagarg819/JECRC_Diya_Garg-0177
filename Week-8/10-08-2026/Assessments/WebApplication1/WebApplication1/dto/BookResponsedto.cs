namespace LibraryManagement.dto
{
    public class BookResponsedto
    {

            public required string BookName { get; set; } 

            public required string Author { get; set; }

            public required string ISBN { get; set; } 

            public required string Genre { get; set; } 

            public DateTime? PublishedDate { get; set; }

            public int AvailableCopies { get; set; }

            public string? Publisher { get; set; }

            public string? Language { get; set; } 
        
    }
}
