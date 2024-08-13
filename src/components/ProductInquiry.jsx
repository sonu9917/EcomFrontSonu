import React, { useState } from 'react';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';

const ProductInquiry = ({ id }) => {
  const [formData, setFormData] = useState({
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`/product/product-inquiry/${id}`, formData);
      toast.success('Inquiry sent successfully!');
      setFormData({ message: '' }); // Clear the textarea
    } catch (err) {
      console.error(err);
      toast.error('Failed to send inquiry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-white  p-6">
      <h1 className="text-2xl font-bold mb-4 text-start">Product Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            placeholder="Write your inquiry here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="max-w-[200px] bg-[#F05025] text-white p-4 rounded-sm"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default ProductInquiry;
