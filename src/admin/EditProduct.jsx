import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { useGetCategoryQuery, useGetSubCategoryQuery, useGetSingleProductQuery, useUpdateProductMutation } from "../redux/productSlice";
import { FaTimes } from "react-icons/fa";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  const { data, error: fetchError } = useGetSingleProductQuery(id);
  const product = data?.product;

  const [updateProduct, { isError, isLoading, isSuccess }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [], // Handle new images
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const { data: categoryData } = useGetCategoryQuery();
  const { data: subCategoryData } = useGetSubCategoryQuery();

  const categoryOptions = categoryData?.category.map((d) => ({
    label: d.name,
    value: d._id,
  }));

  const subCategoryOptions = subCategoryData?.subCategory
    .filter((d) => d.category._id === selectedCategory)
    .map((d) => ({
      label: d.subCategory,
      value: d._id,
    }));

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        images: [], // Images will be updated only if new files are chosen
      });
      setSelectedCategory(product.category._id);
      setSelectedSubCategory(product.subCategory._id);
      setExistingImages(product.images); // Assuming `product.images` contains names
      setImagePreviews(product.images.map(image => `${image}`)); // Generate preview URLs
    }
  }, [product]);

  // console.log(product.images)

  // console.log(formData.imagePreviews)

  const handleChange = (e) => {
    if (e.target.name === 'images') {
      const files = Array.from(e.target.files);

      if (files.length + formData.images.length + existingImages.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }
      const newImageFiles = files.map(file => URL.createObjectURL(file));
      setFormData({ ...formData, images: files });
      setImagePreviews(prev => [...prev, ...newImageFiles]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      // Handle existing image removal
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      // Handle new image removal
      setFormData({
        ...formData,
        images: formData.images.filter((_, i) => i !== index),
      });
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
      URL.revokeObjectURL(imagePreviews[index]);
    }
  };

  const handleCategoryChange = (option) => {
    setSelectedCategory(option ? option.value : null);
    setSelectedSubCategory(null); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (option) => {
    setSelectedSubCategory(option ? option.value : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);

    // Append new images only
    formData.images.forEach((file) => data.append("images", file));

    // Append existing images
    existingImages.forEach((image) => data.append("existingImages", image));

    data.append("category", selectedCategory);
    data.append("subCategory", selectedSubCategory);

    try {
      await updateProduct({ id, data }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/productList");
    } catch (error) {
      toast.error("Error updating product");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error updating product");
    }
  }, [isError]);

  if (isLoading) return <p>Loading...</p>;
  if (fetchError) return <p>Error fetching product data: {fetchError.message}</p>;

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Category
            </label>
            <Select
              onChange={handleCategoryChange}
              value={categoryOptions.find(option => option.value === selectedCategory)}
              className="basic-single mb-3"
              classNamePrefix="select"
              isSearchable={true}
              name="category"
              options={categoryOptions}
            />
          </div>
          {selectedCategory && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Product Sub Category
              </label>
              <Select
                onChange={handleSubCategoryChange}
                value={subCategoryOptions.find(option => option.value === selectedSubCategory)}
                className="basic-single mb-2"
                classNamePrefix="select"
                isSearchable={true}
                name="subCategory"
                options={subCategoryOptions}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              Product Images
            </label>
            <div className="border-dashed flex justify-center items-center h-20 text-[#c8c9dd] font-semibold bg-[rgba(0,0,0,0.64)] border-2 p-2">
              <span className="text-white">
                Drag & drop image here or
                <label
                  htmlFor="images"
                  className="text-[orange] ml-2 cursor-pointer"
                >
                  Browse
                </label>
              </span>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="shadow hidden appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-28 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, index >= existingImages.length)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading} // Disable button if loading
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
