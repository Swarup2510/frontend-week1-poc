import { screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { renderWithRedux } from '../test-utils';

describe('TodoList', () => {
  it('renders empty state when no todos exist', () => {
    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos: [], loading: false },
      },
    });

    expect(screen.getByText('No items available')).toBeInTheDocument();
  });

  it('renders list of todos', () => {
    const todos = [
      { text: 'First Todo', completed: false },
      { text: 'Second Todo', completed: true },
      { text: 'Third Todo', completed: false },
    ];

    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
    expect(screen.getByText('Third Todo')).toBeInTheDocument();
  });

  it('renders correct number of todo items', () => {
    const todos = [
      { text: 'Todo 1', completed: false },
      { text: 'Todo 2', completed: false },
      { text: 'Todo 3', completed: false },
      { text: 'Todo 4', completed: false },
      { text: 'Todo 5', completed: false },
    ];

    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(5);
  });

  it('renders todos with correct completion status', () => {
    const todos = [
      { text: 'Incomplete Todo', completed: false },
      { text: 'Completed Todo', completed: true },
    ];

    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();
  });

  it('displays checkbox that can be clicked', () => {
    const todos = [{ text: 'Test Todo', completed: false }];

    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    // Component should still render after click
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('displays delete button that can be clicked', () => {
    const todos = [
      { text: 'First Todo', completed: false },
      { text: 'Second Todo', completed: false },
    ];

    renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button');
    expect(deleteButtons.length).toBeGreaterThan(0);
    fireEvent.click(deleteButtons[0]);

    // Component should still render after click
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });

  it('renders ul element when todos exist', () => {
    const todos = [{ text: 'Todo', completed: false }];

    const { container } = renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('renders li elements for each todo', () => {
    const todos = [
      { text: 'Todo 1', completed: false },
      { text: 'Todo 2', completed: false },
      { text: 'Todo 3', completed: false },
    ];

    const { container } = renderWithRedux(<TodoList />, {
      initialState: {
        todos: { todos, loading: false },
      },
    });

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });
});
