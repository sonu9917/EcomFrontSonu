import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteSubCategoryMutation, useGetSubCategoryQuery } from "../redux/productSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const SubCategory = () => {

  const { data,refetch } = useGetSubCategoryQuery();
  const [deleteSubCategory, { isError, isSuccess, isLoading }] = useDeleteSubCategoryMutation();
  const navigate = useNavigate()

  // delete category handler
  const onDelete = (id) => {
    deleteSubCategory(id).unwrap()
      .then((res) =>
         {
          console.log(res)
        toast.success('subCategory deleted successfully');
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
        <h2 className="text-2xl font-semibold mb-6">Sub Category Listing</h2>
        <Link to={"/admin/addSubCategory"}>
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <span className="text-xl">+</span> Add Sub Category
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
                Sub Category Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">
                Category Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm uppercase font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.subCategory.map((subcategory, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {subcategory.subCategory}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {subcategory.category.name}
                </td>

                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  <button
                    onClick={() => {
                      navigate("/admin/editSubCategory/" + subcategory._id);
                    }}
                    className="text-blue-500 hover:text-blue-700 mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(subcategory._id)}
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

export default SubCategory;
