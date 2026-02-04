import * as types from './types';

export const loadTodos = () => ({ type: types.LOAD_TODOS_REQUEST });
export const loadTodosSuccess = (todos) => ({ type: types.LOAD_TODOS_SUCCESS, payload: todos });

export const addTodo = (text) => ({ type: types.ADD_TODO_REQUEST, payload: text });
export const addTodoSuccess = (todo) => ({ type: types.ADD_TODO_SUCCESS, payload: todo });

export const toggleTodo = (index) => ({ type: types.TOGGLE_TODO_REQUEST, payload: index });
export const toggleTodoSuccess = (index) => ({ type: types.TOGGLE_TODO_SUCCESS, payload: index });

export const deleteTodo = (index) => ({ type: types.DELETE_TODO_REQUEST, payload: index });
export const deleteTodoSuccess = (index) => ({ type: types.DELETE_TODO_SUCCESS, payload: index });

export const persistTodos = () => ({ type: types.PERSIST_TODOS });
