import { useEffect } from "react";
import "./index.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useDispatch } from 'react-redux'
import { loadTodosRequest } from './store/todos/slice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosRequest())
  }, [dispatch]);

  return (
    <div className="app">
      <h1>My Todo App</h1>

      <TodoInput />

      <TodoList />
    </div>
  );
}

export default App;
