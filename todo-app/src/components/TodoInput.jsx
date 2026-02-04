import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/todos/slice'

function TodoInput() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleAdd = () => {
    if (value.trim() === '') return
    dispatch(addTodoRequest(value.trim()))
    setValue('')
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter a todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </>
  )
}

export default TodoInput;
