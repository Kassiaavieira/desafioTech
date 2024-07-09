import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InvestmentTable from './InvestmentTable';
import { Investment } from '../../../types';

describe('InvestmentTable Component', () => {
  const mockInvestments: Investment[] = [
    {
      id: '1', owner: 'John Doe', date: '2024-01-01', initialValue: 1000,
      withdrawals: []
    },
    {
      id: '2', owner: 'Jane Smith', date: '2024-02-01', initialValue: 2000,
      withdrawals: []
    },
  ];
  const mockHandleDetailsClick = jest.fn();

  beforeEach(() => {
    mockHandleDetailsClick.mockClear();
  });

  it('calls handleDetailsClick function correctly on button click', () => {
    render(<InvestmentTable investments={mockInvestments} handleDetailsClick={mockHandleDetailsClick} />);

    const detalhesButtons = screen.getAllByText('Detalhes');

    fireEvent.click(detalhesButtons[0]);

    expect(mockHandleDetailsClick).toHaveBeenCalledWith('1');
  });
});
