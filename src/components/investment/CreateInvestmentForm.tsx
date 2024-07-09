import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TextInput from '../ui/Input/TextInput';

interface CreateInvestmentFormProps {
  addInvestment: (investment: any) => void;
}

const CreateInvestmentForm: React.FC<CreateInvestmentFormProps> = ({ addInvestment }) => {
  const router = useRouter();
  const [owner, setOwner] = useState('');
  const [date, setDate] = useState('');
  const [initialValue, setInitialValue] = useState('');
  const [initialValueError, setInitialValueError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedInitialValue = parseFloat(initialValue);

    if (parsedInitialValue <= 0 || isNaN(parsedInitialValue)) {
      setInitialValueError('O valor inicial deve ser positivo.');
      return;
    } else {
      setInitialValueError(null);
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (date > currentDate) {
      alert('A data de criação não pode ser no futuro.');
      return;
    }

    const newInvestment = {
      owner,
      date,
      initialValue: parsedInitialValue,
    };

    addInvestment(newInvestment);

    setOwner('');
    setDate('');
    setInitialValue('');
  };

  const handleBackButtonClick = () => {
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <TextInput
        id="owner"
        label="Proprietário"
        value={owner}
        onChange={setOwner}
        required
      />
      <TextInput
        id="date"
        label="Data de Criação"
        value={date}
        onChange={setDate}
        type="date"
        maxDate={new Date().toISOString().split('T')[0]}
        required
      />
      <TextInput
        id="initialValue"
        label="Valor Inicial"
        value={initialValue}
        onChange={setInitialValue}
        type="number"
        error={initialValueError}
        required
      />
      <div className="flex justify-between">
        <button type="button" onClick={handleBackButtonClick} className="px-4 py-2 bg-gray-500 text-white rounded-md">Voltar</button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Criar Investimento</button>
      </div>
    </form>
  );
};

export default CreateInvestmentForm;
