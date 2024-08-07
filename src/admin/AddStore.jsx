import React, { useState } from 'react';
import axios from '../axiosConfig'
import { toast } from 'react-toastify'

const AddStoreForm = () => {
  const [storeData, setStoreData] = useState({
    banner: null,
    profilePicture: null,
    storeName: '',
    storeCategory: '',
    address: {
      street: '',
      street2: '',
      city: '',
      postalCode: '',
      country: '',
    },
    phone: '',
    email: '',
    schedule: '',
  });

  // Handle file change for multiple images
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: files,
    }));
  };

  // Handle input change for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('banner', storeData.banner[0]); // Assuming single file upload
    formData.append('profilePicture', storeData.profilePicture[0]);

    // Append other fields
    formData.append('storeName', storeData.storeName);
    formData.append('storeCategory', storeData.storeCategory);
    formData.append('street', storeData.address.street);
    formData.append('street2', storeData.address.street2);
    formData.append('city', storeData.address.city);
    formData.append('postalCode', storeData.address.postalCode);
    formData.append('country', storeData.address.country);
    formData.append('phone', storeData.phone);
    formData.append('email', storeData.email);
    formData.append('schedule', storeData.schedule);

    // Implement form submission logic here
    axios.post('/store/addStore', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response)
        toast.success(response.data.message);
        setStoreData({
          banner: null,
          profilePicture: null,
          storeName: '',
          storeCategory: '',
          address: {
            street: '',
            street2: '',
            city: '',
            postalCode: '',
            country: '',
          },
          phone: '',
          email: '',
          schedule: '',
        })
      })
      .catch((error) => toast.error('Error:', error.data.error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Store</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Banner Image</label>
        <input
          type="file"
          name="banner"
          onChange={handleFileChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Store Name</label>
        <input
          type="text"
          name="storeName"
          value={storeData.storeName}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Store Category</label>
        <input
          type="text"
          name="storeCategory"
          value={storeData.storeCategory}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      {/* Address Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Street</label>
        <input
          type="text"
          name="street"
          value={storeData.address.street}
          onChange={(e) => setStoreData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, street: e.target.value },
          }))}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Street 2</label>
        <input
          type="text"
          name="street2"
          value={storeData.address.street2}
          onChange={(e) => setStoreData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, street2: e.target.value },
          }))}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">City</label>
        <input
          type="text"
          name="city"
          value={storeData.address.city}
          onChange={(e) => setStoreData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, city: e.target.value },
          }))}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          value={storeData.address.postalCode}
          onChange={(e) => setStoreData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, postalCode: e.target.value },
          }))}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Country</label>
        <input
          type="text"
          name="country"
          value={storeData.address.country}
          onChange={(e) => setStoreData((prevData) => ({
            ...prevData,
            address: { ...prevData.address, country: e.target.value },
          }))}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Phone</label>
        <input
          type="text"
          name="phone"
          value={storeData.phone}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={storeData.email}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Schedule</label>
        <input
          type="text"
          name="schedule"
          value={storeData.schedule}
          onChange={handleInputChange}
          className="border rounded-lg p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default AddStoreForm;
