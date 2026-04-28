using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.Models;
using ProductManagement.Repositories.Interfaces;
using ProductManagement.Repositories.Implementations;
var builder = WebApplication.CreateBuilder(args);

//adding services to the container
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' was not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();

    if (!dbContext.Categories.Any())
    {
        dbContext.Categories.AddRange(
            new Category { Name = "Electronics" },
            new Category { Name = "Groceries" },
            new Category { Name = "Stationery" });
    }

    if (!dbContext.Tags.Any())
    {
        dbContext.Tags.AddRange(
            new Tag { Name = "Featured" },
            new Tag { Name = "Seasonal" },
            new Tag { Name = "Top Seller" });
    }

    dbContext.SaveChanges();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Products}/{action=Index}/{id?}");

app.MapControllers();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
