import React from 'react';
import { render } from '@testing-library/react';
import InvestmentDetails from './InvestmentDetails';

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: '1' },
  }),
}));

jest.mock('../../../mocks/investmentData', () => ({
  mockInvestments: [
    {
      id: '1',
      owner: 'John Doe',
      date: '2023-01-01',
      initialValue: 1000,
    },
  ],
}));

describe('InvestmentDetails Component', () => {
  it('renders investment details correctly', () => {
    const { container } = render(<InvestmentDetails />);

    const ownerElement = container.querySelector('p')?.textContent;
    const creationDateElement = container.querySelectorAll('p')[1]?.textContent;
    const initialValueElement = container.querySelectorAll('p')[2]?.textContent;

    expect(ownerElement).toContain('Proprietário: John Doe');
    expect(creationDateElement).toContain('Data de Criação: 2023-01-01');
    expect(initialValueElement).toContain('Valor Inicial: R$ 1000');
  });
});
