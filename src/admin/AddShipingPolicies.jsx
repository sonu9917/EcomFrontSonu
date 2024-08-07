import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig'
import { AiTwotoneQuestionCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

const AddShippingPolicies = ({ setTogel }) => {
  const [zoneName, setZoneName] = useState('');
  const [region, setRegion] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [processingTime, setProcessingTime] = useState('');
  const [shippingPolicy, setShippingPolicy] = useState('');
  const [refundPolicy, setRefundPolicy] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data into an object
    const shipping = {
      zoneName,
      region,
      shippingMethod,
      processingTime,
      shippingPolicy,
      refundPolicy
    };

    // Handle form submission here
    // console.log('Form Data:', shipping);

    try {
      await axios.put("/store/updateStore", { shipping }).then(
        (response) => {
          // console.log(response)
          toast.success(response.data.message);
          setZoneName('')
          setRegion('')
          setShippingMethod('')
          processingTime('')
          shippingPolicy('')
          refundPolicy('')
        }
      ).catch((err) => {
        console.log(err)
        toast.error(err.data.error);
        setZoneName('')
        setRegion('')
        setShippingMethod('')
        processingTime('')
        shippingPolicy('')
        refundPolicy('')
      });
    } catch (error) {
      console.error("Error saving social profiles:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Zone Name */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="zoneName"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Zone Name
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <input
            type="text"
            id="zoneName"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
            placeholder="Enter zone name"
          />
        </div>

        {/* Region */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="region"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Region
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <input
            type="text"
            id="region"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Enter region"
          />
        </div>

        {/* Shipping Method */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="shippingMethod"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Shipping Method
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <input
            type="text"
            id="shippingMethod"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            placeholder="Enter shipping method"
          />
        </div>

        {/* Processing Time (Select Dropdown) */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="processingTime"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Processing Time
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <select
            id="processingTime"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50"
            value={processingTime}
            onChange={(e) => setProcessingTime(e.target.value)}
          >
            <option value="">Select processing time</option>
            <option value="1-2 days">1-2 days</option>
            <option value="3-5 days">3-5 days</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
          </select>
        </div>

        {/* Shipping Policy */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="shippingPolicy"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Shipping Policy
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <textarea
            id="shippingPolicy"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50 resize-none"
            rows={4}
            value={shippingPolicy}
            onChange={(e) => setShippingPolicy(e.target.value)}
            placeholder="Enter shipping policy"
          />
        </div>

        {/* Refund Policy */}
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="refundPolicy"
            className="col-span-3 flex items-center gap-2 text-gray-700 font-medium"
          >
            Refund Policy
            <AiTwotoneQuestionCircle className="text-lg text-gray-400" />
          </label>
          <textarea
            id="refundPolicy"
            className="col-span-9 rounded-md shadow-sm border border-gray-300 focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50 resize-none"
            rows={4}
            value={refundPolicy}
            onChange={(e) => setRefundPolicy(e.target.value)}
            placeholder="Enter refund policy"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Save Settings
          </button>
          <Link
            onClick={() => setTogel(false)}
            className="text-blue-500 hover:underline"
          >
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Back to Listing
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddShippingPolicies;
