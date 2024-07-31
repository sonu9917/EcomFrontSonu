// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="loader">
        <div className="w-16 h-16 border-4 border-t-4 border-t-rose-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
