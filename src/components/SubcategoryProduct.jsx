import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsByCategoryAndSubcategoryQuery } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import { addToWishList, removeFromWishList } from '../redux/wishListSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const SubcategoryProduct = () => {
  const { categoryId, subcategoryId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wishListProduct, setWishListProduct] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(subcategoryId || ""); // If subcategoryId is undefined, set it to an empty string
  }, [categoryId, subcategoryId]);

  const { data: products, error, isLoading } = useGetProductsByCategoryAndSubcategoryQuery({
    categoryId: selectedCategory,
    subcategoryId: selectedSubCategory,
    searchQuery: ''
  });
  console.log(products)

  useEffect(() => {
    const lsData = localStorage.getItem("wishList");
    if (lsData) {
      const parsedWishList = JSON.parse(lsData);
      setWishListProduct(parsedWishList);
      parsedWishList.forEach(item => {
        dispatch(addToWishList({ pId: item.pId }));
      });
    }
  }, [dispatch]);

  const handleWishListClick = (id) => {
    let updatedWishList;
    if (wishListProduct.some((item) => item.pId === id)) {
      updatedWishList = wishListProduct.filter((item) => item.pId !== id);
      dispatch(removeFromWishList({ pId: id }));
    } else {
      updatedWishList = [...wishListProduct, { pId: id }];
      dispatch(addToWishList({ pId: id }));
    }
    setWishListProduct(updatedWishList);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
  };

  const categoryName = products?.product[0]?.category?.name || '';
  const subCategoryName = products?.product[0]?.subCategory?.subCategory || '';

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.data.error}</p>
      ) : (
        <>
          {products?.product.length === 0 ? (
            <div className="text-center text-gray-700 text-xl py-10">
              No products found.
            </div>
          ) : (
            <>
              <div className='text-4xl pb-4 border-b-4 border-blue-500 rounded mt-2 mb-3'>
                {categoryName}{selectedSubCategory !== '' && ` / ${subCategoryName}`}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.product.map((product, i) => {
                  const isProductInWishList = wishListProduct.some(
                    (item) => item.pId === product._id
                  );
                  return (
                    <div
                      key={i}
                      className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                    >
                      <img
                        src={
                          product.images[0]
                        }

                        alt={product.name}
                        className="w-full h-48 object-cover"
                        onClick={() => navigate(`/shop/${product._id}`)}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-[#F05025]">
                          {product.name}
                        </h3>
                        <p className="text-gray-700 font-semibold flex justify-between">
                          ${product.price}
                          <div>
                            {isProductInWishList ? (
                              <FaHeart
                                size={20}
                                fill="red"
                                onClick={() => handleWishListClick(product._id)}
                              />
                            ) : (
                              <FaRegHeart
                                size={20}
                                onClick={() => handleWishListClick(product._id)}
                              />
                            )}
                          </div>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SubcategoryProduct;
