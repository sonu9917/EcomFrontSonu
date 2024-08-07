import React from 'react'

const ContectInformation = () => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <i className="fas fa-building text-blue-500"></i>
        <div>
          <p className="text-gray-700 font-semibold">Company Name:</p>
          <p className="text-gray-600">Art rader</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <i className="fas fa-map-marker-alt text-blue-500"></i>
        <div>
          <p className="text-gray-700 font-semibold">Address:</p>
          <p className="text-gray-600">1234 Innovation Drive, Suite 567, Tech City, TX 78901, USA</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <i className="fas fa-phone-alt text-blue-500"></i>
        <div>
          <p className="text-gray-700 font-semibold">Phone:</p>
          <p className="text-gray-600">+1 (800) 555-1234</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <i className="fas fa-envelope text-blue-500"></i>
        <div>
          <p className="text-gray-700 font-semibold">Email:</p>
          <p className="text-gray-600">nzartrader@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <i className="fas fa-globe text-blue-500"></i>
        <div>
          <p className="text-gray-700 font-semibold">Website:</p>
          <p className="text-gray-600">
            <a href="http://www.techinnovate.com" className="text-blue-500 hover:underline">
              www.techinnovate.com
            </a>
          </p>
        </div>
      </div>
     
    </div>
  </div>

  )
}

export default ContectInformation