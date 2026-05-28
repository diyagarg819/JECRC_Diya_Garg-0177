using Hospital.Api.Auth;
using Hospital.Api.Application;
using Hospital.Api.Domain;
using Hospital.Api.Features.Admin;
using Hospital.Api.Features.Appointments;
using Hospital.Api.Features.Billing;
using Hospital.Api.Features.Doctors;
using Hospital.Api.Features.Emergency;
using Hospital.Api.Features.Labs;
using Hospital.Api.Features.Patients;
using Hospital.Api.Features.Pharmacy;
using Hospital.Api.Features.Telemedicine;
using Hospital.Api.Infrastructure;
using Hospital.Api.Realtime;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<AuthOptions>(builder.Configuration.GetSection("Auth"));
builder.Services.AddSingleton<ITokenService, TokenService>();
builder.Services.AddSingleton<IPasswordHasher, Pbkdf2PasswordHasher>();
builder.Services.AddSingleton<IHospitalRepository, InMemoryHospitalRepository>();
builder.Services.AddSingleton<IAuditLog, InMemoryAuditLog>();
builder.Services.AddSingleton<AppointmentScheduler>();
builder.Services.AddSingleton<SymptomTriageService>();
builder.Services.AddSignalR();
builder.Services.AddAuthorization();
builder.Services
    .AddAuthentication(SimpleJwtAuthenticationDefaults.Scheme)
    .AddScheme<AuthenticationSchemeOptions, SimpleJwtAuthenticationHandler>(
        SimpleJwtAuthenticationDefaults.Scheme,
        options => { });

var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(corsOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => Results.Ok(new
{
    service = "Hospital Platform API",
    modules = new[]
    {
        "Patient Portal",
        "Doctor Dashboard",
        "Appointment Scheduler",
        "Lab & Prescription Management",
        "Billing & Insurance",
        "Telemedicine",
        "Admin Analytics"
    }
}));

app.MapAuthEndpoints();

var protectedApi = app.MapGroup("/api")
    .RequireAuthorization(new AuthorizeAttribute());

protectedApi.MapPatientEndpoints();
protectedApi.MapDoctorEndpoints();
protectedApi.MapAppointmentEndpoints();
protectedApi.MapLabEndpoints();
protectedApi.MapBillingEndpoints();
protectedApi.MapPharmacyEndpoints();
protectedApi.MapTelemedicineEndpoints();
protectedApi.MapEmergencyEndpoints();
protectedApi.MapAdminEndpoints();

app.MapHub<HospitalHub>("/hubs/hospital");

app.Run();
