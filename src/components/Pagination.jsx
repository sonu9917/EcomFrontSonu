import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-6">
      <ul className="flex space-x-1">
        {/* Previous Button */}
        <li>
          <button
            className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 border rounded-lg ${currentPage === index + 1 ? "bg-[#F05025] text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            className="px-3 py-1 border rounded-lg bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
