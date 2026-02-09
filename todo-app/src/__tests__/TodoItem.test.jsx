import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

describe('TodoItem', () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders todo item with text', () => {
    const todo = { text: 'Test Todo', completed: false };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('displays checkbox in unchecked state for incomplete todo', () => {
    const todo = { text: 'Incomplete Todo', completed: false };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('displays checkbox in checked state for completed todo', () => {
    const todo = { text: 'Completed Todo', completed: true };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('applies strikethrough style when todo is completed', () => {
    const todo = { text: 'Completed Todo', completed: true };
    const { container } = render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const span = container.querySelector('span');
    expect(span).toHaveStyle('textDecoration: line-through');
  });

  it('calls toggleTodo when checkbox is clicked', () => {
    const todo = { text: 'Test Todo', completed: false };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledTimes(1);
  });

  it('calls deleteTodo when delete button is clicked', () => {
    const todo = { text: 'Test Todo', completed: false };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /❌/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
  });

  it('renders delete button with correct symbol', () => {
    const todo = { text: 'Test Todo', completed: false };
    render(
      <TodoItem
        item={todo}
        index={0}
        toggleTodo={mockToggleTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    expect(screen.getByText('❌')).toBeInTheDocument();
  });
});
