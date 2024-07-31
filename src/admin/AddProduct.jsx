import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useAddProductMutation,
  useGetCategoryQuery,
  useGetSubCategoryQuery,
} from "../redux/productSlice";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const navigate = useNavigate();
  const [addProduct, { isError, isLoading, isSuccess }] =
    useAddProductMutation();

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

  const handleChange = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);

      if (files.length + formData.images.length > 5) {
        toast.error("You can only upload up to 5 images.");
        return;
      }

      const newImages = [];
      const newImagePreviews = [];

      files.forEach((file) => {
        const isDuplicate = formData.images.some(
          (existingImage) =>
            existingImage.name === file.name && existingImage.size === file.size
        );

        if (!isDuplicate) {
          newImages.push(file);
          newImagePreviews.push(URL.createObjectURL(file));
        } else {
          toast.warn("Duplicate image not added: " + file.name);
        }
      });

      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newImages],
      }));

      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveImage = (index) => {
    // Revoke the object URL of the image to be removed
    URL.revokeObjectURL(imagePreviews[index]);

    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));

    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    formData.images.forEach((image) => data.append("images", image));
    data.append("category", selectedCategory);
    data.append("subCategory", selectedSubCategory);

    try {
      await addProduct(data).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/productList");
    } catch (error) {
      toast.error("Error adding product");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Error adding product");
    }
    return () => {
      // Clean up the object URLs after the component unmounts
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [isError, imagePreviews]);

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
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
              onChange={(option) => {
                setSelectedCategory(option.value);
                setSelectedSubCategory(null);
              }}
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
                onChange={(option) => setSelectedSubCategory(option.value)}
                className="basic-single mb-2"
                classNamePrefix="select"
                isSearchable={true}
                name="subCategory"
                options={subCategoryOptions}
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="images"
            >
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
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-3 gap-2 mb-4 ">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full  object-cover rounded h-28"
                />
                <div
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                >
                  <FaTimes />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
