import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../types';
import Button from '../ui/Button/Button';
import { mockInvestments } from '@/src/mocks/investmentData';
import { calculateExpectedBalance, calculateTotalTax } from '../../utils/calculations';
import Chart from 'chart.js/auto';

const InvestmentDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [expectedBalance, setExpectedBalance] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState<{ date: string, amount: number }[]>([]);
  const expectedBalanceChartRef = useRef<HTMLCanvasElement | null>(null);
  const withdrawalHistoryChartRef = useRef<HTMLCanvasElement | null>(null);
  const expectedBalanceChartInstance = useRef<Chart<'line'> | null>(null);
  const withdrawalHistoryChartInstance = useRef<Chart<'bar'> | null>(null);

  const investmentAgeInYears = useMemo(() => {
    if (investment) {
      return getInvestmentAge(investment.date);
    }
    return 0;
  }, [investment]);

  useEffect(() => {
    if (typeof id === 'string') {
      const selectedInvestment = mockInvestments.find(inv => inv.id === id);
      if (selectedInvestment) {
        setInvestment(selectedInvestment);

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
  }, [id, investmentAgeInYears]);

  useEffect(() => {
    if (investment) {
      renderExpectedBalanceChart(expectedBalance);
      renderWithdrawalHistoryChart(withdrawalHistory);
    }
  }, [investment, expectedBalance, withdrawalHistory]);

  const handleBackButtonClick = () => {
    router.push('/');
  };

  const renderExpectedBalanceChart = (balance: number) => {
    if (expectedBalanceChartRef.current && balance !== 0) {
      if (expectedBalanceChartInstance.current) {
        expectedBalanceChartInstance.current.destroy();
      }
      expectedBalanceChartInstance.current = new Chart(expectedBalanceChartRef.current, {
        type: 'line',
        data: {
          labels: ['Hoje', 'Daqui a 1 ano', 'Daqui a 2 anos', 'Daqui a 3 anos', 'Daqui a 4 anos', 'Daqui a 5 anos'],
          datasets: [{
            label: 'Saldo Esperado',
            data: [balance, balance * 1.1, balance * 1.2, balance * 1.3, balance * 1.4, balance * 1.5],
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valor (R$)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Tempo'
              }
            }
          }
        }
      });
    }
  };

  const renderWithdrawalHistoryChart = (history: { date: string, amount: number }[]) => {
    if (withdrawalHistoryChartRef.current && history.length > 0) {
      if (withdrawalHistoryChartInstance.current) {
        withdrawalHistoryChartInstance.current.destroy();
      }
      withdrawalHistoryChartInstance.current = new Chart(withdrawalHistoryChartRef.current, {
        type: 'bar',
        data: {
          labels: history.map(item => item.date),
          datasets: [{
            label: 'Retiradas',
            data: history.map(item => item.amount),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valor (R$)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Data'
              }
            }
          }
        }
      });
    }
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <h3 className="text-lg font-bold mb-2">Gráfico de Saldo Esperado</h3>
          <canvas id="expectedBalanceChart" ref={expectedBalanceChartRef} width={300} height={200}></canvas>
        </div>

        {withdrawalHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-bold mb-2">Histórico de Retiradas</h3>
            <canvas id="withdrawalHistoryChart" ref={withdrawalHistoryChartRef} width={300} height={200}></canvas>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p><strong>Saldo Esperado:</strong> R$ {expectedBalance.toFixed(2)}</p>
        {withdrawalHistory.length > 0 && (
          <p><strong>Imposto de Retiradas:</strong> R$ {totalTax.toFixed(2)}</p>
        )}
      </div>

    </div>
  );
};

function getInvestmentAge(investmentDate: string): number {
  const currentDate = new Date();
  const dateDifference = currentDate.getTime() - new Date(investmentDate).getTime();
  return dateDifference / (1000 * 60 * 60 * 24 * 365);
}

export default InvestmentDetails;
