import React from "react";
import { Link } from "react-router-dom";

const FailedPayment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <i className="fas fa-exclamation-triangle text-red-600 text-6xl mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
        </div>
        <p className="text-gray-700 mb-6">
          Unfortunately, your payment could not be processed. Please try again later or contact support if you continue to experience issues.
        </p>
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors mb-4"
          >
            Go to Homepage
          </Link>
          <Link
            to="/contact"
            className="text-blue-600 hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FailedPayment;
