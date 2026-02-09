import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './store/todos/slice';

/**
 * Create a mock Redux store for testing
 * @param {Object} initialState - Optional initial state
 * @returns {Object} Redux store configured with test reducers
 */
export function createMockStore(initialState = {}) {
  const preloadedState = {
    todos: {
      todos: [],
      loading: false,
      ...initialState.todos,
    },
    ...initialState,
  };

  return configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState,
  });
}

/**
 * Render a component with Redux Provider
 */
export function renderWithRedux(ui, { initialState = {}, store = null, ...renderOptions } = {}) {
  const { render } = require('@testing-library/react');
  const { Provider } = require('react-redux');

  const testStore = store || createMockStore(initialState);

  function Wrapper({ children }) {
    return <Provider store={testStore}>{children}</Provider>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store: testStore,
  };
}
