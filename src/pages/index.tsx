// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import InvestmentList from '../components/investment/InvestmentList';
import { Investment } from '../types';

const investmentsMock: Investment[] = [
  {
    owner: 'João', date: '2024-07-10', initialValue: 10000,
    id: '',
    withdrawals: []
  },
  {
    owner: 'Maria', date: '2024-06-28', initialValue: 15000,
    id: '',
    withdrawals: []
  },
  {
    owner: 'Pedro', date: '2024-06-15', initialValue: 20000,
    id: '',
    withdrawals: []
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Investimentos</h1>
      <Link href="/investments/create">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">Criar Novo Investimento</button>
      </Link>
      <InvestmentList investments={investmentsMock} />
    </div>
  );
};

export default HomePage;
