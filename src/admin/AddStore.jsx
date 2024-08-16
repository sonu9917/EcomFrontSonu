import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';
import CodeEditorPage from './CodeEditorPage';

const AddStoreForm = () => {
  // state to store data
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
      state: '',
    },
    phone: '',
    email: '',
    schedule: [
      { day: 'Monday', openTime: '', closeTime: '' },
      { day: 'Tuesday', openTime: '', closeTime: '' },
      { day: 'Wednesday', openTime: '', closeTime: '' },
      { day: 'Thursday', openTime: '', closeTime: '' },
      { day: 'Friday', openTime: '', closeTime: '' },
      { day: 'Saturday', openTime: '', closeTime: '' },
      { day: 'Sunday', openTime: '', closeTime: '' },
    ],
    biographyPicture: null,
    biographyText: '',
  });

  // state to store existing store data
  const [existingStore, setExistingStore] = useState(null);

  // Fetch existing store data
  useEffect(() => {
    axios.get('/store/getStore')
      .then((response) => {
        if (response.data) {
          setExistingStore(response.data);
          // Set form fields with existing store data
          setStoreData({
            banner: response.data.banner ? { file: null, preview: response.data.banner.url } : null,
            profilePicture: response.data.profilePicture ? { file: null, preview: response.data.profilePicture.url } : null,
            storeName: response.data.storeName,
            storeCategory: response.data.storeCategory,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            schedule: response.data.schedule,
            biographyPicture: response.data.biographyPicture ? { file: null, preview: response.data.biographyPicture.url } : null,
            biographyText: response.data.biographyText,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // Handle file change for banner and profile picture with preview
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === 'banner') {
      const bannerUrl = URL.createObjectURL(file);
      setStoreData((prevData) => ({
        ...prevData,
        banner: { file, preview: bannerUrl },
      }));
    } else if (name === 'profilePicture') {
      const profilePictureUrl = URL.createObjectURL(file);
      setStoreData((prevData) => ({
        ...prevData,
        profilePicture: { file, preview: profilePictureUrl },
      }));
    } else if (name === 'biographyPicture') {
      const biographyPictureUrl = URL.createObjectURL(file);
      setStoreData((prevData) => ({
        ...prevData,
        biographyPicture: { file, preview: biographyPictureUrl },
      }));
    }
  };


  // Handle input change for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      address: { ...prevData.address, [name]: value },
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...storeData.schedule];
    newSchedule[index][field] = value;
    setStoreData((prevData) => ({
      ...prevData,
      schedule: newSchedule,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(storeData)

    const formData = new FormData();
    formData.append('banner', storeData.banner.file);
    formData.append('profilePicture', storeData.profilePicture.file);
    formData.append('biographyPicture', storeData.biographyPicture?.file);

    // Append other fields
    formData.append('storeName', storeData.storeName);
    formData.append('storeCategory', storeData.storeCategory);
    formData.append('street', storeData.address.street);
    formData.append('street2', storeData.address.street2);
    formData.append('city', storeData.address.city);
    formData.append('postalCode', storeData.address.postalCode);
    formData.append('country', storeData.address.country);
    formData.append('state', storeData.address.state);
    formData.append('biographyText', storeData.biographyText);
    formData.append('phone', storeData.phone);
    formData.append('email', storeData.email);
    formData.append('schedule', JSON.stringify(storeData.schedule));

    // console.log(formData)


    // api call
    const apiCall = existingStore ? axios.post('/store/updateStore', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }) : axios.post('/store/addStore', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    
     apiCall.then((response) => {
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
            state: '',
          },
          phone: '',
          email: '',
          schedule: [
            { day: 'Monday', openTime: '', closeTime: '' },
            { day: 'Tuesday', openTime: '', closeTime: '' },
            { day: 'Wednesday', openTime: '', closeTime: '' },
            { day: 'Thursday', openTime: '', closeTime: '' },
            { day: 'Friday', openTime: '', closeTime: '' },
            { day: 'Saturday', openTime: '', closeTime: '' },
            { day: 'Sunday', openTime: '', closeTime: '' },
          ],
          biographyPicture: null,
          biographyText: '',
        });
      })
      .catch((error) => {
        console.log(error)
        toast.error('Error:', error.response.data.error)
      });
  };



  return (
    <>
      <div className='flex items-center gap-2 font-bold'>
        <span className='text-[24px] pt-[13px]'>Settings</span>
        <span className='text-[80%] pt-3'>→</span>
        <span className='text-[#F05025] pt-3 text-[19px] cursor-pointer'>Visit Store</span>
      </div>

      <div className='customFormDiv'>
        <form onSubmit={handleSubmit} className="p-6 bg-white">
          {/* Banner Image */}
          <div className="mb-4 flex items-center">
            <div className='storeaddform'>
              <input
                type="file"
                name="banner"
                id="bannerUpload"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="bannerUpload">Upload File</label>
              {/* <span id="file-chosen">{storeData.banner ? storeData.banner.file.name : 'No file chosen'}</span> */}
              {storeData.banner && (
                <div className="border-dashed border-2 border-gray-300 p-2 mt-2">
                  <img src={storeData.banner.preview} alt="Banner Preview" className="w-full h-auto" />
                </div>
              )}
              <p>Upload a banner for your store. Banner size is (625x300) pixels.</p>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Profile Picture:</label>
            <div className='storeaddform2 flex gap-5 items-center mt-2'>
              <input
                type="file"
                name="profilePicture"
                id="profilePictureUpload"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="profilePictureUpload">Upload File</label>
              {/* <span id="file-chosen">{storeData.profilePicture ? storeData.profilePicture.file.name : 'No file chosen'}</span> */}
              {storeData.profilePicture && (
                <div className="rounded-full border-2 border-gray-300 p-2 mt-2">
                  <img src={storeData.profilePicture.preview} alt="Profile Preview" className="w-20 h-20 rounded-full" />
                </div>
              )}
            </div>
          </div>

          {/* Store Name */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Store Name:</label>
            <input
              type="text"
              name="storeName"
              value={storeData.storeName}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Store Category */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Store Category:</label>
            <input
              type="text"
              name="storeCategory"
              value={storeData.storeCategory}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Address Fields */}
          <div className="mb-4 flex ">
            <label className="w-40 text-gray-700 font-bold mb-2">Address:</label>
            <div className="flex flex-col w-full">
              <label className="text-sm mb-1 flex">Street-1:</label>
              <input
                type="text"
                name="street"
                value={storeData.address.street}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 mb-2"
              />
              <label className="text-sm mb-1 flex">Street-2:</label>
              <input
                type="text"
                name="street2"
                value={storeData.address.street2}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 mb-2"
              />
              <label className="text-sm mb-1 flex">City:</label>
              <input
                type="text"
                name="city"
                value={storeData.address.city}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 mb-2"
              />
              <label className="text-sm mb-1 flex">Postal Code:</label>
              <input
                type="text"
                name="postalCode"
                value={storeData.address.postalCode}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 mb-2"
              />
              <label className="text-sm mb-1 flex">Country:</label>
              <select
                name="country"
                value={storeData.address.country}
                onChange={handleAddressChange}
                className="border border-gray-300 p-2 mb-2"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
              </select>
              {storeData.address.country && (
                <>
                  <label className="text-sm mb-1 flex">State:</label>
                  <select
                    name="state"
                    value={storeData.address.state}
                    onChange={handleAddressChange}
                    className="border border-gray-300 p-2 mb-2"
                  >
                    <option value="">Select State</option>
                    {storeData.address.country === 'India' && (
                      <>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                      </>
                    )}
                    {storeData.address.country === 'USA' && (
                      <>
                        <option value="California">California</option>
                        <option value="Texas">Texas</option>
                      </>
                    )}
                    {storeData.address.country === 'Canada' && (
                      <>
                        <option value="Ontario">Ontario</option>
                        <option value="Quebec">Quebec</option>
                      </>
                    )}
                  </select>
                </>
              )}
            </div>
          </div>

          {/* Biography */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Biography:</label>
            <div className='storeaddform2 flex gap-5 items-center mt-2'>
              <input
                type="file"
                name="biographyPicture"
                id="biographyPictureUpload"
                hidden
                onChange={handleFileChange}
              />
              <label htmlFor="biographyPictureUpload">Upload File</label>
              <div className='w-40'>
                {/* <span id="file-chosen">{storeData.biographyPicture ? storeData.biographyPicture.file.name : 'No file chosen'}</span> */}
                {storeData.biographyPicture && (
                  <div className="border-dashed border-2 border-gray-300 p-2 mt-2">
                    <img src={storeData.biographyPicture.preview} alt="Biography Preview" className="w-full h-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2"></label>
            <div className='storeaddform2 flex gap-5 items-center mt-2'>
              <CodeEditorPage value={storeData.biographyText}
                onChange={(e) => handleInputChange({ target: { name: 'biographyText', value: e.target.value } })} />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Phone:</label>
            <input
              type="text"
              name="phone"
              value={storeData.phone}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Email */}
          <div className="mb-4 flex items-center">
            <label className="w-40 text-gray-700 font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={storeData.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 w-full"
            />
          </div>

          {/* Store Schedule */}
          <div className="mb-4 flex gap-4">
            <label className="w-40 text-gray-700 font-bold mb-2">Store Schedule:</label>
            <div className="flex flex-col gap-2">
              {storeData.schedule.map((scheduleItem, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-20">{scheduleItem.day}:</span>
                  <input
                    type="time"
                    value={scheduleItem.openTime}
                    onChange={(e) => handleScheduleChange(index, 'openTime', e.target.value)}
                    className="border border-gray-300 p-1"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={scheduleItem.closeTime}
                    onChange={(e) => handleScheduleChange(index, 'closeTime', e.target.value)}
                    className="border border-gray-300 p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4 pt-3 flex justify-center">
            <button type="submit" className="bg-[#F05025] -ml-24 text-white py-2 px-4 ">
              Update Settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStoreForm;
