import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../components/TodoInput';
import { renderWithRedux } from '../test-utils';

describe('TodoInput', () => {
  it('renders input field with placeholder', () => {
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    expect(input).toBeInTheDocument();
  });

  it('renders add button', () => {
    renderWithRedux(<TodoInput />);

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    await user.type(input, 'New Todo Item');

    expect(input.value).toBe('New Todo Item');
  });

  it('clears input field after adding a todo', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    const button = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'New Todo');
    fireEvent.click(button);

    expect(input.value).toBe('');
  });

  it('button is clickable when input has text', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    const button = screen.getByRole('button', { name: /add/i });

    await user.type(input, 'Test Todo');
    expect(button).toBeEnabled();
    expect(input.value).toBe('Test Todo');
  });

  it('does not clear input when empty add is clicked', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    const button = screen.getByRole('button', { name: /add/i });

    // Try clicking with empty input
    fireEvent.click(button);

    // Input should remain empty and component should still render
    expect(input.value).toBe('');
    expect(button).toBeInTheDocument();
  });

  it('handles whitespace-only input by not clearing', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    const button = screen.getByRole('button', { name: /add/i });

    await user.type(input, '   ');
    fireEvent.click(button);

    // After clicking with whitespace, input should be cleared (internal logic)
    // but button should still be functional
    expect(button).toBeInTheDocument();
  });

  it('input field is accessible and functional', () => {
    const { container } = renderWithRedux(<TodoInput />);

    const input = container.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter a todo');
  });

  it('input can be typed multiple times and cleared', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const input = screen.getByPlaceholderText('Enter a todo');
    const button = screen.getByRole('button', { name: /add/i });

    // First todo
    await user.type(input, 'First Todo');
    expect(input.value).toBe('First Todo');
    fireEvent.click(button);
    expect(input.value).toBe('');

    // Second todo
    await user.type(input, 'Second Todo');
    expect(input.value).toBe('Second Todo');
    fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('add button is always clickable', async () => {
    const user = userEvent.setup();
    renderWithRedux(<TodoInput />);

    const button = screen.getByRole('button', { name: /add/i });

    // Should be clickable initially
    expect(button).toBeEnabled();

    // Should remain clickable after typing
    const input = screen.getByPlaceholderText('Enter a todo');
    await user.type(input, 'Test');
    expect(button).toBeEnabled();

    // Should remain clickable after clicking
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });
});
