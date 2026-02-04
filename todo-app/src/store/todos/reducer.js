import * as types from './types';

const initialState = {
  todos: [],
  loading: false,
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_TODOS_REQUEST:
      return { ...state, loading: true };
    case types.LOAD_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload };

    case types.ADD_TODO_SUCCESS:
      return { ...state, todos: [...state.todos, action.payload] };

    case types.TOGGLE_TODO_SUCCESS: {
      const newTodos = state.todos.map((t, i) =>
        i === action.payload ? { ...t, completed: !t.completed } : t
      );
      return { ...state, todos: newTodos };
    }

    case types.DELETE_TODO_SUCCESS:
      return { ...state, todos: state.todos.filter((_, i) => i !== action.payload) };

    default:
      return state;
  }
}
