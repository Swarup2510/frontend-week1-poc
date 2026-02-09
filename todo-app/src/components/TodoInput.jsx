import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/todos/slice'

function TodoInput() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleAdd = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (value.trim() === '') return
    dispatch(addTodoRequest(value.trim()))
    setValue('')
  }

  return (
    <form className="todo-input" onSubmit={handleAdd} aria-label="Add todo">
      <label className="visually-hidden" htmlFor="todo-input">Add todo</label>
      <input
        id="todo-input"
        type="text"
        aria-label="Todo text"
        placeholder="Enter a todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn-add" aria-label="Add todo button">Add</button>
    </form>
  )
}

export default TodoInput;
