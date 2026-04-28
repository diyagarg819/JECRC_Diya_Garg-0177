using ProductManagement.DTOs;
using ProductManagement.Models;
namespace ProductManagement.Repositories.Interfaces
{
    public interface IProductRepository
    {
        // Define methods for CRUD operations on products
        Task<IEnumerable<ProductResponseDto>> GetAllAsync();
        Task<ProductRequestDTOs?> GetProductById(int id);
        Task<int> CreateAsync(ProductRequestDTOs dto);
        Task<bool> UpdateAsync(int id , ProductRequestDTOs dto);
        Task<bool> DeleteAsync(int id);
    }
}