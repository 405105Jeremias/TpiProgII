using AutopartesApi.Data.Interfaces;
using AutopartesApi.Data.Repositorys;
using AutopartesApi.Entities;
using AutopartesApi.Service.Interfaces;
using AutopartesApi.Service.Repositorys;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add services to the container.
builder.Services.AddDbContext<AutopartesTpiiContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAutopartesRepository, AutopartesRepository>();
builder.Services.AddScoped<IEmpleadoRepository, EmpleadosRepository>();
builder.Services.AddScoped<IClientesRepository, ClientesRepository>();
builder.Services.AddScoped<IFacturasRepository, FacturasRepository>();
builder.Services.AddScoped<IFacturasService, FacturasService>();
builder.Services.AddScoped<IClientesService, ClientesService>();
builder.Services.AddScoped<IAutopartesService, AutopartesService>();
builder.Services.AddScoped<IEmpleadosService, EmpleadoService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORS");

app.UseAuthorization();

app.MapControllers();

app.Run();