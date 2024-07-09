import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../types';
import Button from '../ui/Button';
import { mockInvestments } from '@/src/mocks/investmentData';
import { calculateExpectedBalance, calculateTotalTax } from '../../utils/calculations';

const InvestmentDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState<{ date: string, amount: number }[]>([]);

  useEffect(() => {
    if (typeof id === 'string') {
      const selectedInvestment = mockInvestments.find(inv => inv.id === id);
      if (selectedInvestment) {
        setInvestment(selectedInvestment);

        const investmentAgeInYears = getInvestmentAge(selectedInvestment.date);
        const calculatedBalance = calculateExpectedBalance(selectedInvestment.initialValue, 0.0052, investmentAgeInYears);
        setExpectedBalance(calculatedBalance);

        const mockWithdrawalHistory = [
          { date: '2023-05-15', amount: 500 },
          { date: '2023-12-20', amount: 1000 },
        ];
        setWithdrawalHistory(mockWithdrawalHistory);

        if (mockWithdrawalHistory.length > 0) {
          const totalWithdrawn = mockWithdrawalHistory.reduce((acc, withdrawal) => acc + withdrawal.amount, 0);
          const calculatedTax = calculateTotalTax(totalWithdrawn, investmentAgeInYears);
          setTotalTax(calculatedTax);
        }
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
      
      {withdrawalHistory.length > 0 && (
        <>
          <p><strong>Imposto de Retiradas:</strong> R$ {totalTax.toFixed(2)}</p>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Histórico de Retiradas</h3>
            <ul>
              {withdrawalHistory.map((withdrawal, index) => (
                <li key={index}>
                  <strong>Data:</strong> {withdrawal.date} - <strong>Valor:</strong> R$ {withdrawal.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

    </div>
  );
};

function getInvestmentAge(investmentDate: string): number {
  const currentDate = new Date();
  const dateDifference = currentDate.getTime() - new Date(investmentDate).getTime();
  return dateDifference / (1000 * 60 * 60 * 24 * 365);
}

export default InvestmentDetails;
