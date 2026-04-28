using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductRepository _productRepository;
        private readonly AppDbContext _context;

        public ProductsController(IProductRepository productRepository, AppDbContext context)
        {
            _productRepository = productRepository;
            _context = context;
        }

        public async Task<IActionResult> Index()
            => View(await _productRepository.GetAllAsync());

        public async Task<IActionResult> Details(int id)
        {
            var product = await _productRepository.GetProductById(id);
            return product == null ? NotFound() : View(product);
        }

        public async Task<IActionResult> Create()
        {
            await LoadLookupDataAsync();
            return View(new ProductRequestDTOs());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductRequestDTOs dto, string? tagIds)
        {
            if (!TryParseTagIds(tagIds, out var parsedTagIds))
            {
                ModelState.AddModelError(nameof(tagIds), "Enter tag IDs as a comma-separated list.");
            }

            dto.TagIds = parsedTagIds;

            await ValidateLookupReferencesAsync(dto.CategoryId, dto.TagIds);

            if (!ModelState.IsValid)
            {
                await LoadLookupDataAsync();
                return View(dto);
            }

            await _productRepository.CreateAsync(dto);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Edit(int id)
        {
            var product = await _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }

            await LoadLookupDataAsync();
            ViewBag.ProductId = id;
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, ProductRequestDTOs dto, string? tagIds)
        {
            if (!TryParseTagIds(tagIds, out var parsedTagIds))
            {
                ModelState.AddModelError(nameof(tagIds), "Enter tag IDs as a comma-separated list.");
            }

            dto.TagIds = parsedTagIds;

            await ValidateLookupReferencesAsync(dto.CategoryId, dto.TagIds);

            if (!ModelState.IsValid)
            {
                await LoadLookupDataAsync();
                ViewBag.ProductId = id;
                return View(dto);
            }

            var updated = await _productRepository.UpdateAsync(id, dto);
            if (!updated)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Delete(int id)
        {
            var product = await _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }

            ViewBag.ProductId = id;
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var deleted = await _productRepository.DeleteAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }

        private static bool TryParseTagIds(string? tagIds, out List<int> parsedTagIds)
        {
            parsedTagIds = new List<int>();

            if (string.IsNullOrWhiteSpace(tagIds))
            {
                return true;
            }

            foreach (var value in tagIds.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
            {
                if (!int.TryParse(value, out var tagId))
                {
                    return false;
                }

                parsedTagIds.Add(tagId);
            }

            return true;
        }

        private async Task LoadLookupDataAsync()
        {
            ViewBag.Categories = await _context.Categories
                .OrderBy(c => c.Id)
                .Select(c => new { c.Id, c.Name })
                .ToListAsync();

            ViewBag.Tags = await _context.Tags
                .OrderBy(t => t.Id)
                .Select(t => new { t.Id, t.Name })
                .ToListAsync();
        }

        private async Task ValidateLookupReferencesAsync(int categoryId, List<int>? tagIds)
        {
            var categoryExists = await _context.Categories.AnyAsync(c => c.Id == categoryId);
            if (!categoryExists)
            {
                ModelState.AddModelError(nameof(ProductRequestDTOs.CategoryId), "Choose a valid category ID.");
            }

            if (tagIds == null || tagIds.Count == 0)
            {
                return;
            }

            var validTagIds = await _context.Tags
                .Where(t => tagIds.Contains(t.Id))
                .Select(t => t.Id)
                .ToListAsync();

            var invalidTagIds = tagIds.Except(validTagIds).ToList();
            if (invalidTagIds.Count > 0)
            {
                ModelState.AddModelError(nameof(tagIds), $"Invalid tag IDs: {string.Join(", ", invalidTagIds)}");
            }
        }
    }
}
