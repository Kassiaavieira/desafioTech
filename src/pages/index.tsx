// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import InvestmentList from '../components/investment/InvestmentList';
import { mockInvestments } from '../mocks/investmentData';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Investimentos</h1>
      <Link href="/investments/create">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
          Criar Novo Investimento
        </button>
      </Link>
      <InvestmentList investments={mockInvestments} />
    </div>
  );
};

export default HomePage;
