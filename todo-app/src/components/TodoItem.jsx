function TodoItem({ item, index, toggleTodo, deleteTodo }) {
  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          id={`todo-${index}`}
          type="checkbox"
          checked={item.completed}
          onChange={toggleTodo}
          aria-label={item.completed ? `Mark '${item.text}' as active` : `Mark '${item.text}' as completed`}
        />
        <label htmlFor={`todo-${index}`} className={`todo-text ${item.completed ? 'completed' : ''}`}>
          <span style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#6b7280' : '#0f172a' }}>
            {item.text}
          </span>
        </label>
      </div>

      <div className="todo-actions">
        <button className="btn-delete" onClick={deleteTodo} aria-label={`❌ Delete todo '${item.text}'`}>
          <span aria-hidden>❌</span>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
