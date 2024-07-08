import { Investment } from '../types';

export const mockInvestments: Investment[] = [
  {
    id: '1',
    owner: 'John Doe',
    date: '2023-01-01',
    initialValue: 1000,
    withdrawals: [],
  },
  {
    id: '2',
    owner: 'Jane Smith',
    date: '2022-06-15',
    initialValue: 2000,
    withdrawals: [],
  },
];
