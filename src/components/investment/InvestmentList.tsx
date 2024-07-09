import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../types';

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList: React.FC<InvestmentListProps> = ({ investments }) => {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvestments = investments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(investments.length / itemsPerPage);

  const handleDetailsClick = (investmentId: string) => {
    console.log(investmentId);
    router.push(`/investments/${investmentId}`);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mb-4">
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
          {currentInvestments.map((inv, index) => (
            <tr
              key={index}
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
      <div className="mb-4 mr-4 flex justify-end mt-4">
        <nav className="flex items-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l-md border ${
              currentPage === 1
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Anterior
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 border ${
                  currentPage === i + 1
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r-md border ${
              currentPage === totalPages
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Próxima
          </button>
        </nav>
      </div>
    </div>
  );
};

export default InvestmentList;
