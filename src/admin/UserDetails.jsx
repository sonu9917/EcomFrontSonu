import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../redux/productSlice";

const UserDetails = () => {


  const { data,refetch } = useGetUserDetailsQuery();

  const location = useLocation()

  useEffect(
    ()=>{
      refetch()
    },[refetch,location]
  )

  console.log(data)

  const [walletBalance, setWalletBalance] = useState(data?.user.wallet); // Example initial balance
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSendMoney = (e) => {
    e.preventDefault();
    if (amount <= 0 || amount > walletBalance) {
      toast.error("Invalid amount");
      return;
    }
    setWalletBalance(walletBalance - amount);
    toast.success("Money sent successfully");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Details</h2>
        
        {/* User Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{data?.user.firstName + " " + data?.user.lastName}</h3>
          <p className="text-gray-600">{data?.user.email}</p>
        </div>

        {/* Wallet Info */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">My Wallet</h3>
          <p className="text-2xl font-semibold text-gray-800">${walletBalance}</p>
        </div>

        {/* Send Money Form */}
        <form onSubmit={handleSendMoney} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upiId">
              UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
