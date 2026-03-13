using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<TodoItem>> AddTodo(TodoItem todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }

        // PUT: api/todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem todo)
        {
            if (id != todo.Id) return BadRequest();

            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null) return NotFound();

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}