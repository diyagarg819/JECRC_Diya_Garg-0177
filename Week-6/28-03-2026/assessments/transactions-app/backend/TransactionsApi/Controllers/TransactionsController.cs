using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransactionsApi.Data;
using TransactionsApi.DTOs;
using TransactionsApi.Models;

namespace TransactionsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController(AppDbContext db) : ControllerBase
{
    // GET api/transactions?date=2019-12-03&type=1&search=amazon
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transaction>>> GetAll(
        [FromQuery] string? date,
        [FromQuery] int? type,
        [FromQuery] string? search)
    {
        IQueryable<Transaction> query = db.Transactions.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(date))
            query = query.Where(t => t.Date == date);

        if (type.HasValue)
            query = query.Where(t => t.Type == type.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(t => t.Description.Contains(search));

        return Ok(await query.ToListAsync());
    }

    // GET api/transactions/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Transaction>> GetById(int id)
    {
        var tx = await db.Transactions.FindAsync(id);
        return tx is null ? NotFound(new { message = $"Transaction {id} not found." }) : Ok(tx);
    }

    // POST api/transactions
    [HttpPost]
    public async Task<ActionResult<Transaction>> Create([FromBody] CreateTransactionDto dto)
    {
        var tx = new Transaction
        {
            Date        = dto.Date,
            Description = dto.Description,
            Type        = dto.Type,
            Amount      = dto.Amount,
            Balance     = dto.Balance
        };

        db.Transactions.Add(tx);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = tx.Id }, tx);
    }

    // PUT api/transactions/5
    [HttpPut("{id:int}")]
    public async Task<ActionResult<Transaction>> Update(int id, [FromBody] UpdateTransactionDto dto)
    {
        var tx = await db.Transactions.FindAsync(id);
        if (tx is null)
            return NotFound(new { message = $"Transaction {id} not found." });

        tx.Date        = dto.Date;
        tx.Description = dto.Description;
        tx.Type        = dto.Type;
        tx.Amount      = dto.Amount;
        tx.Balance     = dto.Balance;

        await db.SaveChangesAsync();
        return Ok(tx);
    }

    // DELETE api/transactions/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tx = await db.Transactions.FindAsync(id);
        if (tx is null)
            return NotFound(new { message = $"Transaction {id} not found." });

        db.Transactions.Remove(tx);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
