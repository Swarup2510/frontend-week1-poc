import { useEffect } from "react";
import "../index.css";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useDispatch } from 'react-redux'
import { loadTodosRequest } from '../store/todos/slice'

function Todo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosRequest())
  }, [dispatch]);

  return (
    <div className="todo-app">
      <h2>My Todo App</h2>

      <TodoInput />

      <TodoList />
    </div>
  );
}

export default Todo;
