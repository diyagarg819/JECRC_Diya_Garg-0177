using System.ComponentModel.DataAnnotations;

namespace TransactionsApi.DTOs;

public class CreateTransactionDto
{
    [Required]
    [RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "Date must be in YYYY-MM-DD format.")]
    public required string Date { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Description { get; set; }

    [Range(0, 1, ErrorMessage = "Type must be 0 (Credit) or 1 (Debit).")]
    public int Type { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
    public decimal Amount { get; set; }

    [Required]
    [MaxLength(50)]
    public required string Balance { get; set; }
}

public class UpdateTransactionDto : CreateTransactionDto { }
