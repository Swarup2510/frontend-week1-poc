import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodoRequest, deleteTodoRequest } from '../store/todos/slice'

function TodoList() {
  const todos = useSelector(state => state.todos.todos)
  const dispatch = useDispatch()

  if (!todos || todos.length === 0) {
    return <p className="empty-state">No items available</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((item, index) => (
        <TodoItem
          key={index}
          item={item}
          index={index}
          toggleTodo={() => dispatch(toggleTodoRequest(index))}
          deleteTodo={() => dispatch(deleteTodoRequest(index))}
        />
      ))}
    </ul>
  );
}

export default TodoList;
