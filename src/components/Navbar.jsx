import React, { useContext, useState } from "react";
import {logo} from "../assets";
import { Link, Navigate } from "react-router-dom";
import { MainContext } from "../context/Context";
import { IoWalletSharp } from "react-icons/io5";
import {
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useGetUserDetailsQuery,
} from "../redux/productSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: category } = useGetCategoryQuery();
  const { data: subCategory } = useGetSubCategoryQuery();

  const { data } = useGetUserDetailsQuery();

  const { cookie } = useContext(MainContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <div className="bg-[#8B7BCF] ">
        {/* Header part */}
        <div className="h-11 hidden lg:flex pl-5 text-[12px] max-w-[1300px] mx-auto text-white items-center justify-between">
          <p>
            This is where New Zealand’s Artists and Artisans meet Connoisseurs
            of fine art and craftsmanship
          </p>
          <p className="flex gap-3 items-center text-[13px]">
            <span >Follow us:</span>
            <a href="https://www.facebook.com" className="mr-4">
              <span className="elementor-icon-list-icon">
                <svg
                  aria-hidden="true"
                  className="e-font-icon-svg e-fab-facebook"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  fill="#fff"
                >
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                </svg>
              </span>
            </a>
          </p>
        </div>
      </div>

      <div className="bg-[#110f0f] relative">
        {/* Menu part */}
        <div className="h-20 flex items-center max-w-[1300px] lg:pr-4 mx-auto justify-between px-5 md:px-28 w-full">
          {/* Logo section */}
          <Link to='/'>
            <img src={logo} alt="Logo" width={190} className="cursor-pointer" />
          </Link>

          {/* Search bar */}
          {/* <form className="hidden xl:block mx-auto">
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
                className="block w-full text-white p-2 ps-2 bg-[#110f0f] text-sm border rounded-lg"
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
          </form> */}

          {/* Right menu and Menu icon for small screens */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div className="hidden xl:flex h-full items-center">
            <ul className="flex text-white gap-7  items-center font-semibold h-full">
              <li>
                <Link to="/" className="hover:text-[#ef9364] transition-all">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#ef9364] transition-all">
                  About
                </Link>
              </li>
              <li className="group h-full flex items-center">
                <Link
                  to="/shop"
                  className="hover:text-[#ef9364] transition-all focus:outline-none"
                >
                  Products <i className="fas fa-angle-down"></i>
                </Link>

                <ul className="absolute top-full left-0  bg-[#110f0f] z-[9999] w-full py-8 px-8 grid grid-cols-3 gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto transform -translate-y-2">
                  {category?.category?.map((cat) => {
                    return (
                      <div
                        key={cat._id}
                        className="flex flex-col items-center h-full"
                      >
                        <Link to={`/products/${cat._id}`} className="text-2xl mb-4 text-[#EF9364] text-center cursor-pointer">
                          {cat.name}
                        </Link>
                        <ul className="text-[14px] font-medium pl-16">
                          {subCategory?.subCategory
                            .filter((d) => d.category._id === cat._id) // Filter subcategories based on the current category
                            .map((d) => {
                              return (
                                <li key={d._id}>
                                  <Link
                                    to={`/products/${cat._id}/${d._id}`}
                                    className="hover:text-[#ef9364] transition-all"
                                  >
                                    {d.subCategory}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    );
                  })}
                </ul>
              </li>
              <li>
                <Link
                  to="/membership"
                  className="hover:text-[#ef9364] transition-all"
                >
                  Membership
                </Link>
              </li>
              {cookie.token ? (
                <>
                  {/* <li>
                    <Link
                      to="/admin/addProduct"
                      className="hover:text-[#ef9364] transition-all"
                    >
                      Create a Listing
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="hover:text-[#ef9364] transition-all"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="hover:text-[#ef9364] transition-all"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-[#ef9364] transition-all"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Sliding menu for small screens */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[99999999] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out xl:hidden`}
      >
        <div className="fixed right-0 top-0 h-full sm:w-1/3 w-2/3 bg-[#110f0f] p-5">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none mb-5"
          >
            <i className="fas fa-times"></i>
          </button>
          <ul className="flex flex-col text-white gap-5 font-semibold">
            <li>
              <Link
                to="/"
                className="hover:text-[#ef9364] transition-all"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[#ef9364] transition-all"
                onClick={toggleMenu}
              >
                About
              </Link>
            </li>
            <li>
            <Link
                to="/shop"
                className="hover:text-[#ef9364] transition-all"
                onClick={toggleMenu}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/membership"
                className="hover:text-[#ef9364] transition-all"
                onClick={toggleMenu}
              >
                Membership
              </Link>
            </li>
            {cookie.token !== "" ? (
              <>
                {/* <li>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-[#ef9364] transition-all"
                  >
                    Create a Listing
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-[#ef9364] transition-all"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-[#ef9364] transition-all"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-[#ef9364] transition-all"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
