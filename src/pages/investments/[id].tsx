import React from 'react';
import InvestmentDetails from '../../components/investment/InvestimentDetails/InvestmentDetails';

const InvestmentDetailsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-customGreen-light">
      <div className="container mx-auto p-4">
        <InvestmentDetails />
      </div>
    </div>
  );
};

export default InvestmentDetailsPage;
