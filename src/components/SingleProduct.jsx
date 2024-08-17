import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useGetSingleProductQuery,
} from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/wishListSlice";
import ProductInquiry from "./ProductInquiry";
import ContectInformation from "./ContectInformation";
import Cookie from "js-cookie";
import NotLoggedIn from "./NotLoggedIn";

const SingleProduct = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductQuery(id);
  const { data: moreProducts } = useGetProductQuery();
  const token = Cookie.get("token");
  const [activeTab, setActiveTab] = useState("description");
  const [visibleProductsCount, setVisibleProductsCount] = useState(4);

  const dispatch = useDispatch();
  const wishList = useSelector((store) => store.wishList.data || []);

  console.log(moreProducts)

  const [isProductInWishList, setIsProductInWishList] = useState(false);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const isInWishList = wishList.some((item) => item.pId === id);
    setIsProductInWishList(isInWishList);
  }, [id, wishList]);

  useEffect(() => {
    if (data?.product.images.length > 0) {
      setMainImage(data.product.images[0]);
    }
  }, [data]);

  // Updated handleWishListClick function
  const handleWishListClick = (productId, isInWishList) => {
    if (isInWishList) {
      dispatch(removeFromWishList({ pId: productId }));
    } else {
      dispatch(addToWishList({ pId: productId }));
    }

    localStorage.setItem(
      "wishList",
      JSON.stringify(
        isInWishList
          ? wishList.filter((item) => item.pId !== productId)
          : [...wishList, { pId: productId }]
      )
    );
  };

  const handleShowMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 4);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="p-4 bg-white rounded-lg ">
            <p className="text-gray-700">{data?.product.description}</p>
          </div>
        );
      case "moreProducts":
        return (
          <div className="p-4 bg-white rounded-lg ">
            {/* <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              More Products
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {moreProducts?.product
                .slice(0, visibleProductsCount)
                .map((product, i) => {
                  const isProductInWishList = wishList.some(
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
                        <h2 className='mt-2 text-gray-400 text-[14px]'>{product.category.name}</h2>
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
            {/* <div className="flex justify-center">
              {visibleProductsCount < (moreProducts?.product.length || 0) && (
                <button
                  className=" px-4 py-2 bg-[#f05029] text-white font-semibold mt-10"
                  onClick={handleShowMoreProducts}
                >
                  Show More Products
                </button>
              )}
            </div> */}
          </div>
        );
      case "contactInfo":
        return (
          <div className="p-4 bg-white rounded-lg">
            {token ? <ContectInformation /> : <NotLoggedIn />}
          </div>
        );
      case "productInquiry":
        return (
          <div className="p-4 bg-white rounded-lg">
            {token ? <ProductInquiry id={id} /> : <NotLoggedIn />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div
        className="flex flex-col lg:flex-row sm:mx-8 lg:mx-16 xl:mx-32 mt-10 mb-10 gap-8"
        style={{ margin: "0 auto" }}
      >
        {/* Image Gallery */}
        <div className="flex flex-col w-full max-w-[550px] lg:w-1/2">
          {/* Main Image */}
          <div className="flex justify-center max-w-[550px] h-[500px] items-center mb-4 border rounded-lg bg-white shadow-lg">
            <img
              className="w-full h-full rounded-lg"
              src={mainImage}
              alt="Main Product"
            />
          </div>
          {/* Thumbnails */}
          {/* <div className="grid grid-cols-5 gap-4">
            {data?.product.images.map((image, i) => (
              <div
                key={i}
                className={`relative cursor-pointer border rounded-lg transition-transform transform hover:scale-105 ${
                  mainImage === image ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  className={`h-28 w-full rounded-lg ${
                    mainImage === image ? "ring-2 ring-blue-500" : ""
                  }`}
                  src={image}
                  alt={`Thumbnail ${i + 1}`}
                />
              </div>
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="flex flex-col w-full lg:w-1/2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#f05029] mb-4">
            {data?.product.name}
          </h1>
          <div className="flex items-center gap-4 sm:gap-7 mb-4">
            <div className="text-xl text-[#000] font-semibold">
              ${data?.product.price}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{data?.product.description}</p>
          <button
            className={`pt-2 pb-2 px-5 mt-5 max-w-[200px] h-[57px] text-white font-semibold rounded bg-[#f05029] transition-colors duration-300 hover:bg-[#e03e1f]`}
            // onClick={handleWishListClick}
            onClick={(e) => {
              e.stopPropagation();
              handleWishListClick(data?.product._id, isProductInWishList);
            }}
          >
            {isProductInWishList ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="hidden sm:flex justify-start mb-8 mt-8">
        <button
          onClick={() => setActiveTab("description")}
          className={`px-4 py-2 mx-2 text-lg font-semibold ${activeTab === "description"
            ? "bg-white text-black border-[#ef9364] border-t-4"
            : "bg-[#ef9364] text-white"
            } shadow-md transition-colors duration-300`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("moreProducts")}
          className={`px-4 py-2 mx-2 text-lg font-semibold ${activeTab === "moreProducts"
            ? "bg-white text-black border-[#ef9364] border-t-4"
            : "bg-[#ef9364] text-white"
            } shadow-md transition-colors duration-300`}
        >
          More Products
        </button>
        <button
          onClick={() => setActiveTab("contactInfo")}
          className={`px-4 py-2 mx-2 text-lg font-semibold ${activeTab === "contactInfo"
            ? "bg-white text-black border-[#ef9364] border-t-4"
            : "bg-[#ef9364] text-white"
            } shadow-md transition-colors duration-300`}
        >
          Contact Information
        </button>
        <button
          onClick={() => setActiveTab("productInquiry")}
          className={`px-4 py-2 mx-2 text-lg font-semibold ${activeTab === "productInquiry"
            ? "bg-white text-black border-[#ef9364] border-t-4"
            : "bg-[#ef9364] text-white"
            } shadow-md transition-colors duration-300`}
        >
          Product Inquiry
        </button>
      </div>

      {/* Tab Content */}
      <div className="pb-10">{renderContent()}</div>

      {/* Related Product */}
      <div className="p-4 bg-white rounded-lg ">
        <h2 className="text-[30px] font-thin capitalize text-left mb-[30px] text-[#7a7a7a]">
          Related Product
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {moreProducts?.product
            .slice(-4) // This selects the last four items from the array
            .map((product, i) => {
              const isProductInWishList = wishList.some(
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
                    <h2 className='mt-2 text-gray-400 text-[14px]'>{product.category.name}</h2>
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

    </div>
  );
};

export default SingleProduct;
