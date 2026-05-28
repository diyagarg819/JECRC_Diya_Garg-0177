using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using HRMS.Core.Common;
using HRMS.Application.Payroll;
using HRMS.Infrastructure.Data;
using HRMS.Infrastructure.Services;
using HRMS.Infrastructure.BackgroundJobs;
using HRMS.API.Middleware;
using HRMS.API.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Enterprise HRMS API", Version = "v1" });
    
    // Add JWT Authentication Support in Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Database Setup
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=hrms_db;Username=hrms_user;Password=hrms_secure_password";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// Multi-Tenancy Scoped Provider
builder.Services.AddScoped<ITenantProvider, TenantProvider>();

// Distributed Cache (Redis Alpine or Local Memory Fallback)
try
{
    var redisConn = builder.Configuration["Redis:ConnectionString"] ?? "localhost:6379";
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = redisConn;
    });
}
catch
{
    builder.Services.AddDistributedMemoryCache();
}

builder.Services.AddSingleton<ICacheService, CacheService>();

// Payroll Tax Strategies
builder.Services.AddSingleton<IPayrollTaxStrategy, IndiaTaxStrategy>();
builder.Services.AddSingleton<IPayrollTaxStrategy, USTaxStrategy>();
builder.Services.AddSingleton<IPayrollTaxStrategy, UKTaxStrategy>();
builder.Services.AddSingleton<IPayrollTaxStrategy, UAETaxStrategy>();

// Event Outbox Publisher Background Job
builder.Services.AddHostedService<OutboxPublisher>();

// JWT Authentication Setup
var jwtKey = builder.Configuration["JWT:Key"] ?? "super_secret_key_hrms_platform_1234567890";
var jwtIssuer = builder.Configuration["JWT:Issuer"] ?? "HRMS_API";
var jwtAudience = builder.Configuration["JWT:Audience"] ?? "HRMS_Client";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Add SignalR for Real-time events
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "HRMS API v1"));
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

// Multi-tenant resolution middleware (Registers tenant for scoped context)
app.UseMiddleware<TenantResolutionMiddleware>();

app.MapControllers();

// Map SignalR Hub
app.MapHub<NotificationHub>("/hubs/notifications");

// Ensure DB is created/migrated at startup (Convenience for Docker startup)
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        // We let the Postgres init.sql schema setup create tables, 
        // but this verifies connection is solid or applies EF migration context if existing.
        context.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding or checking the database connection.");
    }
}

app.Run();
