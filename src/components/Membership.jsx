import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../axiosConfig";
import {
  useGetAllCheckoutQuery,
  useGetUserDetailsQuery,
} from "../redux/productSlice";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Modal from "./Modal";
import { MainContext } from "../context/Context";

const Membership = () => {
  const REACT_APP_STRIPE_PUBLIC_KEY =
    "pk_test_51PYjeZ2K1YkP5vT5b2grYSC7LorDqu5YqkNfXWLEQwCNrBFzD9mPcpKT71uU4hW3hnTPAJo7cgZpTkimEFD4Amsz00HQPRGbHG";
  const stripePromise = loadStripe(REACT_APP_STRIPE_PUBLIC_KEY);

  const { data, refetch } = useGetUserDetailsQuery();
  const { data: checkout, refetch: checkoutRefetch } = useGetAllCheckoutQuery();

  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const location = useLocation();

  const [filterCheckoutExpiryDate, setFilterCheckoutExpiryDate] = useState("");

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const { membershipOptions,setActive } = useContext(MainContext);

  useEffect(()=>{
    setActive("Subscription")
  },[])

  // user click on upgrade memberhsip button
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState("6-month");

  const openUpgradeModal = () => setIsUpgradeModalOpen(true);
  const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

  const handleUpgrade = () => {
    console.log(membershipOptions);
    if (selectedMembership == "6-month") {
      extendMembership(membershipOptions[0]); // Replace with your actual function
      closeUpgradeModal();
    } else if (selectedMembership == "12-month") {
      extendMembership(membershipOptions[1]); // Replace with your actual function
      closeUpgradeModal();
    }
  };

  console.log(selectedMembership);

  // Use effect to get user checkout and filter expiry date
  useEffect(() => {
    const userId = data?.user?._id;

    console.log(userId);

    if (!userId) {
      console.error("User ID is not defined.");
      return;
    }

    // Find the most recent checkout record for the user
    const userCheckouts = checkout?.checkout.find(
      (item) => item.userId === userId
    );

    // console.log(userCheckouts)

    if (userCheckouts) {
      setFilterCheckoutExpiryDate(userCheckouts.expirationDate);
    } else {
      console.log("No checkout records found for this user.");
      setFilterCheckoutExpiryDate("");
    }
  }, [checkout, data]);

  // Use effect to refetch data on location change
  useEffect(() => {
    refetch();
    checkoutRefetch();
  }, [location]);

  // Check if membership is expiring soon
  const isExpiringSoon = () => {
    if (!filterCheckoutExpiryDate) return false;

    const expiryDate = new Date(filterCheckoutExpiryDate);
    const today = new Date();
    const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
    return expiryDate < oneMonthLater && expiryDate >= today;
  };

  // Check if membership is expired
  const isMembershipExpired = () => {
    if (!filterCheckoutExpiryDate) return false;

    const expiryDate = new Date(filterCheckoutExpiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  // Update user role and subscription
  const updateUserRoleAndSubscription = async () => {
    if (!data || !data.user) return;

    try {
      await axios.post("/auth/update-role-subscription", {
        userId: data.user._id,
        role: "user",
        subscription: null,
      });
      refetch();
      toast.success("User role and subscription updated successfully.");
    } catch (error) {
      console.error("Error updating user role and subscription:", error);
      toast.error("Failed to update user role and subscription.");
    }
  };

  // Delete expired membership products
  const deleteExpiredMembershipProducts = async () => {
    if (!data || !data.user) return;

    try {
      await axios.post("/product/delete-expired", {
        userId: data.user._id,
      });
      toast.success("Products deleted successfully.");
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products.");
    }
  };

  // Use effect to handle expired memberships
  useEffect(() => {
    if (isMembershipExpired()) {
      updateUserRoleAndSubscription();
      deleteExpiredMembershipProducts();
    }
  }, [filterCheckoutExpiryDate]);

  // Function to extend membership
  const extendMembership = async (membershipOption) => {
    console.log(membershipOption);
    const stripe = await stripePromise;
    setLoading(true);

    try {
      const response = await axios.post("/checkout/create-checkout-session", {
        items: membershipOption,
        extend: true,
        currentExpiryDate: filterCheckoutExpiryDate,
        userId: data.user._id,
      });

      const sessionId = response.data.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
        toast.error("There was an error redirecting to checkout.");
      }
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
      toast.error("Failed to initiate Stripe checkout.");
    } finally {
      setLoading(false);
    }
  };

  // console.log(data.user._id)

  // Function to make payment
  const makePayment = async (membershipOption, extend = false) => {
    const stripe = await stripePromise;
    setLoading(true);

    try {
      const response = await axios.post("/checkout/create-checkout-session", {
        items: membershipOption,
        extend,
        currentExpiryDate: filterCheckoutExpiryDate,
        userId: data.user._id,
      });

      const sessionId = response.data.sessionId;

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
        toast.error("There was an error redirecting to checkout.");
      }
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
      toast.error("Failed to initiate Stripe checkout.");
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel membership
  const cancelMembership = async () => {
    if (!data || !data.user) return;
    setIsCancelModalOpen(false);
    setCanceling(true);

    try {
      await axios.post("/subscription/cancel", {
        userId: data.user._id,
      });
      refetch();
      toast.success("Membership cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling membership:", error);
      toast.error("Failed to cancel membership.");
    } finally {
      setCanceling(false);
      setIsCancelModalOpen(false);
    }
  };

  // Function to download invoice
  const downloadInvoice = async () => {
    if (!data || !data.user) return;

    try {
      const response = await axios.post("/checkout/get-invoice", {
        userId: data.user._id,
      });

      const { invoiceUrl } = response.data;
      console.log(invoiceUrl);
      if (invoiceUrl) {
        window.open(invoiceUrl, "_blank");
      } else {
        console.error("No invoice URL returned");
      }
    } catch (error) {
      console.error("Error fetching invoice:", error);
      toast.error("Failed to fetch invoice.");
    }
  };

  // const membershipOptions = [
  //   {
  //     name: "6-Months Membership",
  //     price: 5000,
  //     key: "6-month",
  //     PriceId: "price_1Phpln2K1YkP5vT5spde3jIf",
  //   },
  //   {
  //     name: "12-Months Membership",
  //     price: 9000,
  //     key: "12-month",
  //     PriceId: "price_1PhpOq2K1YkP5vT5KROUFZCD",
  //   },
  // ];

  const userSubscription = data?.user?.subscription;
  // console.log(userSubscription)

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12">
      {loading && <Loader />}
      {canceling && <Loader />}

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#1F2A3C] mt-10 mb-5">
        Membership
      </h1>

      {userSubscription ? (
        <>
          <div>
            {!isMembershipExpired() && (
              <p className="text-sm text-gray-500 mb-2">
                {`Your have purchased ${userSubscription} Membership `} <br />
                Your membership is active and will expire on{" "}
                {new Date(filterCheckoutExpiryDate).toLocaleDateString()}.
              </p>
            )}

            {isMembershipExpired() && (
              <p className="text-sm text-red-500">
                Your membership has expired. Please renew to continue using the
                services.
              </p>
            )}

            <div className="mt-5">
              {userSubscription === "6-month" && (
                <div className="flex gap-4 mb-5 justify-between">
                  <div className="">
                    <button
                      onClick={openUpgradeModal}
                      class="px-4 py-2 bg-orange-500 text-white font-semibold"
                    >
                      Upgrade Membership
                    </button>

                    <button
                      onClick={() => setIsCancelModalOpen(true)}
                      className="px-4 py-2 bh-white text-red-500 font-semibold"
                    >
                      Cancel Membership
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={downloadInvoice}
                      className="px-5 py-2 bg-green-500 mr-5 text-white font-semibold"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5">
              {userSubscription === "12-month" && (
                <div className="flex gap-4 mb-5 justify-between">
                  <div className="">
                    <button
                      onClick={openUpgradeModal}
                      class="px-4 py-2 bg-orange-500 text-white font-semibold"
                    >
                      Upgrade Membership
                    </button>

                    <button
                      onClick={() => setIsCancelModalOpen(true)}
                      className="px-4 py-2 bh-white text-red-500 font-semibold"
                    >
                      Cancel Membership
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={downloadInvoice}
                      className="px-5 py-2 bg-green-500 mr-5 text-white font-semibold"
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {membershipOptions.map((option, index) => {
              let buttonLabel = "Buy Now";
              let onClickHandler = () => makePayment(option);
              const isUserSubscribed = userSubscription === option.key;

              if (isMembershipExpired()) {
                buttonLabel = "Buy Now";
                onClickHandler = () => makePayment(option);
              } else if (
                isExpiringSoon() &&
                (userSubscription === "12-month" ||
                  userSubscription === option.key)
              ) {
                buttonLabel = "Extend Membership";
                onClickHandler = () => extendMembership(option);
              } else if (isUserSubscribed) {
                buttonLabel = "Extend Membership";
                onClickHandler = () => extendMembership(option);
              } else if (
                userSubscription === "12-month" &&
                option.key === "6-month"
              ) {
                buttonLabel = "Extend Membership";
                onClickHandler = () => extendMembership(option);
              } else if (
                userSubscription === "6-month" &&
                option.key === "12-month"
              ) {
                buttonLabel = "Upgrade to 12-Month Membership";
                onClickHandler = () => makePayment(option, true);
              }

              return (
                <div key={index} className="bg-white shadow-md rounded-lg p-5">
                  <div className="text-center text-3xl md:text-4xl font-bold bg-[#2A293E] text-white py-3 border-b">
                    ${option.price / 100}.00
                  </div>
                  <div className="text-center text-xl md:text-2xl font-bold bg-[#2A293E] text-white py-3">
                    {option.name}
                  </div>
                  <div className="text-center p-4 md:p-8 text-[#2E2E2E] flex flex-col gap-5">
                    <p>
                      A free Registration enables access to vendor’s contact
                      details and the addition of products to a wish list.
                    </p>
                    <p>
                      A paid Membership enables Members to create and advertise
                      an unlimited number of products, Member’s profiles and
                      their contact details during the duration of the chosen
                      Membership term.
                    </p>
                    <p>
                      Each individual advertisement is limited to 5 images but
                      has no restrictions on text.
                    </p>
                    <p>
                      Given that no commission is required on any sales, members
                      are responsible for negotiating all transactions,
                      coordinating payments, and arranging shipping with buyers
                      directly.
                    </p>
                    <p>
                      A portion of all membership fees will be utilized for the
                      marketing and enhancement of the website and its content.
                    </p>
                    <p>
                      <b>
                        A Member will receive a $10 referral fee for each new
                        Member referral.
                      </b>
                    </p>
                    <p>
                      <b>Unlimited</b> Products
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className={`w-[250px] py-3 px-4 ${
                        buttonLabel === "Cancel Membership"
                          ? "bg-red-500 text-white"
                          : "bg-[#F05025] text-white"
                      }`}
                      onClick={onClickHandler}
                    >
                      {buttonLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upgrade Membership Modal */}
          {isUpgradeModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-xl font-semibold mb-4">
                  Choose a Membership
                </h3>
                <select
                  value={selectedMembership}
                  onChange={(e) => setSelectedMembership(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                >
                  <option value="" disabled>
                    Select membership type
                  </option>
                  <option value="6-month">6-Month Membership</option>
                  <option value="12-month">12-Month Membership</option>
                  {/* Add more options as needed */}
                </select>
                <div className="flex justify-end">
                  <button
                    onClick={handleUpgrade}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Upgrade Membership
                  </button>
                  <button
                    onClick={closeUpgradeModal}
                    className="ml-2 px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <p className="text-lg text-gray-700 mb-5">
            You do not have an active membership. Please choose a plan and
            subscribe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {membershipOptions.map((option, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-5">
                <div className="text-center text-3xl md:text-4xl font-bold bg-[#2A293E] text-white py-3 border-b">
                  ${option.price / 100}.00
                </div>
                <div className="text-center text-xl md:text-2xl font-bold bg-[#2A293E] text-white py-3">
                  {option.name}
                </div>
                <div className="text-center p-4 md:p-8 text-[#2E2E2E] flex flex-col gap-5">
                  <p>
                    A free Registration enables access to vendor’s contact
                    details and the addition of products to a wish list.
                  </p>
                  <p>
                    A paid Membership enables Members to create and advertise an
                    unlimited number of products, Member’s profiles and their
                    contact details during the duration of the chosen Membership
                    term.
                  </p>
                  <p>
                    Each individual advertisement is limited to 5 images but has
                    no restrictions on text.
                  </p>
                  <p>
                    Given that no commission is required on any sales, members
                    are responsible for negotiating all transactions,
                    coordinating payments, and arranging shipping with buyers
                    directly.
                  </p>
                  <p>
                    A portion of all membership fees will be utilized for the
                    marketing and enhancement of the website and its content.
                  </p>
                  <p>
                    <b>
                      A Member will receive a $10 referral fee for each new
                      Member referral.
                    </b>
                  </p>
                  <p>
                    <b>Unlimited</b> Products
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    className="w-[250px] py-3 px-4  bg-[#F05025] text-white"
                    onClick={() => makePayment(option)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={cancelMembership}
        title="Confirm Cancellation"
        message="Are you sure you want to cancel your membership?"
      />
    </div>
  );
};

export default Membership;
