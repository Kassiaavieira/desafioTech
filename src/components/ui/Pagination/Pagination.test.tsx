import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination Component', () => {
  const mockPaginate = jest.fn();

  beforeEach(() => {
    mockPaginate.mockClear();
  });

  it('renders pagination buttons correctly', () => {
    render(<Pagination currentPage={1} totalPages={5} paginate={mockPaginate} />);

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls paginate function correctly on button click', () => {
    render(<Pagination currentPage={1} totalPages={5} paginate={mockPaginate} />);

    fireEvent.click(screen.getByText('1'));
    expect(mockPaginate).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Anterior'));
    expect(mockPaginate).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('Próxima'));
    expect(mockPaginate).toHaveBeenCalledWith(2);
  });

  it('disables previous and next buttons correctly at boundaries', () => {
    render(<Pagination currentPage={1} totalPages={1} paginate={mockPaginate} />);

    const previousButton = screen.getByText('Anterior') as HTMLButtonElement;
    const nextButton = screen.getByText('Próxima') as HTMLButtonElement;

    expect(previousButton.disabled).toBe(true);
    expect(nextButton.disabled).toBe(true);
  });
});
