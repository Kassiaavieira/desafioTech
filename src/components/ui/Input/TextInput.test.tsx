// TextInput.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('calls onChange function on input change', () => {
    render(
      <TextInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={mockOnChange}
      />
    );

    const inputElement = document.querySelector('input');
    fireEvent.change(inputElement!, { target: { value: 'Test' } });

    expect(mockOnChange).toHaveBeenCalledWith('Test');
  });

  it('displays error message when error prop is provided', () => {
    render(
      <TextInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={mockOnChange}
        error="Invalid input"
      />
    );

    const errorElement = document.querySelector('.text-red-500');
    expect(errorElement?.textContent).toBe('Invalid input');
  });
});
