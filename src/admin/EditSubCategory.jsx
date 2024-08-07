import React, { useState, useEffect } from "react";
import { useAddSubCategoryMutation, useGetCategoryQuery, useGetSingleSubCategoryQuery, useUpdateSubCategoryMutation } from "../redux/productSlice";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";

const EditSubCategory = () => {
  const { id } = useParams(); // Get the subcategory ID from URL parameters

  const { data: categoryData } = useGetCategoryQuery(); // Fetch all categories
  const { data: subCategoryData, isLoading: subCategoryLoading, error: subCategoryError } = useGetSingleSubCategoryQuery(id); // Fetch the specific subcategory to edit



  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();


  // Set initial state once subCategoryData is fetched
  useEffect(() => {
    if (subCategoryData) {
      setCategory(subCategoryData.subCategory.category._id); // Assuming the subcategory has a category object with _id
      setSubCategory(subCategoryData.subCategory.subCategory); // Assuming the subcategory object has a name property
    }
  }, [subCategoryData]);


  // Prepare category options for the Select component
  const categoryOptions = categoryData?.category.map((d) => {
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
      await updateSubCategory({id,data:formData}).unwrap();
      toast.success("Sub Category updated successfully");
    } catch (error) {
      toast.error("Error updating sub category");
      console.log(error);
    }
  };

  if (subCategoryLoading) return <p>Loading...</p>; // Show loading state while fetching data
  if (subCategoryError) return <p>Error loading sub category</p>; // Handle error state

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Sub Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <Select
              value={categoryOptions.find(option => option.value === category)} // Preselect the current category
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
              {isLoading ? "Saving..." : "Save Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubCategory;
