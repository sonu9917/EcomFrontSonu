import React from "react";
import { Link } from "react-router-dom";
import { useGetAdminProductQuery, } from "../redux/productSlice";

const Dashboard = () => {
  const { data } = useGetAdminProductQuery();

  return (
    <div>
      <div className="w-full h-28 text-[18px] flex justify-center items-center flex-col border">
        Pageview
        <span className="text-[28px] text-[#7e70c9] font-bold leading-8">
          {data?.adminProduct.length || 0}
        </span>
      </div>

      <div className="mt-5 border ">
        <div className="ml-4 mr-4 bg-[#1B233B]  h-16 flex justify-between items-center text-white pl-4 pr-4">
          <div>
            <i className="fas fa-briefcase text-xl" aria-hidden="true"></i>
            <span className="pl-4 font-bold text-xl">Products</span>
          </div>
          <Link to={"/admin/addProduct"}>
            <div className="text-xl font-medium cursor-pointer">
              + Add new product
            </div>
          </Link>
        </div>

        <div className="ml-4 mr-4 mt-1 mb-1 flex justify-between items-center  pl-4 pr-4">
          <div>
            <span className="pl-4  ">Total</span>
          </div>
          <div className="text-xl ">{data?.adminProduct.length || 0} </div>
        </div>

        <div className="ml-4 mr-4 mt-1 mb-1 flex justify-between items-center  pl-4 pr-4">
          <div>
            <span className="pl-4  ">Live</span>
          </div>
          <div className="text-xl ">0</div>
        </div>

        <div className="ml-4 mr-4 mt-1 mb-1 flex justify-between items-center  pl-4 pr-4">
          <div>
            <span className="pl-4  ">Offline</span>
          </div>
          <div className="text-xl ">0</div>
        </div>
        <div className="ml-4 mr-4 mt-1 mb-1 flex justify-between items-center  pl-4 pr-4">
          <div>
            <span className="pl-4  ">Pending Review</span>
          </div>
          <div className="text-xl ">0</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
