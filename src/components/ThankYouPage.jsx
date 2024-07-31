import React from "react";
import { Link, useParams } from "react-router-dom";

const ThankYouPage = () => {
  const { sessionId, key } = useParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-lg w-full space-y-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-600 w-20 h-20 md:w-24 md:h-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your interest! Check your email for a link to the guide.
        </p>
        <div className="w-full bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 pb-3">
            Order Summary
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-gray-700">
              <p className="text-sm font-medium">Duration:</p>
              <p className="text-sm font-semibold">{key}</p>
            </div>
           
            <div className="flex justify-between text-gray-700">
              <p className="text-sm font-medium">Order ID:</p>
              <p className="text-sm font-semibold text-emerald-600 break-words w-[270px]">
                {sessionId}
              </p>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="text-sm font-medium">Back To Home</span>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
