import React, { useEffect, useState } from "react";
import {
  useGetCategoryQuery,
  useGetProductsByCategoryAndSubcategoryQuery,
  useGetSubCategoryQuery,
} from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/wishListSlice";
import Pagination from "./Pagination"; // Create a separate Pagination component

const ProductPage = () => {
  const { data: category } = useGetCategoryQuery();
  const { data: subCategory } = useGetSubCategoryQuery();

  const dispatch = useDispatch();
  const [wishListProduct, setWishListProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Fetch products based on category, subcategory, search query, and pagination
  const {
    data: productsData,
    error,
    isLoading,
  } = useGetProductsByCategoryAndSubcategoryQuery({
    categoryId: selectedCategory,
    subcategoryId: selectedSubCategory,
    searchQuery: searchQuery,
    page: currentPage,
    limit: itemsPerPage,
  });

  // console.log(productsData)

  // Calculate the total number of products
  const totalProducts = productsData?.totalProducts || 0;

  // Load wishlist data from local storage on initial render
  useEffect(() => {
    const lsData = localStorage.getItem("wishList");
    if (lsData) {
      const parsedWishList = JSON.parse(lsData);
      setWishListProduct(parsedWishList);
      parsedWishList.forEach((item) => {
        dispatch(addToWishList({ pId: item.pId }));
      });
    }
  }, [dispatch]);

  // Handle adding/removing products from the wishlist
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

  const navigate = useNavigate();

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory("");
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle subcategory selection
  const handleSubCategoryClick = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
    setCurrentPage(1); // Reset to first page on subcategory change
  };

  return (
    <div className="max-w-[1200px] mx-auto mb-12 p-0 sm:p-8">
      <div>
        <h1 className="mb-8 text-3xl font-bold text-[#F05025]">Shop</h1>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="px-4 py-2 bg-[#F05025] text-white rounded-lg"
          >
            {filterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div
            className={`border p-6 ${filterVisible ? "block" : "hidden"} lg:block`}
          >
            {/* Search Bar */}
            <form className="hidden xl:block mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Type..."
                  required=""
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </form>

            {/* Categories */}
            <div>
              <h1 className="mt-6 mb-6 text-xl font-bold">Categories</h1>
            </div>

            {category?.category.map((cat) => (
              <div key={cat._id} className="border-dotted mb-2 border-b-2 pb-2">
                <h1
                  className={`cursor-pointer ${selectedCategory === cat._id ? "text-[#F05025] font-bold" : "text-[#F05025]"
                    }`}
                  onClick={() => handleCategoryClick(cat._id)}
                >
                  {cat.name}
                </h1>
                <ul className="list-disc pl-4 ml-2">
                  {subCategory?.subCategory
                    .filter((subCat) => subCat.category._id === cat._id)
                    .map((subCat) => (
                      <li
                        key={subCat._id}
                        className={`cursor-pointer ${selectedSubCategory === subCat._id ? "text-[#F05025] font-semibold" : ""
                          }`}
                        onClick={() => handleSubCategoryClick(subCat._id)}
                      >
                        {subCat.subCategory}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-3 border p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, totalProducts)} of{" "}
                {totalProducts} products
              </div>
            </div>
            {isLoading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error.message}</p>
            ) : productsData?.product.length === 0 ? (
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold text-gray-700">
                  No Products Found
                </h2>
                <p className="text-gray-500">
                  Try changing the category or subcategory, or adjust your search
                  query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsData?.product.map((product, i) => {
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
            )}

            {
              productsData?.product.length === 0 ? (
                ''
              ) : (
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalProducts}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              )
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
