import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Investment } from '../../../types';
import Pagination from '../../ui/Pagination/Pagination';
import InvestmentTable from '../../ui/Table/InvestmentTable';

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList: React.FC<InvestmentListProps> = React.memo(({ investments }) => {
  const router = useRouter();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentInvestments = useMemo(() => {
    return investments.slice(indexOfFirstItem, indexOfLastItem);
  }, [investments, indexOfFirstItem, indexOfLastItem]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(investments.length / itemsPerPage);

  const handleDetailsClick = (investmentId: string) => {
    router.push(`/investments/${investmentId}`);
  };

  return (
    <div className="overflow-x-auto shadow-inner rounded-lg mb-4">
      <InvestmentTable investments={currentInvestments} handleDetailsClick={handleDetailsClick} />
      <div className="mb-4 mr-4 flex justify-end mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  );
});

InvestmentList.displayName = 'InvestmentList';

export default InvestmentList;
