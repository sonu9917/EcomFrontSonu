import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import AddShipingPolicies from './AddShipingPolicies';
import { MdOutlineSettings } from 'react-icons/md';
import ShippingPoliciesList from './ShippingPoliciesList';

const ShippingSettings = () => {
  const [togel, setTogel] = useState(false);
  const [shippingPolicies, setShippingPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippingPolicies = async () => {
      try {
        const response = await axios.get('/store/getStore');
        setShippingPolicies(response.data.shipping); // Adjust based on your API response structure
      } catch (error) {
        setError('Error fetching shipping policies');
        console.error('Error fetching shipping policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingPolicies();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shipping Settings</h2>
        <button
          className="bg-gray-200 hover:bg-[#F05025] hover:text-white group text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setTogel(true)}
        >
          <div className="w-4 h-4 mr-2">
            <MdOutlineSettings className="group-hover:text-white" />
          </div>
          <span>Click here to add Shipping Policies</span>
        </button>
      </div>
      <p className="mb-4">
        A shipping zone is a geographic region where a certain set of shipping methods are offered. We will match a customer to a single zone using their shipping address and present the shipping methods within that zone to them.
      </p>
      <p className="mb-4">
        If you want to use the previous shipping system then{' '}
        <a href="#" className="text-blue-500 hover:underline">
          Click Here
        </a>
      </p>
      <div className="overflow-x-auto">
        <ShippingPoliciesList shippingPolicies={shippingPolicies} />
      </div>
      <div>
        {togel && <AddShipingPolicies togel={togel} setTogel={setTogel} />}
      </div>
    </div>
  );
};

export default ShippingSettings;
