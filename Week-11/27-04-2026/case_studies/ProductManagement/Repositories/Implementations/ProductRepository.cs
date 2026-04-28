
using ProductManagement.DTOs;
using ProductManagement.Models;
using ProductManagement.Data;
using ProductManagement.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ProductManagement.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(ProductRequestDTOs dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                price = dto.Price,
                CategoryId = dto.CategoryId,
                productDetail = new ProductDetail
                {
                    Description = dto.Description
                },
                ProductTags = dto.TagIds?.Select(tagId => new ProductTag
                {
                    TagId = tagId
                }).ToList()
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product.Id;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return false;
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags!)
                    .ThenInclude(pt => pt.Tag)
                .Select(p => new ProductResponseDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.price ?? 0m,
                    CategoryName = p.Category != null ? p.Category.Name : null,
                    Description = p.productDetail != null ? p.productDetail.Description : null,
                    Tags = p.ProductTags == null
                        ? new List<string>()
                        : p.ProductTags
                            .Where(pt => pt.Tag != null && pt.Tag.Name != null)
                            .Select(pt => pt.Tag!.Name!)
                            .ToList()
                })
                .ToListAsync();
        }

        public async Task<ProductRequestDTOs?> GetProductById(int id)
        {
            var p = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags!)
                    .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);
            if(p == null ) return null;
            return new ProductRequestDTOs
            {
                Name = p.Name,
                Price = p.price ?? 0m,
                CategoryId = p.CategoryId,
                Description = p.productDetail != null ? p.productDetail.Description : null,
                TagIds = p.ProductTags == null
                    ? new List<int>()
                    : p.ProductTags
                        .Where(pt => pt.Tag != null)
                        .Select(pt => pt.TagId)
                        .ToList()
            };
        }

        public async Task<bool> UpdateAsync(int id, ProductRequestDTOs dto)
        {
            var product = await _context.Products
                .Include(p => p.productDetail)
                .Include(p => p.ProductTags)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return false;
            }

            product.Name = dto.Name;
            product.price = dto.Price;
            product.CategoryId = dto.CategoryId;

            if (product.productDetail == null)
            {
                product.productDetail = new ProductDetail
                {
                    ProductId = id,
                    Description = dto.Description
                };
            }
            else
            {
                product.productDetail.Description = dto.Description;
            }

            if (product.ProductTags != null && product.ProductTags.Count > 0)
            {
                _context.ProductTags.RemoveRange(product.ProductTags);
            }

            product.ProductTags = dto.TagIds?.Select(tagId => new ProductTag
            {
                productId = id,
                TagId = tagId
            }).ToList() ?? new List<ProductTag>();

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
