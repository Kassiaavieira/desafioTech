import React, { useMemo } from 'react';
import Link from 'next/link';
import InvestmentList from '../components/investment/InvestmentList/InvestmentList';
import { mockInvestments } from '../mocks/investmentData';

const HomePage: React.FC = () => {
  const memoizedInvestments = useMemo(() => mockInvestments, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-customGreen-light">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-10">Gerenciamento de Investimentos</h1>
        <Link href="/investments/create">
          <button className="mb-4 px-4 py-2 bg-customGreen text-white rounded-md">
            Criar Novo Investimento
          </button>
        </Link>
        <InvestmentList investments={memoizedInvestments} />
      </div>
    </div>
  );
};

export default HomePage;
