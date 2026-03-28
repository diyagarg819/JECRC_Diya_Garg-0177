namespace TransactionsApi.Models;

public class Transaction
{
    public int Id { get; set; }

    /// <summary>Date in YYYY-MM-DD format</summary>
    public required string Date { get; set; }

    public required string Description { get; set; }

    /// <summary>0 = Credit, 1 = Debit</summary>
    public int Type { get; set; }

    public decimal Amount { get; set; }

    /// <summary>Balance prefixed with $ e.g. "$12,234.45"</summary>
    public required string Balance { get; set; }
}
