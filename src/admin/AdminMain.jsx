import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AdminMenu from "./AdminMenu";

const AdminMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-4">
        <h1 className="text-3xl mt-4 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {isMenuOpen ? "Close Menu" : "Open Menu"}
            </button>
            {isMenuOpen && <AdminMenu onMenuItemClick={handleMenuItemClick} />}
          </div>
          <div className="hidden lg:block">
            <AdminMenu onMenuItemClick={handleMenuItemClick} />
          </div>
          <div className="col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminMain;
