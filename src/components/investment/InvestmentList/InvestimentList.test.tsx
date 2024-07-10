import React from 'react';
import { render } from '@testing-library/react';
import InvestmentList from './InvestmentList';
import { Investment } from '../../../types';

jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/investments',
    pathname: '/investments',
    query: {},
    asPath: '',
  }),
}));

describe('InvestmentList component', () => {
  test('renders investment list correctly', () => {
    const investments: Investment[] = [
      { id: '1', owner: 'John Doe', date: '2023-01-01', initialValue: 1000, withdrawals: [] },
      { id: '2', owner: 'Jane Smith', date: '2023-02-01', initialValue: 1500, withdrawals: [200] },
    ];

    render(<InvestmentList investments={investments} />);

    const investmentListElement = document.querySelector('.your-investment-list-class');

    expect(investmentListElement).toBeDefined;
  });
});
