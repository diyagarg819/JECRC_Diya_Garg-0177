using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly IBillingService _billingService;

        public BillsController(IBillingService billingService)
        {
            _billingService = billingService;
        }

        [HttpGet("drafts")]
        public async Task<ActionResult<List<BillDto>>> GetDrafts()
        {
            return Ok(await _billingService.GetBillsAsync("DRAFT"));
        }

        [HttpGet("history")]
        public async Task<ActionResult<List<BillDto>>> GetHistory()
        {
            return Ok(await _billingService.GetBillsAsync("COMPLETED"));
        }

        [HttpPost]
        public async Task<ActionResult<BillDto>> SaveBill([FromBody] BillDto dto)
        {
            var result = await _billingService.CreateOrUpdateBillAsync(dto);
            return Ok(result);
        }

        [HttpDelete("drafts/{id}")]
        public async Task<IActionResult> DeleteDraft(string id)
        {
            var success = await _billingService.DeleteDraftAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
