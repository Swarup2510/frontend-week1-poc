import todosReducer, {
  loadTodosSuccess,
  addTodoSuccess,
  toggleTodoSuccess,
  deleteTodoSuccess,
} from '../store/todos/slice';

describe('Todos Reducer', () => {
  const initialState = { todos: [], loading: false };

  it('returns initial state', () => {
    const state = todosReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  describe('loadTodosSuccess', () => {
    it('loads todos and sets loading to false', () => {
      const todos = [
        { text: 'Todo 1', completed: false },
        { text: 'Todo 2', completed: true },
      ];

      const state = todosReducer(initialState, loadTodosSuccess(todos));

      expect(state.todos).toEqual(todos);
      expect(state.loading).toBe(false);
    });

    it('replaces existing todos with new ones', () => {
      const existingState = {
        todos: [{ text: 'Old Todo', completed: false }],
        loading: true,
      };

      const newTodos = [
        { text: 'New Todo 1', completed: false },
        { text: 'New Todo 2', completed: false },
      ];

      const state = todosReducer(existingState, loadTodosSuccess(newTodos));

      expect(state.todos).toEqual(newTodos);
      expect(state.loading).toBe(false);
    });
  });

  describe('addTodoSuccess', () => {
    it('adds a new todo to the list', () => {
      const newTodo = { text: 'New Todo', completed: false };

      const state = todosReducer(initialState, addTodoSuccess(newTodo));

      expect(state.todos).toHaveLength(1);
      expect(state.todos[0]).toEqual(newTodo);
    });

    it('preserves existing todos when adding new one', () => {
      const existingState = {
        todos: [{ text: 'Existing Todo', completed: false }],
        loading: false,
      };

      const newTodo = { text: 'New Todo', completed: false };

      const state = todosReducer(existingState, addTodoSuccess(newTodo));

      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].text).toBe('Existing Todo');
      expect(state.todos[1].text).toBe('New Todo');
    });

    it('adds todo with completed status false', () => {
      const newTodo = { text: 'New Todo', completed: false };

      const state = todosReducer(initialState, addTodoSuccess(newTodo));

      expect(state.todos[0].completed).toBe(false);
    });
  });

  describe('toggleTodoSuccess', () => {
    it('toggles todo completed status from false to true', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: false },
          { text: 'Todo 2', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, toggleTodoSuccess(0));

      expect(state.todos[0].completed).toBe(true);
      expect(state.todos[1].completed).toBe(false);
    });

    it('toggles todo completed status from true to false', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: true },
          { text: 'Todo 2', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, toggleTodoSuccess(0));

      expect(state.todos[0].completed).toBe(false);
      expect(state.todos[1].completed).toBe(false);
    });

    it('toggles correct todo by index', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: false },
          { text: 'Todo 2', completed: false },
          { text: 'Todo 3', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, toggleTodoSuccess(1));

      expect(state.todos[0].completed).toBe(false);
      expect(state.todos[1].completed).toBe(true);
      expect(state.todos[2].completed).toBe(false);
    });

    it('does not affect other todo properties when toggling', () => {
      const existingState = {
        todos: [{ text: 'Todo 1', completed: false, id: 123 }],
        loading: false,
      };

      const state = todosReducer(existingState, toggleTodoSuccess(0));

      expect(state.todos[0].text).toBe('Todo 1');
      expect(state.todos[0].id).toBe(123);
      expect(state.todos[0].completed).toBe(true);
    });

    it('handles toggle on non-existent index gracefully', () => {
      const existingState = {
        todos: [{ text: 'Todo 1', completed: false }],
        loading: false,
      };

      const state = todosReducer(existingState, toggleTodoSuccess(99));

      // Should not crash and todos should remain unchanged
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].completed).toBe(false);
    });
  });

  describe('deleteTodoSuccess', () => {
    it('deletes todo at specified index', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: false },
          { text: 'Todo 2', completed: false },
          { text: 'Todo 3', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, deleteTodoSuccess(1));

      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].text).toBe('Todo 1');
      expect(state.todos[1].text).toBe('Todo 3');
    });

    it('deletes first todo in list', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: false },
          { text: 'Todo 2', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, deleteTodoSuccess(0));

      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('Todo 2');
    });

    it('deletes last todo in list', () => {
      const existingState = {
        todos: [
          { text: 'Todo 1', completed: false },
          { text: 'Todo 2', completed: false },
          { text: 'Todo 3', completed: false },
        ],
        loading: false,
      };

      const state = todosReducer(existingState, deleteTodoSuccess(2));

      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].text).toBe('Todo 1');
      expect(state.todos[1].text).toBe('Todo 2');
    });

    it('deletes only todo from list', () => {
      const existingState = {
        todos: [{ text: 'Todo 1', completed: false }],
        loading: false,
      };

      const state = todosReducer(existingState, deleteTodoSuccess(0));

      expect(state.todos).toHaveLength(0);
    });
  });

  describe('multiple actions', () => {
    it('adds multiple todos sequentially', () => {
      let state = initialState;

      state = todosReducer(state, addTodoSuccess({ text: 'Todo 1', completed: false }));
      state = todosReducer(state, addTodoSuccess({ text: 'Todo 2', completed: false }));
      state = todosReducer(state, addTodoSuccess({ text: 'Todo 3', completed: false }));

      expect(state.todos).toHaveLength(3);
      expect(state.todos[0].text).toBe('Todo 1');
      expect(state.todos[1].text).toBe('Todo 2');
      expect(state.todos[2].text).toBe('Todo 3');
    });

    it('adds, toggles, and deletes todos', () => {
      let state = initialState;

      state = todosReducer(state, addTodoSuccess({ text: 'Todo 1', completed: false }));
      state = todosReducer(state, addTodoSuccess({ text: 'Todo 2', completed: false }));
      state = todosReducer(state, addTodoSuccess({ text: 'Todo 3', completed: false }));

      state = todosReducer(state, toggleTodoSuccess(0));
      expect(state.todos[0].completed).toBe(true);

      state = todosReducer(state, deleteTodoSuccess(1));
      expect(state.todos).toHaveLength(2);
      expect(state.todos[0].text).toBe('Todo 1');
      expect(state.todos[1].text).toBe('Todo 3');
    });
  });
});
