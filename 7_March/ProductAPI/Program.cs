using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;

var builder = WebApplication.CreateBuilder(args);

//adding cors

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});



//addcontrollers
builder.Services.AddControllers();

//add database context service
builder.Services.AddDbContext<ApplicationDBContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//add Services to the containers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Configure the http request pipeline
var app = builder.Build();




if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

}

//middleware
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


app.Run();

