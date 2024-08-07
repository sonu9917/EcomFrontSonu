import React, { useEffect, useState } from 'react';
import {  useGetCategoryQuery, useGetSingleCategoryQuery, useUpdateCategoryMutation } from '../redux/productSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();
  
  const {id} = useParams()
  
  const [updateCategory, { isError, isLoading, isSuccess }] = useUpdateCategoryMutation();
  const { data, error: fetchError } = useGetSingleCategoryQuery(id);

  useEffect(()=>{
    setCategoryName(data?.category.name)
  },[data])

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const { refetch } = useGetCategoryQuery()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(categoryName)
        await updateCategory({ id,data:{name:categoryName}}).unwrap();
        toast.success("Category updated successfully");
        navigate("/admin/categoryList");
        refetch()
      } catch (error) {
        toast.error("Error updating categrory");
        console.log(error);
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Category'}
            </button>
            <button
              onClick={() => navigate('/admin/categoryList')}
              className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              disabled={isLoading}
            >
              Back to Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
