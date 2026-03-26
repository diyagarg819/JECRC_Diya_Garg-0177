using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5000");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("frontend");

var tasks = new ConcurrentDictionary<int, TaskItem>();
var nextId = 4;

SeedTasks(tasks);

app.MapGet("/", () => Results.Ok(new
{
    message = "Task API is running",
    endpoints = new[]
    {
        "GET /api/tasks",
        "GET /api/tasks/{id}",
        "POST /api/tasks",
        "PUT /api/tasks/{id}",
        "PATCH /api/tasks/{id}",
        "DELETE /api/tasks/{id}"
    }
}));

app.MapGet("/api/tasks", (string? search) =>
{
    var query = tasks.Values.OrderByDescending(task => task.Id);

    if (!string.IsNullOrWhiteSpace(search))
    {
        query = query
            .Where(task => task.Title.Contains(search, StringComparison.OrdinalIgnoreCase))
            .OrderByDescending(task => task.Id);
    }

    return Results.Ok(query);
});

app.MapGet("/api/tasks/{id:int}", (int id) =>
{
    return tasks.TryGetValue(id, out var task)
        ? Results.Ok(task)
        : Results.NotFound(new { message = $"Task with id {id} was not found." });
});

app.MapPost("/api/tasks", (CreateTaskRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new { message = "Title is required." });
    }

    var task = new TaskItem(nextId++, request.Title.Trim(), request.Completed);
    tasks[task.Id] = task;

    return Results.Created($"/api/tasks/{task.Id}", task);
});

app.MapPut("/api/tasks/{id:int}", (int id, UpdateTaskRequest request) =>
{
    if (!tasks.ContainsKey(id))
    {
        return Results.NotFound(new { message = $"Task with id {id} was not found." });
    }

    if (string.IsNullOrWhiteSpace(request.Title))
    {
        return Results.BadRequest(new { message = "Title is required." });
    }

    var updatedTask = new TaskItem(id, request.Title.Trim(), request.Completed);
    tasks[id] = updatedTask;

    return Results.Ok(updatedTask);
});

app.MapPatch("/api/tasks/{id:int}", (int id, PatchTaskRequest request) =>
{
    if (!tasks.TryGetValue(id, out var existingTask))
    {
        return Results.NotFound(new { message = $"Task with id {id} was not found." });
    }

    var updatedTitle = request.Title is null ? existingTask.Title : request.Title.Trim();

    if (string.IsNullOrWhiteSpace(updatedTitle))
    {
        return Results.BadRequest(new { message = "Title cannot be empty." });
    }

    var updatedTask = existingTask with
    {
        Title = updatedTitle,
        Completed = request.Completed ?? existingTask.Completed
    };

    tasks[id] = updatedTask;

    return Results.Ok(updatedTask);
});

app.MapDelete("/api/tasks/{id:int}", (int id) =>
{
    return tasks.TryRemove(id, out _)
        ? Results.NoContent()
        : Results.NotFound(new { message = $"Task with id {id} was not found." });
});

app.Run();

static void SeedTasks(ConcurrentDictionary<int, TaskItem> tasks)
{
    var seedData = new[]
    {
        new TaskItem(1, "Set up Angular task dashboard", true),
        new TaskItem(2, "Build .NET backend routes", true),
        new TaskItem(3, "Connect HTTP client to backend API", false)
    };

    foreach (var task in seedData)
    {
        tasks[task.Id] = task;
    }
}

internal record TaskItem(int Id, string Title, bool Completed);

internal record CreateTaskRequest(string Title, bool Completed);

internal record UpdateTaskRequest(string Title, bool Completed);

internal record PatchTaskRequest(string? Title, bool? Completed);
