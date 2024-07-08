// src/pages/investments/details.tsx
import React from 'react';
import InvestmentDetails from '../../components/investment/InvestmentDetails';
import { Investment } from '../../types';
import { mockInvestments } from '@/src/mocks/investmentData';

const InvestmentDetailsPage: React.FC = () => {
  const selectedInvestment: Investment = mockInvestments[0];

  return (
    <div className="container mx-auto p-4">
      <InvestmentDetails investment={selectedInvestment} />
    </div>
  );
};

export default InvestmentDetailsPage;
