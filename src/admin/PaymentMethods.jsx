import { useState, useEffect } from 'react';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import { IoMdArrowDropdown } from "react-icons/io";
import { payple } from '../assets'
import { useNavigate } from 'react-router-dom';

const PaymentMethods = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  // Retrieve payment methods from local storage on initial render
  useEffect(() => {
    const storedMethods = localStorage.getItem('paymentMethods');
    if (storedMethods) {
      setPaymentMethods(JSON.parse(storedMethods));
    }
  }, []);

  // Save payment methods to local storage whenever they change
  useEffect(() => {
    if (paymentMethods.length != 0) {
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
    }
  }, [paymentMethods]);

  const toggleAddPayment = () => {
    setShowAddPayment(!showAddPayment);
    if (showAddPayment) {
      // Reset state when closing
      setCurrentEmail('');
      setEditIndex(null);
    }
  };

  const toggleEmailPopup = (index = null) => {
    setEditIndex(index);
    setCurrentEmail(index !== null ? paymentMethods[index] : '');
    setShowEmailPopup(true);
  };

  const handleSavePaymentMethod = () => {
    if (currentEmail.trim() === '') {
      alert('Email cannot be empty');
      return;
    }

    if (editIndex !== null) {
      // Update existing payment method
      const updatedMethods = [...paymentMethods];
      updatedMethods[editIndex] = currentEmail;
      setPaymentMethods(updatedMethods);
    } else {
      // Add new payment method
      setPaymentMethods([...paymentMethods, currentEmail]);
    }

    setCurrentEmail('');
    setShowEmailPopup(false);
    setShowAddPayment(false);
  };

  const handleCancelPopup = () => {
    setShowEmailPopup(false);
    setCurrentEmail('');
  };

  const navigate = useNavigate()

  return (
    <div>

      <div className='flex items-center gap-4 font-bold'>
        <span className='text-[24px] pt-[13px] '>Payment Method</span> <span className='text-[80%] pt-3'>→</span> <span className='text-[#F05025] pt-3 text-[19px] cursor-pointer'>Visit Store</span>
      </div>

      <div className='mt-8 mb-4 text-[#888]'>
        These are the withdraw methods available for you. Please update your payment information below to submit withdraw requests and get your store payments seamlessly.
      </div>

      <div className="bg-[#EEEEEE] p-4 h-[80px] flex justify-between items-center">
        <h2 className="text-2xl font-bold  text-gray-800">Payment Methods</h2>

        {/* Add Payment Method Button */}
        <div className="flex justify-between items-center ">
          <button
            className="bg-[#DDDDDD] relative  font-bold gap-4 py-2 px-2 flex items-center justify-between"
            onClick={toggleAddPayment}
          >
            <div>
              <p className='pl-2 text-sm  text-[#333333]'>Add Payment Method</p>
            </div>
            <div>
              <IoMdArrowDropdown className="text-xl mr-2" />
            </div>

            {/* PayPal Button */}

            {showAddPayment && (
              <div className="bg-white-100  absolute top-full -left-10 p-2 bg-white border-2 border-black">
                <button
                  className="font-bold text-[#333333]  py-2 px-6  flex items-center  justify-center"
                  onClick={() => toggleEmailPopup()}
                >
                  <img
                    src="https://www.paypal.com/en_US/i/btn/btn_paynowCC_LG.gif"
                    alt="PayPal"
                    className="mr-2 w-6 h-6"
                  />
                  Direct to Payple
                </button>
              </div>
            )}

          </button>


        </div>
      </div>



      {/* List of Payment Methods */}
      <div>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 mt-5">There is no payment method to show.</p>
        ) : (
          <ul className="space-y-4">
            {paymentMethods.map((email, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >

                <div className='flex'>
                  <img src={payple} className='w-10' alt="" />
                  <span className="text-gray-700">({email})</span>
                </div>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4  inline-flex items-centert"
                  onClick={() => toggleEmailPopup(index)}
                >
                  <FaRegEdit className="mr-1" />
                  Manage
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Email Popup for Adding/Managing Payment Method */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              {editIndex !== null ? 'Manage PayPal Account' : 'Add PayPal Account'}
            </h3>
            <input
              type="email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              placeholder="Enter your PayPal email"
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSavePaymentMethod}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
            >
              Save
            </button>
            <button
              onClick={handleCancelPopup}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentMethods;
