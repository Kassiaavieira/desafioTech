// src/components/investment/InvestmentDetails.tsx
import React, { useState, useEffect } from 'react';
import { Investment } from '../../types';

interface InvestmentDetailsProps {
  investment: Investment;
}

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ investment }) => {
  const [expectedBalance, setExpectedBalance] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    if (investment) {
      const calculatedBalance = investment.initialValue * 1.0052;
      setExpectedBalance(calculatedBalance);

      let calculatedTax = 0;
      const currentDate = new Date();
      const investmentDate = new Date(investment.date);
      const investmentAge = (currentDate.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 365); // Idade do investimento em anos
      if (investmentAge < 1) {
        calculatedTax = calculatedBalance * 0.225;
      } else if (investmentAge >= 1 && investmentAge <= 2) {
        calculatedTax = calculatedBalance * 0.185;
      } else {
        calculatedTax = calculatedBalance * 0.15;
      }
      setTotalTax(calculatedTax);
    }
  }, [investment]);

  if (!investment) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Detalhes do Investimento</h2>
      <p><strong>Proprietário:</strong> {investment.owner}</p>
      <p><strong>Data de Criação:</strong> {investment.date}</p>
      <p><strong>Valor Inicial:</strong> R$ {investment.initialValue}</p>
      <p><strong>Saldo Esperado:</strong> R$ {expectedBalance.toFixed(2)}</p>
      <p><strong>Imposto Total:</strong> R$ {totalTax.toFixed(2)}</p>
    </div>
  );
};

export default InvestmentDetails;
