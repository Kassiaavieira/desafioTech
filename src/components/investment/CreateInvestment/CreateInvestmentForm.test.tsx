import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateInvestmentForm from './CreateInvestmentForm';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('CreateInvestmentForm Component', () => {
  it('displays error message on invalid initial value', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    const { getByLabelText, getByText } = render(<CreateInvestmentForm addInvestment={() => {}} />);

    fireEvent.change(getByLabelText('Valor Inicial'), { target: { value: '-100' } });

    const initialValueInput = getByLabelText('Valor Inicial') as HTMLInputElement;
    expect(initialValueInput.value).toBe('-100');

    fireEvent.change(getByLabelText('Valor Inicial'), { target: { value: '1000' } });

    expect(initialValueInput.value).toBe('1000');
  });
});
