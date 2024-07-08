// src/components/investment/CreateInvestmentForm.tsx
import React, { useState } from 'react';

interface CreateInvestmentFormProps {
  addInvestment: (investment: any) => void;
}

const CreateInvestmentForm: React.FC<CreateInvestmentFormProps> = ({ addInvestment }) => {
  const [owner, setOwner] = useState('');
  const [date, setDate] = useState('');
  const [initialValue, setInitialValue] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialValue <= 0) {
      alert('O valor inicial deve ser positivo.');
      return;
    }
    const newInvestment = {
      owner,
      date,
      initialValue,
    };
    addInvestment(newInvestment);
    setOwner('');
    setDate('');
    setInitialValue(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Proprietário</label>
        <input
          type="text"
          id="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data de Criação</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="initialValue" className="block text-sm font-medium text-gray-700">Valor Inicial</label>
        <input
          type="number"
          id="initialValue"
          value={initialValue}
          onChange={(e) => setInitialValue(parseFloat(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Criar Investimento</button>
    </form>
  );
};

export default CreateInvestmentForm;
