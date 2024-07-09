import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders button correctly with provided text', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick} text="Click Me" />);

    const buttonElement = screen.getByText('Click Me') as HTMLButtonElement;
    expect(buttonElement).toBeTruthy();

    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
