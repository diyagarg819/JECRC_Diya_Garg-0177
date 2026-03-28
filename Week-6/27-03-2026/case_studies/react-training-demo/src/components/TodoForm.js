import React, {useState} from "react";

function TodoForm({ onAddTodo }) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAddTodo(inputValue);
            setInputValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a new todo..."
                style={{
                    padding: '10px',
                    width: '300px',
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            <button type="submit" style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                Add Todo
            </button>

        </form>
    );
}

export default TodoForm;