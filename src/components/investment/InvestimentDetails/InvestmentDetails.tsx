import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../../types';
import Button from '../../ui/Button/Button';
import { mockInvestments } from '../../../mocks/investmentData';
import { calculateExpectedBalance, calculateTotalTax } from '../../../utils/calculations';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

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
            backgroundColor: '#13da87',
            borderColor: '#63ff92',
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
      <h2 className="text-4xl font-bold mb-4 text-center">Detalhes do Investimento</h2>
      <div className="bg-gradient-to-br from-green-50 to-green-50 p-4 mb-4 mt-6 rounded-md">
        <p className="text-lg font-semibold mb-2"><strong>Detalhes do Investimento</strong></p>
        <p className="mb-2"><strong>Proprietário:</strong> {investment.owner}</p>
        <p className="mb-2"><strong>Data de Criação:</strong> {investment.date}</p>
      </div>

      <div className="flex justify-center space-x-20">
        <div className="bg-gradient-to-br from-green-200 to-green-300 border-l-4 border-green-500 text-black p-4 mb-4 rounded-md w-64 px-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="w-6 h-6 mr-2" />
          </div>
          <p className="text-xl font-bold">Valor Inicial:</p>
          <p className="text-2xl font-semibold">R$ {investment.initialValue}</p>
        </div>

        <div className="bg-gradient-to-br from-green-300 to-green-400 border-l-4 border-green-600 text-black p-4 mb-4 rounded-md w-64 px-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="w-6 h-6 mr-2" />
          </div>
          <p className="text-xl font-bold">Saldo Esperado:</p>
          <p className="text-2xl font-semibold">R$ {expectedBalance.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-400 to-green-500 border-l-4 border-green-700 text-black p-4 mb-4 rounded-md w-64 px-4">
          <div className="flex items-center mb-2">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="w-6 h-6 mr-2" />
          </div>
          <p className="text-xl font-bold">Imposto de Retiradas:</p>
          <p className="text-2xl font-semibold">R$ {totalTax.toFixed(2)}</p>
        </div>
      </div>

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
    </div>
  );
};

function getInvestmentAge(investmentDate: string): number {
  const currentDate = new Date();
  const dateDifference = currentDate.getTime() - new Date(investmentDate).getTime();
  return dateDifference / (1000 * 60 * 60 * 24 * 365);
}

export default InvestmentDetails;
