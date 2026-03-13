using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
var builder = WebApplication.CreateBuilder(args);

//Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add controllers
builder.Services.AddControllers();

//Add dtabase context service
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

//configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//middleware
app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();

