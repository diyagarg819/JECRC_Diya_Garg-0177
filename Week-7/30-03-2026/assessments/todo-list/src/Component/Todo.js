import { useState } from "react";
import "./Todo.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos(prev => [...prev, newTodo]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h1>Todo App</h1>

        {/* Input Section */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* List */}
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              
              <div className="left">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                <span className={todo.completed ? "completed" : ""}>
                  {todo.text}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTask(todo.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;