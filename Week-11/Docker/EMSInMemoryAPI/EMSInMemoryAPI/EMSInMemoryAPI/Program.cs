var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();



app.UseAuthorization();
app.MapControllers();

app.Run();