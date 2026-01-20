function TodoInput({ todo, setTodo, addTodo }) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter a todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
    </>
  );
}

export default TodoInput;
