import React from "react";
import { useGetSingleProductQuery } from "../redux/productSlice";
import { FaTrash } from "react-icons/fa";

const WishList = ({ productId,index }) => {

    const { data, isLoading, error } = useGetSingleProductQuery(productId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;
  
    const product = data.product;

  return (
    <tr key={index} className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
      <td className="py-2 px-4 border-b border-gray-200">{product.name}</td>
      <td className="py-2 px-4 border-b border-gray-200 w-20 h-20">
        <img
          src={product.images[0]}
          alt=""
          className="w-full h-full"
        />
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{product.price}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        {product.description}
      </td>
      <td className="py-2 px-4 border-b border-gray-200 text-center">
        <button
          //   onClick={() => onDelete(product._id)}
          className="text-red-500 hover:text-red-700 mx-2"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default WishList;
