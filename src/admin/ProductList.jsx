import React, { useContext, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import { useDeleteProductMutation, useGetAdminProductQuery, useGetUserDetailsQuery } from "../redux/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NotpurchaseMembership from "./NotpurchaseMembership";
import { MainContext } from "../context/Context";

const ProductList = () => {
  const { data } = useGetAdminProductQuery();
  const [deleteProduct, { isError, isSuccess, isLoading }] = useDeleteProductMutation();
  const navigate = useNavigate();
  const { data: userDetails, refetch } = useGetUserDetailsQuery();
  const {setActive} = useContext(MainContext)

  console.log(userDetails?.user.role)

  // delete product handler
  const onDelete = (id) => {
    deleteProduct(id).unwrap()
      .then(() => {
        toast.success("Product deleted successfully");
        navigate("/admin/productList");
      })
      .catch(() => {
        toast.error("Error deleting product");
      });
  };

  useEffect(()=>{
    setActive("All Products")
  },[])

  return (
    <div className="container mx-auto mt-10">
      {
        userDetails?.user.role != "user" ?

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Product Listing</h2>
              <button
                onClick={() => navigate("/admin/addProduct")}
                className="flex items-center bg-[#F05025] text-white px-4 py-2 rounded "
              >
                <FaPlus className="mr-2" /> Add New Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">S.no</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">Name</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">Image</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">Price</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm uppercase font-semibold text-gray-600">Description</th>
                    <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-center text-sm uppercase font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.adminProduct.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200 w-20 h-20">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">${product.price}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{product.description}</td>
                      <td className="py-2 px-4 border-b border-gray-200 text-center">
                        <button
                          onClick={() => navigate("/admin/editProduct/" + product._id)}
                          className="text-blue-500 hover:text-blue-700 mx-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => onDelete(product._id)}
                          className="text-red-500 hover:text-red-700 mx-2"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => navigate(`/shop/${product._id}`)}
                          className="text-green-500 hover:text-green-700 mx-2"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> :
          <div>
              <NotpurchaseMembership/>
          </div>
      }
    </div>
  );
};

export default ProductList;
