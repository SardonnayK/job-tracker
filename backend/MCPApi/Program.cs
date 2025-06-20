using Microsoft.EntityFrameworkCore;
using MCPApi.Data;
using MCPApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

// Create database if it doesn't exist
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();
}

// API Endpoints
app.MapGet("/api/items", async (ApplicationDbContext db) =>
    await db.Items.ToListAsync())
.WithName("GetItems")
.WithOpenApi();

app.MapGet("/api/items/{id}", async (int id, ApplicationDbContext db) =>
    await db.Items.FindAsync(id) is Item item ?
        Results.Ok(item) :
        Results.NotFound())
.WithName("GetItem")
.WithOpenApi();

app.MapPost("/api/items", async (Item item, ApplicationDbContext db) =>
{
    db.Items.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/api/items/{item.Id}", item);
})
.WithName("CreateItem")
.WithOpenApi();

app.MapPut("/api/items/{id}", async (int id, Item inputItem, ApplicationDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Title = inputItem.Title;
    item.Description = inputItem.Description;
    item.IsCompleted = inputItem.IsCompleted;

    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("UpdateItem")
.WithOpenApi();

app.MapDelete("/api/items/{id}", async (int id, ApplicationDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteItem")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
