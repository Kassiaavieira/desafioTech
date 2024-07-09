import React, { useMemo } from 'react';
import Link from 'next/link';
import InvestmentList from '../components/investment/InvestmentList';
import { mockInvestments } from '../mocks/investmentData';

const HomePage: React.FC = () => {
  const memoizedInvestments = useMemo(() => mockInvestments, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Investimentos</h1>
      <Link href="/investments/create">
        <button className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
          Criar Novo Investimento
        </button>
      </Link>
      <InvestmentList investments={memoizedInvestments} />
    </div>
  );
};

export default HomePage;
