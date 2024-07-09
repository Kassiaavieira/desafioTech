import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../types';
import Button from '../ui/Button';
import { mockInvestments } from '@/src/mocks/investmentData';

const InvestmentDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const [totalTax, setTotalTax] = useState(0);

  useEffect(() => {
    if (typeof id === 'string') {
      const selectedInvestment = mockInvestments.find(inv => inv.id === id);
      if (selectedInvestment) {
        console.log("Selected Investment:", selectedInvestment);
        setInvestment(selectedInvestment);
        const calculatedBalance = selectedInvestment.initialValue * 1.0052;
        setExpectedBalance(calculatedBalance);

        let calculatedTax = 0;
        const currentDate = new Date();
        const investmentDate = new Date(selectedInvestment.date);
        const investmentAge =
          (currentDate.getTime() - investmentDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        if (investmentAge < 1) {
          calculatedTax = calculatedBalance * 0.225;
        } else if (investmentAge >= 1 && investmentAge <= 2) {
          calculatedTax = calculatedBalance * 0.185;
        } else {
          calculatedTax = calculatedBalance * 0.15;
        }
        setTotalTax(calculatedTax);
      } else {
        console.error("Investment not found with ID:", id);
      }
    } else {
      console.error("ID is not a string:", id);
    }
  }, [id]);

  const handleBackButtonClick = () => {
    router.push('/');
  };

  if (!investment) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <Button onClick={handleBackButtonClick} text="Voltar" />
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
