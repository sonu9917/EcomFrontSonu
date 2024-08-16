import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <div className="flex items-center bg-gray-50">
      <div className="max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          You are not logged in
        </h2>

        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 font-semibold text-white bg-[#f05029]">

            <Link to={'/login'}>
              Please Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
