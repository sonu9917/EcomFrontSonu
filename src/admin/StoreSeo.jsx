import React, { useState } from "react";

const StoreSeo = () => {
  // State to handle form inputs
  const [seoData, setSeoData] = useState({
    seoTitle: "",
    metaDescription: "",
    metaKeywords: "",
    facebookTitle: "",
    facebookDescription: "",
    facebookImage: "",
    twitterTitle: "",
    twitterDescription: "",
    twitterImage: "",
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData({
      ...seoData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to save the changes
    console.log("SEO Data Submitted:", seoData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-t-lg">
          <h2 className="text-2xl font-semibold">Store SEO Settings</h2>
          <p className="mt-2 text-lg">Enhance your store's online presence</p>
        </div>

        <form className="p-6" onSubmit={handleSubmit}>
          {/* SEO Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seoTitle">
              SEO Title
            </label>
            <input
              type="text"
              id="seoTitle"
              name="seoTitle"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.seoTitle}
              onChange={handleChange}
              placeholder="Enter SEO Title"
            />
          </div>

          {/* Meta Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaDescription">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.metaDescription}
              onChange={handleChange}
              placeholder="Enter Meta Description"
              rows="3"
            ></textarea>
          </div>

          {/* Meta Keywords */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaKeywords">
              Meta Keywords
            </label>
            <input
              type="text"
              id="metaKeywords"
              name="metaKeywords"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.metaKeywords}
              onChange={handleChange}
              placeholder="Enter Meta Keywords"
            />
          </div>

          {/* Facebook Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebookTitle">
              Facebook Title
            </label>
            <input
              type="text"
              id="facebookTitle"
              name="facebookTitle"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.facebookTitle}
              onChange={handleChange}
              placeholder="Enter Facebook Title"
            />
          </div>

          {/* Facebook Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebookDescription">
              Facebook Description
            </label>
            <textarea
              id="facebookDescription"
              name="facebookDescription"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.facebookDescription}
              onChange={handleChange}
              placeholder="Enter Facebook Description"
              rows="3"
            ></textarea>
          </div>

          {/* Facebook Image */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facebookImage">
              Facebook Image URL
            </label>
            <input
              type="url"
              id="facebookImage"
              name="facebookImage"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.facebookImage}
              onChange={handleChange}
              placeholder="Enter Facebook Image URL"
            />
          </div>

          {/* Twitter Title */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitterTitle">
              Twitter Title
            </label>
            <input
              type="text"
              id="twitterTitle"
              name="twitterTitle"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.twitterTitle}
              onChange={handleChange}
              placeholder="Enter Twitter Title"
            />
          </div>

          {/* Twitter Description */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitterDescription">
              Twitter Description
            </label>
            <textarea
              id="twitterDescription"
              name="twitterDescription"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.twitterDescription}
              onChange={handleChange}
              placeholder="Enter Twitter Description"
              rows="3"
            ></textarea>
          </div>

          {/* Twitter Image */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="twitterImage">
              Twitter Image URL
            </label>
            <input
              type="url"
              id="twitterImage"
              name="twitterImage"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={seoData.twitterImage}
              onChange={handleChange}
              placeholder="Enter Twitter Image URL"
            />
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreSeo;
