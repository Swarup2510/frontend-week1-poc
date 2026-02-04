function TodoItem({ item, index, toggleTodo, deleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={toggleTodo}
      />

      <span
        style={{
          textDecoration: item.completed ? "line-through" : "none",
          color: item.completed ? "#888" : "#000",
        }}
      >
        {item.text}
      </span>

      <button onClick={deleteTodo}>❌</button>
    </li>
  );
}

export default TodoItem;
