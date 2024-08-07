import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Membership from "./components/Membership";
import ProductPage from "./components/ProductPage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMain from "./admin/AdminMain";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import ThankYouPage from "./components/ThankYouPage";
import ReferralLink from "./admin/ReferralLink";
import { useGetUserDetailsQuery } from "./redux/productSlice";
import CategoryList from './admin/CategoryList'
import AddCategory from "./admin/AddCategory";
import SubCategory from "./admin/SubCategory";
import AddSubCategory from "./admin/AddSubCategory";
import SingleProduct from "./components/SingleProduct";
import UserDetails from "./admin/UserDetails";
import WishListProduct from "./admin/WishListProduct";
import ForgotPassword from "./components/ForgotPassword";
import Otp from "./components/Otp";
import ResetPassword from "./components/ResetPassword";
import Cookie from 'js-cookie';
import PayoutForm from "./admin/PayoutForm";
import SubcategoryProduct from "./components/SubcategoryProduct";
import Contect from "./components/Contect";
import ReturnPolicy from "./components/ReturnPolicy";
import TermsAndConditions from "./components/TermsAndCondition";
import FailedPayment from "./components/FailedPayment";
import MembershipCheckout from "./components/MembershipCheckout";
import VisitStore from "./admin/VisitStore";
import PaymentMethods from "./admin/PaymentMethods";
import ShippingSettings from "./admin/ShippingSettings";
import SocialLinks from "./admin/SocialLinks";
import StoreSeo from "./admin/StoreSeo";
import AddStore from "./admin/AddStore";
import EditCategory from "./admin/EditCategory";
import EditSubCategory from "./admin/EditSubCategory";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/membership",
          element:
            <ProtectedRoutesForWithOutLogin>
              <Membership />
            </ProtectedRoutesForWithOutLogin>
        },
        {
          path: "/shop",
          element: <ProductPage />,
        },
        {
          path: "checkout/success/:sessionId/key/:key",
          element: <ThankYouPage />,
        },
        {
          path: "/shop/:id",
          element: <SingleProduct />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/products",
          element: <ProductPage />,
        },
        {
          path: "/contact",
          element: <Contect />,
        },
        {
          path: "/return-policy",
          element: <ReturnPolicy />,
        },
        {
          path: "/terms-and-condition",
          element: <TermsAndConditions />,
        },
        {
          path: "/otp",
          element: <Otp />,
        },
        {
          path: "/products/:categoryId/:subcategoryId?",
          element: <SubcategoryProduct />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "failed-payment",
          element: <FailedPayment />,
        },
        {
          path: "checkout",
          element: <MembershipCheckout />,
        },

      ],
    },
    {
      path: "/admin",
      element: <AdminMain />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "addProduct",
          element: (
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "productList",
          element: (
            <ProtectedRoutesForAdmin>
              <ProductList />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "editProduct/:id",
          element: (
            <ProtectedRoutesForAdmin>
              <EditProduct />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "membership",
          element:
            <ProtectedRoutesForWithOutLogin>
              <Membership />,
            </ProtectedRoutesForWithOutLogin>
        },
        {
          path: "categoryList",
          element: <CategoryList />,
        },
        {
          path: "addCategory",
          element: <AddCategory />,
        },
        {
          path: "editCategory/:id",
          element: <EditCategory/>,
        },
        {
          path: "sub-categoryList",
          element: <SubCategory />,
        },
        {
          path: "addSubCategory",
          element: <AddSubCategory />,
        },
        {
          path: "editSubCategory/:id",
          element: <EditSubCategory />,
        },
        {
          path: "payOut",
          element: <PayoutForm />,
        },
        {
          path: "refer",
          element: (
            <ProtectedRoutesForAdmin>
              <ReferralLink />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "userDetails",
          element: (
            <ProtectedRoutesForAdmin>
              <UserDetails />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoutesForAdmin>
              <WishListProduct />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "visitStore",
          element: (
            <ProtectedRoutesForAdmin>
              <VisitStore />
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "settings/payment",
          element: (
            <ProtectedRoutesForAdmin>
              <PaymentMethods/>
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "settings/shipping",
          element: (
            <ProtectedRoutesForAdmin>
              <ShippingSettings/>
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "settings/social-profile",
          element: (
            <ProtectedRoutesForAdmin>
              <SocialLinks/>
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "settings/store-seo",
          element: (
            <ProtectedRoutesForAdmin>
              <StoreSeo/>
            </ProtectedRoutesForAdmin>
          ),
        },
        {
          path: "settings/store",
          element: (
            <ProtectedRoutesForAdmin>
              <AddStore/>
            </ProtectedRoutesForAdmin>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        autoClose={1000}
      />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

// Protected Routes For Admin

export const ProtectedRoutesForAdmin = ({ children }) => {
  const { data, isLoading, isError } = useGetUserDetailsQuery();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching user data
  }

  if (isError || !data || !data.user) {
    return <Navigate to="/login" state={{ from: location }} replace />; // Redirect to login if there's an error or no user data
  }

  if (data.user.role === "admin" || data.user.role === "super-admin") {
    return children; // Render children if user is an admin
  } else {
    return (
      <Navigate
        to="/admin/membership"
        state={{ from: location }}
        replace
      />
    );
  }
};

// Protected Routes For WithOutLogin
export const ProtectedRoutesForWithOutLogin = ({ children }) => {

  const token = Cookie.get('token');

  if (token) {
    return children;
  } else {
    return (
      <Navigate to="/login" />
    );
  }
};
