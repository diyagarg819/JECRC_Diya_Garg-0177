using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<CatalogItem> CatalogItems { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<BillItem> BillItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relationships
            modelBuilder.Entity<Bill>()
                .HasMany(b => b.Items)
                .WithOne(i => i.Bill)
                .HasForeignKey(i => i.BillId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed Data setup
            modelBuilder.Entity<CatalogItem>().HasData(
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662da", Name = "Adult Ticket", Type = "Entrance Fee", DefaultPrice = 50, TaxRate = 10 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662db", Name = "Child Ticket", Type = "Entrance Fee", DefaultPrice = 25, TaxRate = 10 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662dc", Name = "Senior Ticket", Type = "Entrance Fee", DefaultPrice = 35, TaxRate = 10 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662dd", Name = "VIP Pass", Type = "Entrance Fee", DefaultPrice = 150, TaxRate = 10 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662de", Name = "T-Shirt", Type = "Selling Price", DefaultPrice = 30, TaxRate = 5 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662df", Name = "Mug", Type = "Selling Price", DefaultPrice = 15, TaxRate = 5 },
                new CatalogItem { Id = "6b29fc40-ca47-1067-b31d-00dd010662e0", Name = "General Donation", Type = "Donation", DefaultPrice = 0, TaxRate = 0 }
            );
        }
    }
}
