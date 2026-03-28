// src/components/TodoStats.js
import React from 'react';

function TodoStats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  
  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#e9ecef',
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>📊 Statistics</h3>
      <p>Total Tasks: {total}</p>
      <p>✅ Completed: {completed}</p>
      <p>⏳ Pending: {pending}</p>
      {total > 0 && (
        <progress value={completed} max={total} style={{ width: '100%' }} />
      )}
    </div>
  );
}

export default TodoStats;