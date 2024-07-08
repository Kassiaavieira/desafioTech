// src/pages/investments/create.tsx
import React, { useState } from 'react';
import CreateInvestmentForm from '../../components/investment/CreateInvestmentForm';

interface Investment {
  owner: string;
  date: string;
  initialValue: number;
}

const CreateInvestmentPage: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);

  const addInvestment = (investment: Investment) => {
    console.log('Novo investimento:', investment);

    setInvestments([...investments, investment]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Investimento</h1>
      <CreateInvestmentForm addInvestment={addInvestment} />
      {investments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Investimentos Adicionados:</h2>
          <ul className="list-disc pl-4">
            {investments.map((inv, index) => (
              <li key={index}>
                Proprietário: {inv.owner}, Data: {inv.date}, Valor Inicial: {inv.initialValue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateInvestmentPage;
