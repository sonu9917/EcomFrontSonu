import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaRegUserCircle, FaTwitter } from 'react-icons/fa';
import axios from '../axiosConfig';
import ProductList from './ProductList';
import NoStoreFound from './NoStoreFound';
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPhonePortrait } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const VisitStore = () => {
  const [store, setStore] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [sortOption, setSortOption] = useState('default');
  const [showSchedule, setShowSchedule] = useState(false);

  // console.log(store.socialProfiles.facebook != '' ? "icon" : '')

  useEffect(() => {
    axios
      .get('/store/getStore')
      .then((response) => {
        if (response.data) {
          setStore(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!store) {
    return <NoStoreFound />;
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    // You can implement sorting logic here if needed
  };

  const handleMouseEnter = () => {
    setShowSchedule(true);
  };

  const handleMouseLeave = () => {
    setShowSchedule(false);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-7">
          <div
            className="col-span-12 h-[361px] relative bg-cover bg-center m-4 p-4 rounded-md"
            style={{
              backgroundImage: `url(${store.banner?.url || 'default-banner.jpg'})`,
            }}
          >
            <div className="absolute top-0 left-0 text-white h-full items-center mb-4 p-4" style={
              {
                backgroundColor: 'rgba(0, 0, 0, 0.65)'
              }
            }>
              <div className='flex flex-col gap-3 w-[250px]'>
                {/* vendor profile */}
                <div className='flex justify-center'>
                  {store.profilePicture?.url ? (
                    <img
                      src={store.profilePicture.url}
                      alt="Vendor Profile"
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                    />
                  ) : (
                    <FaRegUserCircle className="w-16 h-16 text-white" />
                  )}
                </div>

                {/* vendor name */}
                <div className="ml-4 font-bold text-white text-2xl flex cursor-pointer justify-center">
                  {store.storeName || 'Vendor Name'}
                </div>

                {/* vendor address */}
                <div className='flex gap-2 items-center cursor-pointer pl-5'>
                  <div>
                    <FaMapMarkerAlt className='text-xl' />
                  </div>
                  <div>
                    {store.address.street + ' ' + store.address.street2 + ' ' + store.address.city + ' ' + store.address.country}
                  </div>
                </div>

                {/* vendor mobile */}
                <div className='flex gap-2 items-center cursor-pointer pl-5'>
                  <div>
                    <IoMdPhonePortrait className='text-xl' />
                  </div>
                  <div>
                    {store.phone}
                  </div>
                </div>

                {/* vendor email */}
                <div className='flex gap-2 items-center cursor-pointer pl-5'>
                  <div>
                    <MdOutlineEmail className='text-xl' />
                  </div>
                  <div>
                    {store.email}
                  </div>
                </div>

                {/* No rating found */}
                <div className='flex gap-2 items-center cursor-pointer pl-5'>
                  <div>
                    <IoMdStar className='text-xl' />
                  </div>
                  <div>
                    No rating found yet!
                  </div>
                </div>

                {/* vendor schedule */}
                <div className='flex gap-2 items-center cursor-pointer pl-5'
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <div>
                    <FaShoppingCart className='text-xl' />
                  </div>
                  <div className='flex items-center'>
                    store is close on 6:30 pm <span className='ml-2'><IoIosArrowDown /></span>
                  </div>
                </div>

              </div>

              {showSchedule && (
                <div id="vendor-store-times" onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave} className='bg-white w-[600px]'>
                  <div className="store-times-heading justify-center items-center gap-3 flex">
                    <i className="fas fa-calendar-day"></i>
                    <h4 className='text-black font-bold text-xl'>Weekly Store Timing</h4>
                  </div>

                  <div className="store-time-tags flex flex-col">
                    {store?.schedule.map((d, i) => {
                      return (
                        <div key={i} className='flex'>
                          <div className="store-days">{d.day}</div>
                          <div className="store-times">
                            <span className="store-open">
                              {formatTime(d.openTime)} - {formatTime(d.closeTime)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>


            {/* Social icon tab */}
            <div className='absolute bottom-0 right-0  gap-5 bg-white flex items-center justify-center '>
              {/* facebook icon */}
              {store.socialProfiles.facebook && store.socialProfiles.facebook !== '' && (
                <a href={store.socialProfiles.facebook} target="_blank" rel="noopener noreferrer">
                  {/* <FaFacebook  className="text-blue-500 text-xl" title="Facebook" /> */}

                  <i class="fab fa-facebook-square text-[25px] text-[#3b5998]"></i>
                </a>
              )}

              {/* twitter icon */}
              {store.socialProfiles.twitter && store.socialProfiles.twitter !== '' && (
                <a href={store.socialProfiles.twitter} target="_blank" rel="noopener noreferrer">
                  {/* <FaTwitter className="text-white text-xl" title="Twitter" /> */}
                  <i class="fa-brands fa-square-twitter text-[25px] text-blue-500"></i>

                </a>
              )}

              {/* instagram icon */}
              {store.socialProfiles.instagram && store.socialProfiles.instagram !== '' && (
                <a href={store.socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
                  {/* <FaInstagram className="text-red-500 text-xl" title="Instagram" /> */}
                  <i class="fa-brands fa-square-instagram text-[25px] text-red-500"></i>
                </a>
              )}

              {/* pinterest icon */}
              {store.socialProfiles.pinterest && store.socialProfiles.pinterest !== '' && (
                <a href={store.socialProfiles.pinterest} target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-square-pinterest text-[25px] text-pink-500"></i>
                </a>
              )}

              {/* linkdin icon */}
              {store.socialProfiles.linkedin && store.socialProfiles.linkedin !== '' && (
                <a href={store.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-linkedin text-[25px]"></i>
                </a>
              )}

              {/* youtube icon */}
              {store.socialProfiles.youtube && store.socialProfiles.youtube !== '' && (
                <a href={store.socialProfiles.youtube} target="_blank" rel="noopener noreferrer">
                  <i class="fa-brands fa-youtube text-[25px] text-red-500"></i>
                </a>
              )}
            </div>

            <p className="text-gray-200">
              <span className="text-white text-xl font-bold">Rating:</span>{' '}
              <span className="text-orange-500 font-semibold">
                {store.rating || 'No ratings found yet!'}
              </span>
            </p>
          </div>

          {/* Tabs */}
          <div className="col-span-12 bg-white p-6 rounded-md">
            <div className="flex border-b border-gray-300">
              <button
                className={`w-1/2 py-2 text-center ${activeTab === 'products' ? 'bg-[#F05025] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('products')}
              >
                Products
              </button>
              <button
                className={`w-1/2 py-2 text-center ${activeTab === 'bio' ? 'bg-[#F05025] text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => setActiveTab('bio')}
              >
                Vendor Biography
              </button>
            </div>
            <div className="p-4">
              {activeTab === 'products' ? (
                <div>
                  <div className='flex justify-between mt-4 '>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Enter product name"
                        className="px-5 py-3 border border-gray-300  w-full mr-2"
                      />
                      <button
                        className="bg-[#F05025] text-white font-bold py-3 px-5"
                        type="button"
                      >
                        Search
                      </button>
                    </div>
                    <div className="flex items-center ">
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="px-5 py-3 border border-gray-300"
                      >
                        <option value="default">Sort by Default</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-4 rounded-md mb-4">
                    <ProductList storeId={store._id} sortOption={sortOption} />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-10">
                  <div>
                    {store.biographyPicture ? (
                      <img
                        src={store.biographyPicture.url}
                        alt="Biography"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                      />
                    ) : (
                      <FaRegUserCircle className="w-32 h-32 mx-auto mb-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-700">
                    {store.biographyText || 'No biography available.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitStore;
