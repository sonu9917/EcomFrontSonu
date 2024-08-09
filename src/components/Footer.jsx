import React from "react";
import { logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../redux/productSlice";


const Footer = () => {
  const navigate = useNavigate()
  const { data: category } = useGetCategoryQuery();
  return (
    <>
      <div className="bg-[#110f0f] border-t-[2px] border-white">
        <div className="max-w-[1200px] mx-auto py-8 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex justify-center md:justify-start">
            <img src={logo} onClick={() => navigate('/')} alt="Logo" className="cursor-pointer w-[190px] h-[57px] " />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#ef9364] text-xl font-semibold">
              QUICK LINKS
            </h1>
            <ul className="text-white font-normal text-[14px] flex flex-col gap-2">
              <li className="text-[#ef9364]">
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/about'} className="hover:text-[#ef9364] transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={'/membership'} className="hover:text-[#ef9364] transition-all">
                  Membership
                </Link>
              </li>
              <li>
                <Link to={'/contact'} className="hover:text-[#ef9364] transition-all">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to={'/return-policy'} className="hover:text-[#ef9364] transition-all">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to={'/terms-and-condition'} className="hover:text-[#ef9364] transition-all">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#ef9364] text-xl font-semibold">
              TOP CATEGORIES
            </h1>
            <ul className="text-white font-normal text-[14px] flex flex-col gap-2">
              {
                category?.category?.map((cat) => {
                  return (
                    <li>
                    <Link  to={`/products/${cat._id}`} className="hover:text-[#ef9364] transition-all">
                      {cat.name}
                    </Link>
                  </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-[#ef9364] text-xl font-semibold">CONTACT US</h1>
            <ul className="text-white font-normal text-[14px] flex flex-col gap-2">
              <li>
                <Link className="hover:text-[#ef9364] transition-all">
                  Customer Support:
                </Link>
              </li>
              <li>
                <a href="mailto:nzartrader@gmail.com" className="text-[#ef9364] transition-all">
                  nzartrader@gmail.com
                </a>
              </li>
            </ul>
            <div className="w-12 h-12 flex justify-center items-center rounded-full bg-[#3b5998]">
              <svg
                className="e-font-icon-svg e-fab-facebook"
                width={20}
                fill="#fff"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full h-[45px] bg-[#292929] text-white flex justify-center items-center">
          <p className="text-[12px] font-semibold">
            Copyright © 2024 Artrader. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
