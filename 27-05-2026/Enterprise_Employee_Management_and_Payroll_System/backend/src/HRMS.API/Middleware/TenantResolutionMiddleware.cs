using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using HRMS.Core.Common;

namespace HRMS.API.Middleware
{
    public class TenantResolutionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TenantResolutionMiddleware> _logger;

        // Pre-mapped subdomains for simulation
        private static readonly System.Collections.Generic.Dictionary<string, Guid> SubdomainMapping = new()
        {
            { "india", Guid.Parse("e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6") }, // Capgemini India
            { "usa", Guid.Parse("7f04c0cf-031e-450f-a189-e1fca9473fa7") }     // Capgemini USA
        };

        public TenantResolutionMiddleware(RequestDelegate next, ILogger<TenantResolutionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, ITenantProvider tenantProvider)
        {
            Guid resolvedTenantId = Guid.Empty;

            // 1. Resolve by Subdomain
            var host = context.Request.Host.Host;
            var hostParts = host.Split('.');
            if (hostParts.Length > 2)
            {
                var subdomain = hostParts[0].ToLower();
                if (SubdomainMapping.TryGetValue(subdomain, out var tenantId))
                {
                    resolvedTenantId = tenantId;
                    _logger.LogInformation("Resolved Tenant '{Subdomain}' from Subdomain: {TenantId}", subdomain, resolvedTenantId);
                }
            }

            // 2. Resolve by Header (X-Tenant-Id)
            if (resolvedTenantId == Guid.Empty)
            {
                if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var tenantHeaderValues))
                {
                    var headerValue = tenantHeaderValues.FirstOrDefault();
                    if (Guid.TryParse(headerValue, out var tenantId))
                    {
                        resolvedTenantId = tenantId;
                        _logger.LogInformation("Resolved Tenant from Header 'X-Tenant-Id': {TenantId}", resolvedTenantId);
                    }
                }
            }

            // 3. Resolve by JWT Claim
            if (resolvedTenantId == Guid.Empty && context.User.Identity?.IsAuthenticated == true)
            {
                var tenantClaim = context.User.FindFirst("tenant_id") ?? context.User.FindFirst("TenantId");
                if (tenantClaim != null && Guid.TryParse(tenantClaim.Value, out var tenantId))
                {
                    resolvedTenantId = tenantId;
                    _logger.LogInformation("Resolved Tenant from JWT Claim: {TenantId}", resolvedTenantId);
                }
            }

            // Fallback (for developer testing convenience, resolve to Capgemini India if still empty)
            if (resolvedTenantId == Guid.Empty)
            {
                resolvedTenantId = Guid.Parse("e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6");
                _logger.LogDebug("No tenant resolved. Falling back to default Tenant: {TenantId}", resolvedTenantId);
            }

            // Set the tenant on the scoped provider
            tenantProvider.SetTenantId(resolvedTenantId);

            // Add response header for debugging and transparency
            context.Response.Headers["X-Resolved-Tenant-Id"] = resolvedTenantId.ToString();

            await _next(context);
        }
    }
}
