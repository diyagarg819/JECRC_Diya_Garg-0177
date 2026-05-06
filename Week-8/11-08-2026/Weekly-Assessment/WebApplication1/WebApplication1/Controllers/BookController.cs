using LibraryManagement.dto;
using LibraryManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagement.Controllers
{
    /// <summary>
    /// Exposes CRUD endpoints for managing books in the in-memory catalog.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private static readonly List<Book> Books = [];

        /// <summary>
        /// Creates a new book entry.
        /// </summary>
        /// <param name="bookDto">Validated request payload for the book.</param>
        /// <returns>The created book resource.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<BookResponseDto> CreateBook([FromBody] BookRequestDto bookDto)
        {
            var book = MapToBook(bookDto);
            Books.Add(book);

            var response = MapToResponse(book);
            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, response);
        }

        /// <summary>
        /// Returns all books currently stored in the catalog.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<BookResponseDto>), StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<BookResponseDto>> ShowBook()
        {
            var response = Books.Select(MapToResponse).ToList();
            return Ok(response);
        }

        /// <summary>
        /// Returns a single book by its identifier.
        /// </summary>
        /// <param name="id">Book identifier.</param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<BookResponseDto> GetBookById(Guid id)
        {
            var book = Books.FirstOrDefault(existingBook => existingBook.Id == id);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            return Ok(MapToResponse(book));
        }

        /// <summary>
        /// Updates an existing book.
        /// </summary>
        /// <param name="id">Identifier of the book to update.</param>
        /// <param name="bookDto">Validated request payload.</param>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(BookResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<BookResponseDto> UpdateBook(Guid id, [FromBody] BookRequestDto bookDto)
        {
            var book = Books.FirstOrDefault(existingBook => existingBook.Id == id);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            ApplyUpdates(book, bookDto);
            return Ok(MapToResponse(book));
        }

        /// <summary>
        /// Deletes a book by its identifier.
        /// </summary>
        /// <param name="id">Identifier of the book to remove.</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteBook(Guid id)
        {
            var book = Books.FirstOrDefault(existingBook => existingBook.Id == id);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            Books.Remove(book);
            return Ok("Book deleted successfully");
        }

        private static Book MapToBook(BookRequestDto bookDto) =>
            new()
            {
                Id = bookDto.Id == Guid.Empty ? Guid.NewGuid() : bookDto.Id,
                BookName = bookDto.BookName.Trim(),
                Author = bookDto.Author.Trim(),
                ISBN = bookDto.ISBN.Trim(),
                Genre = bookDto.Genre.Trim(),
                PublishedDate = bookDto.PublishedDate,
                TotalCopies = bookDto.TotalCopies,
                AvailableCopies = bookDto.AvailableCopies,
                Publisher = string.IsNullOrWhiteSpace(bookDto.Publisher) ? null : bookDto.Publisher.Trim(),
                Language = string.IsNullOrWhiteSpace(bookDto.Language) ? null : bookDto.Language.Trim()
            };

        private static BookResponseDto MapToResponse(Book book) =>
            new()
            {
                Id = book.Id,
                BookName = book.BookName,
                Author = book.Author,
                ISBN = book.ISBN,
                Genre = book.Genre,
                PublishedDate = book.PublishedDate,
                TotalCopies = book.TotalCopies,
                AvailableCopies = book.AvailableCopies,
                Publisher = book.Publisher,
                Language = book.Language
            };

        private static void ApplyUpdates(Book book, BookRequestDto bookDto)
        {
            book.BookName = bookDto.BookName.Trim();
            book.Author = bookDto.Author.Trim();
            book.ISBN = bookDto.ISBN.Trim();
            book.Genre = bookDto.Genre.Trim();
            book.PublishedDate = bookDto.PublishedDate;
            book.TotalCopies = bookDto.TotalCopies;
            book.AvailableCopies = bookDto.AvailableCopies;
            book.Publisher = string.IsNullOrWhiteSpace(bookDto.Publisher) ? null : bookDto.Publisher.Trim();
            book.Language = string.IsNullOrWhiteSpace(bookDto.Language) ? null : bookDto.Language.Trim();
        }
    }
}
