import { takeEvery, put, call, select, delay } from 'redux-saga/effects'
import {
  loadTodosRequest,
  addTodoRequest,
  toggleTodoRequest,
  deleteTodoRequest,
  persistTodos,
  loadTodosSuccess,
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
} from './slice'

function* loadTodosSaga() {
  yield delay(100)
  const saved = yield call([localStorage, 'getItem'], 'todos')
  const todos = saved ? JSON.parse(saved) : []
  yield put(loadTodosSuccess(todos))
}

function* addTodoSaga(action) {
  const todo = { text: action.payload, completed: false }
  yield put(addTodoSuccess(todo))
  yield put(persistTodos())
}

function* toggleTodoSaga(action) {
  yield put(toggleTodoSuccess(action.payload))
  yield put(persistTodos())
}

function* deleteTodoSaga(action) {
  yield put(deleteTodoSuccess(action.payload))
  yield put(persistTodos())
}

function* persistTodosSaga() {
  const todos = yield select((state) => state.todos.todos)
  yield call([localStorage, 'setItem'], 'todos', JSON.stringify(todos))
}

export default function* todosSaga() {
  yield takeEvery(loadTodosRequest.type, loadTodosSaga)
  yield takeEvery(addTodoRequest.type, addTodoSaga)
  yield takeEvery(toggleTodoRequest.type, toggleTodoSaga)
  yield takeEvery(deleteTodoRequest.type, deleteTodoSaga)
  yield takeEvery(persistTodos.type, persistTodosSaga)
}
