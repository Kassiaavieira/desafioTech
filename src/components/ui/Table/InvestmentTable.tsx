import React from 'react';
import { Investment } from '../../../types';

interface InvestmentTableProps {
  investments: Investment[];
  handleDetailsClick: (investmentId: string) => void;
}

const InvestmentTable: React.FC<InvestmentTableProps> = ({ investments, handleDetailsClick }) => {

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Proprietário
          </th>
          <th scope="col" className="px-6 py-3">
            Data
          </th>
          <th scope="col" className="px-6 py-3">
            Valor Inicial
          </th>
          <th scope="col" className="px-6 py-3">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {investments.map((inv, index) => (
          <tr
            key={inv.id}
            className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}
          >
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {inv.owner}
            </td>
            <td className="px-6 py-4">{inv.date}</td>
            <td className="px-6 py-4">R$ {inv.initialValue}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleDetailsClick(inv.id)}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline inline-block mb-1 mr-1"
              >
                Detalhes
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvestmentTable;
