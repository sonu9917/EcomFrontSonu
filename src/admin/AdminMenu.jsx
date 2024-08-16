import axios from "../axiosConfig";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery } from "../redux/productSlice";

const AdminMenu = ({ onMenuItemClick }) => {
  // const [active, setActive] = useState("Dashboard");
  const {active,setActive} = useContext(MainContext)
  const [hovered, setHovered] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { setCookie } = useContext(MainContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user, refetch, isError } = useGetUserDetailsQuery();

  useEffect(() => {
    refetch();
  }, [refetch, location]);

  useEffect(() => {
    // Function to check the screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Example breakpoint for small screens
    };

    // Add event listener to check screen size on resize
    window.addEventListener("resize", checkScreenSize);

    // Initial check
    checkScreenSize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isError) {
    console.error("Error fetching user details");
  }

  const handleSetActive = (item) => {
    setActive(item);
  };

  const logoutHandler = () => {
    axios
      .post("/auth/logout")
      .then((response) => {
        setCookie("token", "", { path: "/" });
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error logging out");
      });
  };

  const handleRedirect = (url, item) => {
    setActive(item);
    navigate(url);
    onMenuItemClick();
  };

  // Define menu items for different roles
  const commonMenuItems = [
    { name: "Dashboard", icon: "fas fa-tachometer-alt", path: "/admin/dashboard" },
    { name: "Subscription", icon: "fas fa-book", path: "/admin/membership" },
    { name: "All Products", icon: "fas fa-briefcase", path: "/admin/productList" },
    { name: "My WishList", icon: "fa-regular fa-heart", path: "/admin/wishList" },
    { name: "Share to friend", icon: "fa-solid fa-share", path: "/admin/refer" },
  ];

  const adminMenuItems = [
    { name: "Category", icon: "fas fa-tags", path: "/admin/categoryList" },
    { name: "Sub Category", icon: "fas fa-sitemap", path: "/admin/sub-categoryList" },
  ];

  const settingsItems = [
    { name: "Store", icon: "fas fa-store", path: "/admin/settings/store" },
    { name: "Payment", icon: "fas fa-credit-card", path: "/admin/settings/payment" },
    { name: "Shipping", icon: "fas fa-shipping-fast", path: "/admin/settings/shipping" },
    { name: "Social Profile", icon: "fas fa-user-circle", path: "/admin/settings/social-profile" },
    { name: "Store SEO", icon: "fas fa-chart-line", path: "/admin/settings/store-seo" },
  ];

  return (
    <>
      <ul className="h-full bg-[#1B233B] text-white relative">
        {commonMenuItems.map((item) => (
          <li
            key={item.name}
            className={`${
              active === item.name
                ? "bg-[#F05025] text-white font-bold"
                : hovered === item.name
                ? "bg-[#2d2d2d] text-gray-300"
                : "hover:bg-[#2d2d2d] text-gray-300"
            } w-full flex items-center pl-10 gap-3 p-2 cursor-pointer transition-colors duration-300`}
            onClick={() => handleRedirect(item.path, item.name)}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <i className={`text-[17px] ${item.icon}`}></i>
            <span>{item.name}</span>
          </li>
        ))}

        {user?.user.role === "super-admin" &&
          adminMenuItems.map((item) => (
            <li
              key={item.name}
              className={`${
                active === item.name
                  ? "bg-[#F05025] text-white font-bold"
                  : hovered === item.name
                  ? "bg-[#2d2d2d] text-gray-300"
                  : "hover:bg-[#2d2d2d] text-gray-300"
              } w-full flex items-center pl-10 gap-3 p-2 cursor-pointer transition-colors duration-300`}
              onClick={() => handleRedirect(item.path, item.name)}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <i className={`text-[17px] ${item.icon}`}></i>
              <span>{item.name}</span>
            </li>
          ))}

        <li
          className={`relative ${
            active === "Settings"
              ? "bg-[#F05025] text-white font-bold"
              : hovered === "Settings"
              ? "bg-[#2d2d2d] text-gray-300"
              : "hover:bg-[#2d2d2d] text-gray-300"
          } w-full flex items-center pl-10 gap-3 p-2 cursor-pointer transition-colors duration-300`}
          onMouseEnter={() => setHovered("Settings")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleSetActive("Settings")}
        >
          <i className="text-[17px] fas fa-cog"></i>
          <span>Settings</span>
          <i className="text-[17px] fas fa-caret-right menu-dropdown"></i>

          {hovered === "Settings" && (
            <ul
              className={`${
                isSmallScreen
                  ? "block" // On small screens, make the submenu a block element
                  : "absolute left-full top-0" // On larger screens, position it to the right
              } bg-[#1B233B] z-10 w-full lg:w-48 py-2`}
            >
              {settingsItems.map((subItem) => (
                <li
                  key={subItem.name}
                  className="flex items-center pl-3 gap-3 p-2 hover:bg-[#F05025] text-gray-300 cursor-pointer"
                  onClick={() => handleRedirect(subItem.path, subItem.name)}
                >
                  <i className={`text-[17px] ${subItem.icon}`}></i>
                  <span>{subItem.name}</span>
                </li>
              ))}
            </ul>
          )}
        </li>

        <div className="pl-7 flex gap-5 mt-1">
          <Link to="/admin/visitStore">
            <div
              className={`${
                active === "visitStore"
                  ? "bg-[#F05025] text-white font-bold"
                  : hovered === "visitStore"
                  ? "bg-[#2d2d2d] text-gray-300"
                  : "hover:bg-[#2d2d2d] text-gray-300"
              } p-5 cursor-pointer transition-colors duration-300`}
              onClick={() => handleRedirect("/admin/visitStore", "visitStore")}
              onMouseEnter={() => setHovered("visitStore")}
              onMouseLeave={() => setHovered(null)}
            >
              <i className="text-[17px] fas fa-external-link-alt"></i>
            </div>
          </Link>
          <Link to="/admin/userDetails">
            <div
              className={`${
                active === "user"
                  ? "bg-[#F05025] text-white font-bold"
                  : hovered === "user"
                  ? "bg-[#2d2d2d] text-gray-300"
                  : "hover:bg-[#2d2d2d] text-gray-300"
              } p-5 cursor-pointer transition-colors duration-300`}
              onMouseEnter={() => setHovered("user")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setActive("user"); // Set the active item to logout
              }}
            >
              <i className="text-[17px] fas fa-user"></i>
            </div>
          </Link>
          <div
            className={`${
              active === "logout"
                ? "bg-[#F05025] text-white font-bold"
                : hovered === "logout"
                ? "bg-[#2d2d2d] text-gray-300"
                : "hover:bg-[#2d2d2d] text-gray-300"
            } p-5 cursor-pointer transition-colors duration-300`}
            onClick={() => {
              logoutHandler();
              setActive("logout"); // Set the active item to logout
            }}
            onMouseEnter={() => setHovered("logout")}
            onMouseLeave={() => setHovered(null)}
          >
            <i className="text-[17px] fas fa-power-off"></i>
          </div>
        </div>
      </ul>
    </>
  );
};

export default AdminMenu;
