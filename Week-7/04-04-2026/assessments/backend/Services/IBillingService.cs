using backend.DTOs;

namespace backend.Services
{
    public interface IBillingService
    {
        Task<List<CatalogItemDto>> GetCatalogsAsync();
        Task<CatalogItemDto> AddCatalogItemAsync(CatalogItemDto dto);
        Task<bool> UpdateCatalogItemAsync(string id, CatalogItemDto dto);
        Task<bool> DeleteCatalogItemAsync(string id);

        Task<List<BillDto>> GetBillsAsync(string status);
        Task<BillDto> GetBillByIdAsync(string id);
        Task<BillDto> CreateOrUpdateBillAsync(BillDto dto);
        Task<bool> DeleteDraftAsync(string id);
    }
}
