import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../redux/productSlice";
import { FaWallet, FaRegCreditCard } from "react-icons/fa"; // Import icons for wallet and UPI

const UserDetails = () => {
  const { data, refetch } = useGetUserDetailsQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [refetch, location]);

  console.log(data);

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
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          User Details
        </h2>

        {/* User Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-700">
            {data?.user.firstName + " " + data?.user.lastName}
          </h3>
          <p className="text-gray-500">{data?.user.email}</p>
        </div>

        {/* Wallet Info */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <FaWallet className="text-blue-500 text-xl mr-2" />
            <h3 className="text-lg font-bold text-gray-700">My Wallet</h3>
          </div>
          <p className="text-3xl font-semibold text-gray-800">${walletBalance}</p>
        </div>

        {/* Send Money Form */}
        <form onSubmit={handleSendMoney} className="w-full">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="upiId"
            >
              UPI ID
            </label>
            <div className="relative">
              <FaRegCreditCard className="absolute text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your UPI ID"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
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
