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

    const detailsContainer = container.querySelector('.bg-gradient-to-br');
    const ownerElement = detailsContainer?.querySelector('p:nth-of-type(2)');
    const creationDateElement = detailsContainer?.querySelector('p:nth-of-type(3)');
    const initialValueElement = container.querySelector('.flex div p:nth-of-type(2)');

    expect(ownerElement?.textContent).toContain('Proprietário: John Doe');
    expect(creationDateElement?.textContent).toContain('Data de Criação: 2023-01-01');

    const initialValueText = initialValueElement?.textContent || '';
    const numericValueRegex = /R\$ (\d+(\.\d{2})?)/;
    const match = initialValueText.match(numericValueRegex);
    const numericValue = match ? match[1] : '';

    expect(numericValue).toEqual('1000');
  });
});
