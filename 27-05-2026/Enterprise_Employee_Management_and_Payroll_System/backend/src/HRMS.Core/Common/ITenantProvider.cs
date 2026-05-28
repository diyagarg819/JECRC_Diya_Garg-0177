using System;

namespace HRMS.Core.Common
{
    public interface ITenantProvider
    {
        Guid TenantId { get; }
        void SetTenantId(Guid tenantId);
    }
}
