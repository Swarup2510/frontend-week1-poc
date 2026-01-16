import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Todo App Loaded");

    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { text: todo, completed: false }]);
    setTodo("");
  };

  return (
    <div className="app">
      <h1>My Todo App</h1>

      {/* Input Section */}
      <input
        type="text"
        placeholder="Enter a todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>

      {/* Todo List */}
      {todos.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {todos.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  const newTodos = [...todos];
                  newTodos[index].completed = !newTodos[index].completed;
                  setTodos(newTodos);
                }}
              />

              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                  color: item.completed ? "#888" : "#000",
                }}
              >
                {item.text}
              </span>

              <button
                onClick={() =>
                  setTodos(todos.filter((_, i) => i !== index))
                }
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
