import React, { useState } from 'react';
import axios from '../axiosConfig';

const PayoutForm = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('usd');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('');

  const handlePayout = async () => {
    try {
      const response = await axios.post('/payout/create-payout', { amount, currency, destination });
      setStatus('Payout successful');
      console.log('Payout Created:', response.data);
    } catch (error) {
      setStatus('Payout failed');
      console.error('Error creating payout:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create Payout</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Amount"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Currency"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Destination Bank Account ID"
        />
      </div>
      <button
        onClick={handlePayout}
        className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Payout
      </button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default PayoutForm;
