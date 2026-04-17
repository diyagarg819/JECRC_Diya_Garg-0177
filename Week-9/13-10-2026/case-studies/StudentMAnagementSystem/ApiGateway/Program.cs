using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// 🔥 VERY IMPORTANT (YOU MISSED THIS)
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Ocelot
builder.Services.AddOcelot();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowGateway",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowGateway");

app.UseSwagger();

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/admission/swagger.json", "Admission API");
    c.SwaggerEndpoint("/attendance/swagger.json", "Attendance API");
    c.SwaggerEndpoint("/student/swagger.json", "Student API");
});

app.UseRouting();

await app.UseOcelot();

app.Run();