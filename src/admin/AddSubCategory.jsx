import React, { useState } from "react";
import { useAddSubCategoryMutation, useGetCategoryQuery } from "../redux/productSlice";
import Select from 'react-select';
import { toast } from 'react-toastify';  // Ensure you import toast from react-toastify

const AddSubCategory = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const { data } = useGetCategoryQuery();

  const [addSubCategory, { isLoading, isError, isSuccess }] = useAddSubCategoryMutation();

  const categoryOptions = data?.category.map((d, i) => {
    return {
      label: d.name,
      value: d._id,
    };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      category,
      subCategory,
    };

    try {
      await addSubCategory(formData).unwrap();
      toast.success("Sub Category added successfully");
    } catch (error) {
      toast.error("Error adding sub category");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Sub Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <Select
              onChange={(option) => {
                setCategory(option.value);
              }}
              className="basic-single mb-2"
              classNamePrefix="select"
              isSearchable={true}
              name="category"
              options={categoryOptions}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subCategory"
            >
              Sub Category Name
            </label>
            <input
              type="text"
              id="subCategory"
              name="subCategory"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;
