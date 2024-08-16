import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import axios from '../axiosConfig';
import ProductList from './ProductList';
import NoStoreFound from './NoStoreFound';

const VisitStore = () => {
  const [store, setStore] = useState(null); // Initialize with null for better handling

  console.log(store)

  useEffect(() => {
    axios
      .get('/store/getStore')
      .then((response) => {
        if (response.data) {
          console.log(response.data)

          setStore(response.data); // Set the first store if there's more than one
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!store) {
    return (
      <NoStoreFound/>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-7">
          <div
            className="col-span-12 h-40 bg-cover bg-center m-4 p-4 rounded-md shadow-lg"
            style={{
              backgroundImage: `url(${store.banner?.url || 'default-banner.jpg'})`,
            }}
          >
            <div className="flex items-center mb-4 mt-4">
              {store.profilePicture?.url ? (
                <img
                  src={store.profilePicture.url}
                  alt="Vendor Profile"
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                />
              ) : (
                <FaRegUserCircle className="w-16 h-16 text-white" />
              )}
              <span className="ml-4 font-bold text-white text-2xl">{store.name || 'Vendor Name'}</span>
            </div>
            <p className="text-gray-200">
              <span className="text-white text-xl font-bold">Rating:</span>{' '}
              <span className="text-orange-500 font-semibold">
                {store.rating || 'No ratings found yet!'}
              </span>
            </p>
          </div>
          <div className="col-span-12 bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Products</h2>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Enter product name"
                className="px-4 py-2 border border-gray-300 rounded-md w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="button"
              >
                Search
              </button>
            </div>
            <div className="bg-blue-100 border border-blue-300 p-4 rounded-md mb-4">
              <ProductList storeId={store.id} />
            
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitStore;
