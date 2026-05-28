using System;
using HRMS.Core.Common;

namespace HRMS.Infrastructure.Services
{
    public class TenantProvider : ITenantProvider
    {
        // By default, set it to the default Indian Tenant for testing, but let it be dynamically settable.
        // Capgemini India: e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6
        public Guid TenantId { get; private set; } = Guid.Parse("e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6");

        public void SetTenantId(Guid tenantId)
        {
            TenantId = tenantId;
        }
    }
}
