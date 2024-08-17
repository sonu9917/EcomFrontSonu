import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductsByCategoryAndSubcategoryQuery } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import { addToWishList, removeFromWishList } from '../redux/wishListSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import NoProductFound from './NoProductFound';

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
    <div className="max-w-[1240px] mx-auto px-4 pb-5">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error.data.error}</p>
      ) : (
        <>
          {products?.product.length === 0 ? (
            <div className="text-center text-gray-700 text-xl pb-5">
              <NoProductFound />
            </div>
          ) : (
            <>
              <div className='text-4xl pb-4  rounded mt-2 mb-3'>

                {
                  categoryName != '' ? subCategoryName : categoryName
                }

                {/* {categoryName}{selectedSubCategory !== '' && ` / ${subCategoryName}`} */}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.product.map((product, i) => {
                  const isProductInWishList = wishListProduct.some(
                    (item) => item.pId === product._id
                  );
                  return (
                    <div
                      key={i}
                      className="border pl-4 pt-3 cursor-pointer "
                    >
                      <div className='w-[265px] h-[262px]'>
                        <img
                          src={
                            product.images[0]
                          }

                          alt={product.name}
                          className="w-full h-full object-cover"
                          onClick={() => navigate(`/shop/${product._id}`)}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className='mt-2 text-gray-400 text-[14px]'>{categoryName}</h2>
                        <h3 className="text-xl  font-medium text-[#3a3c3c]">
                          {product.name}
                        </h3>
                        <p className="text-gray-700 text-xl font-medium flex justify-between">
                          ${product.price}
                        </p>
                        <button
                          className={`pt-1 pb-1 px-3 mt-2 mb-5 w-[200px]  text-white  rounded bg-[#f05029] transition-colors duration-300 hover:bg-[#e03e1f]`}
                          onClick={() => handleWishListClick(product._id)}
                        >
                          {isProductInWishList
                            ? "Remove Wishlish"
                            : "Add Wishlist"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Related Product */}
              <div className="p-4 bg-white rounded-lg ">
                <h2 className="text-[30px] font-thin capitalize text-left mb-[30px] text-[#7a7a7a]">
                  Related Product
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products?.product
                    .slice(-4) // This selects the last four items from the array
                    .map((product, i) => {
                      const isProductInWishList = wishListProduct.some(
                        (item) => item.pId === product._id
                      );
                      return (
                        <div
                          key={i}
                          className="border pl-2 pt-3 shadow-lg cursor-pointer"
                        >
                          <div className="w-[265px] h-[262px]">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onClick={() => navigate(`/shop/${product._id}`)}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <h2 className='mt-2 text-gray-400 text-[14px]'>{categoryName}</h2>
                            <h3 className="text-xl font-medium text-[#3a3c3c]">
                              {product.name}
                            </h3>
                            <p className="text-gray-700 text-xl font-medium flex justify-between">
                              ${product.price}
                            </p>
                            <button
                              className={`pt-1 pb-1 px-3 mt-2 mb-5 w-[200px] text-white rounded bg-[#f05029] transition-colors duration-300 hover:bg-[#e03e1f]`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWishListClick(
                                  product._id,
                                  isProductInWishList
                                );
                              }}
                            >
                              {isProductInWishList
                                ? "Remove from Wishlist"
                                : "Add to Wishlist"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>



            </>
          )}
        </>
      )}
    </div>
  );
};

export default SubcategoryProduct;
