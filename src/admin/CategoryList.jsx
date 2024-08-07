import React from 'react';
import { useDeleteCategoryMutation, useGetCategoryQuery } from '../redux/productSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddCategory from './AddCategory';

const CategoryList = () => {
  const { data, refetch } = useGetCategoryQuery();
  const [deleteCategory, { isError, isSuccess, isLoading }] = useDeleteCategoryMutation();

  // delete category handler
  const onDelete = (id) => {
    deleteCategory(id).unwrap()
      .then(() => {
        toast.success('Category deleted successfully');
        refetch(); // Refetch categories after successful deletion
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data.message);
      });
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold mb-6">Category Listing</h2>
        <Link to={'/admin/addCategory'}>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <span className="text-xl">+</span> Add Category
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                S.no
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm uppercase font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.category?.map((category, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {category.name}
                </td>

                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <Link to={`/admin/editCategory/${category._id}`}>
                    <button className="text-blue-500 hover:text-blue-700 mx-2">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    onClick={() => onDelete(category._id)}
                    className="text-red-500 hover:text-red-700 mx-2"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>
  );
};

export default CategoryList;
