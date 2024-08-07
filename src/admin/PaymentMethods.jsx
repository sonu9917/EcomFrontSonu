import { useState, useEffect } from 'react';
import { FaPlus, FaRegEdit } from 'react-icons/fa';

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
    if(paymentMethods.length != 0){
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Methods</h2>

      {/* Add Payment Method Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full flex items-center transition-colors duration-300 ease-in-out"
          onClick={toggleAddPayment}
        >
          <FaPlus className="mr-2" />
          Add Payment Method
        </button>
      </div>

      {/* PayPal Button */}
      {showAddPayment && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full flex items-center transition-colors duration-300 ease-in-out w-full justify-center"
            onClick={() => toggleEmailPopup()}
          >
            <img
              src="https://www.paypal.com/en_US/i/btn/btn_paynowCC_LG.gif"
              alt="PayPal"
              className="mr-2 w-6 h-6"
            />
            Add PayPal Account
          </button>
        </div>
      )}

      {/* List of Payment Methods */}
      <div>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 text-center">There is no payment method to show.</p>
        ) : (
          <ul className="space-y-4">
            {paymentMethods.map((email, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <span className="text-gray-700">{email}</span>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full inline-flex items-center transition-colors duration-300 ease-in-out"
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
