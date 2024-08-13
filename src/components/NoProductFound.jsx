import React from 'react';
import { noProduct } from '../assets';

const NoProductFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white-100 text-gray-800">
        <img src={noProduct} alt="" />
    </div>
  );
};

export default NoProductFound;
