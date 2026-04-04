using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class BillingService : IBillingService
    {
        private readonly AppDbContext _context;

        public BillingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CatalogItemDto>> GetCatalogsAsync()
        {
            var items = await _context.CatalogItems.ToListAsync();
            return items.Select(i => new CatalogItemDto
            {
                Id = i.Id,
                Name = i.Name,
                Type = i.Type,
                DefaultPrice = i.DefaultPrice,
                TaxRate = i.TaxRate
            }).ToList();
        }

        public async Task<CatalogItemDto> AddCatalogItemAsync(CatalogItemDto dto)
        {
            var item = new CatalogItem
            {
                Name = dto.Name,
                Type = dto.Type,
                DefaultPrice = dto.DefaultPrice,
                TaxRate = dto.TaxRate
            };
            
            _context.CatalogItems.Add(item);
            await _context.SaveChangesAsync();
            
            dto.Id = item.Id;
            return dto;
        }

        public async Task<bool> UpdateCatalogItemAsync(string id, CatalogItemDto dto)
        {
            var item = await _context.CatalogItems.FindAsync(id);
            if (item == null) return false;

            item.Name = dto.Name;
            item.Type = dto.Type;
            item.DefaultPrice = dto.DefaultPrice;
            item.TaxRate = dto.TaxRate;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCatalogItemAsync(string id)
        {
            var item = await _context.CatalogItems.FindAsync(id);
            if (item == null) return false;

            _context.CatalogItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<BillDto>> GetBillsAsync(string status)
        {
            var bills = await _context.Bills
                .Include(b => b.Items)
                .Where(b => b.Status == status)
                .OrderByDescending(b => b.Date)
                .ToListAsync();

            return bills.Select(b => MapToDto(b)).ToList();
        }

        public async Task<BillDto> GetBillByIdAsync(string id)
        {
            var bill = await _context.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == id);
                
            return bill == null ? null : MapToDto(bill);
        }

        public async Task<BillDto> CreateOrUpdateBillAsync(BillDto dto)
        {
            var existingBill = await _context.Bills
                .Include(b => b.Items)
                .FirstOrDefaultAsync(b => b.Id == dto.Id);

            Bill bill;
            if (existingBill != null)
            {
                bill = existingBill;
                // Delete existing items to replace with new ones
                _context.BillItems.RemoveRange(bill.Items);
            }
            else
            {
                bill = new Bill { Id = dto.Id ?? $"INV-{DateTime.UtcNow:yyyyMMdd}-{new Random().Next(1000, 9999)}" };
                _context.Bills.Add(bill);
            }

            // Trust backend for calculations over frontend, but for speed, we adopt frontend totals mapped locally here.
            // In a strictly secure app, we'd recalculate these entirely here. 
            // We'll trust the DTO for now as this is a port from local-storage to local-network.
            bill.Date = dto.Date ?? DateTime.UtcNow;
            bill.Status = dto.Status;
            bill.DiscountType = dto.DiscountType;
            bill.DiscountValue = dto.DiscountValue;
            bill.Subtotal = dto.Subtotal;
            bill.DiscountAmount = dto.DiscountAmount;
            bill.TotalTax = dto.TotalTax;
            bill.FinalTotal = dto.FinalTotal;

            bill.Items = dto.Items.Select(i => new BillItem
            {
                CatalogItemId = i.CatalogItemId,
                Name = i.Name,
                Type = i.Type,
                BasePrice = i.BasePrice,
                Quantity = i.Quantity,
                TaxRate = i.TaxRate
            }).ToList();

            await _context.SaveChangesAsync();
            return MapToDto(bill);
        }

        public async Task<bool> DeleteDraftAsync(string id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null || bill.Status != "DRAFT") return false;

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();
            return true;
        }

        private BillDto MapToDto(Bill b) => new BillDto
        {
            Id = b.Id,
            Date = b.Date,
            Status = b.Status,
            DiscountType = b.DiscountType,
            DiscountValue = b.DiscountValue,
            Subtotal = b.Subtotal,
            DiscountAmount = b.DiscountAmount,
            TotalTax = b.TotalTax,
            FinalTotal = b.FinalTotal,
            Items = b.Items.Select(i => new BillItemDto
            {
                Id = i.Id,
                CatalogItemId = i.CatalogItemId,
                Name = i.Name,
                Type = i.Type,
                BasePrice = i.BasePrice,
                Quantity = i.Quantity,
                TaxRate = i.TaxRate
            }).ToList()
        };
    }
}
