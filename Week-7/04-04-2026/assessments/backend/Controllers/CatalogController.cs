using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly IBillingService _billingService;

        public CatalogController(IBillingService billingService)
        {
            _billingService = billingService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CatalogItemDto>>> Get()
        {
            return Ok(await _billingService.GetCatalogsAsync());
        }

        [HttpPost]
        public async Task<ActionResult<CatalogItemDto>> Post([FromBody] CatalogItemDto dto)
        {
            var result = await _billingService.AddCatalogItemAsync(dto);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] CatalogItemDto dto)
        {
            var success = await _billingService.UpdateCatalogItemAsync(id, dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var success = await _billingService.DeleteCatalogItemAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
