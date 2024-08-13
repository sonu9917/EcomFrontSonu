import React, { useState } from "react";
import { useGetUserDetailsQuery } from "../redux/productSlice";

const ReferralLink = () => {
  // Fetch user details using custom query hook
  const { data } = useGetUserDetailsQuery();

  // State to manage copy button text
  const [copySuccess, setCopySuccess] = useState(false);

  // Construct referral link from user data
  const referralLink = `https://demo.servaapplabs.com/register?ref=${data?.user.referralCode}`;

  // Handle copy action
  const handleCopy = () => {
    // Select the input field text
    const input = document.getElementById("referral-link-input");
    input.select();

    // Copy text to clipboard
    navigator.clipboard.writeText(referralLink).then(() => {
      // Set copy success state to true
      setCopySuccess(true);

      // Reset copy success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <p className="text-lg font-semibold mb-4">Share your referral link:</p>
      <div className="flex items-center mb-4">
        <input
          id="referral-link-input"
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className={`px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none ${
            copySuccess ? "bg-green-500 hover:bg-green-600" : ""
          }`}
        >
          {copySuccess ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex space-x-2">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
        >
          Share on Facebook
        </a>
        <a
          href={`mailto:?subject=Join me on our platform!&body=Use my referral link to sign up: ${referralLink}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Share via Email
        </a>
      </div>
    </div>
  );
};

export default ReferralLink;
