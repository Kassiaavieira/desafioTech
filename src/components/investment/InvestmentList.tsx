// src/components/investment/InvestmentList.tsx
import React from 'react';
import { Investment } from '../../types';

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments }) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Lista de Investimentos</h2>
      {investments.length === 0 ? (
        <p>Nenhum investimento encontrado.</p>
      ) : (
        <ul className="list-disc pl-4">
          {investments.map((inv, index) => (
            <li key={index} className="mb-2">
              <strong>Proprietário:</strong> {inv.owner} | <strong>Data:</strong> {inv.date} | <strong>Valor Inicial:</strong> R$ {inv.initialValue}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InvestmentList;
