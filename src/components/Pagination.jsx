import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Próximo
      </button>
    </div>
  );
};
