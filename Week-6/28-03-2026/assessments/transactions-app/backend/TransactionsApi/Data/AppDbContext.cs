using Microsoft.EntityFrameworkCore;
using TransactionsApi.Models;

namespace TransactionsApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Date).HasMaxLength(10).IsRequired();
            entity.Property(t => t.Description).HasMaxLength(500).IsRequired();
            entity.Property(t => t.Amount).HasColumnType("decimal(18,2)");
            entity.Property(t => t.Balance).HasMaxLength(50).IsRequired();
        });

        // Seed data matching the spec format
        modelBuilder.Entity<Transaction>().HasData(
            new Transaction { Id = 1, Date = "2019-12-03", Description = "HACKERBANK INC. DES:CCD+ ID: 33375894749", Type = 0, Amount = 1985.40m, Balance = "$12,234.45" },
            new Transaction { Id = 2, Date = "2019-12-05", Description = "AMAZON MKTPL DES:AMZN.COM ID: 994020234", Type = 1, Amount = 42.99m, Balance = "$12,191.46" },
            new Transaction { Id = 3, Date = "2019-12-07", Description = "PAYROLL DES:DIRECT DEP ID: 887654321", Type = 0, Amount = 3250.00m, Balance = "$15,441.46" },
            new Transaction { Id = 4, Date = "2019-12-10", Description = "NETFLIX DES:SUBSCR ID: 442001233", Type = 1, Amount = 15.99m, Balance = "$15,425.47" },
            new Transaction { Id = 5, Date = "2019-12-12", Description = "WHOLE FOODS MKT DES:PURCHASE ID: 00192344", Type = 1, Amount = 89.34m, Balance = "$15,336.13" }
        );
    }
}
