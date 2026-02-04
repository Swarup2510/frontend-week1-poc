import { createSlice, createAction } from '@reduxjs/toolkit'

export const loadTodosRequest = createAction('todos/loadTodosRequest')
export const addTodoRequest = createAction('todos/addTodoRequest')
export const toggleTodoRequest = createAction('todos/toggleTodoRequest')
export const deleteTodoRequest = createAction('todos/deleteTodoRequest')
export const persistTodos = createAction('todos/persistTodos')

const todosSlice = createSlice({
  name: 'todos',
  initialState: { todos: [], loading: false },
  reducers: {
    loadTodosSuccess(state, action) {
      state.loading = false
      state.todos = action.payload
    },
    addTodoSuccess(state, action) {
      state.todos.push(action.payload)
    },
    toggleTodoSuccess(state, action) {
      const idx = action.payload
      if (state.todos[idx]) state.todos[idx].completed = !state.todos[idx].completed
    },
    deleteTodoSuccess(state, action) {
      state.todos.splice(action.payload, 1)
    },
  },
})

export const { loadTodosSuccess, addTodoSuccess, toggleTodoSuccess, deleteTodoSuccess } = todosSlice.actions

export default todosSlice.reducer
