import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserDetailsQuery, useUpdateUserDetailsMutation } from "../redux/productSlice"; // Import the update mutation
import Loader from "../components/Loader";

const UserDetails = () => {
  const { data, refetch } = useGetUserDetailsQuery();
  const [updateUserDetails] = useUpdateUserDetailsMutation(); // Use the update mutation
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch, location]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (formData.currentPassword == '' && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await updateUserDetails({
        id: data.user._id,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      });

      // console.log(response)
      if (response.error) {
        if (response.error.data.message === 'Current password is incorrect') {
          toast.error("Current password is incorrect");
        } else {
          toast.error(response.error.data.message || "Failed to update user details");
        }
      } else {
        toast.success("User details updated successfully");
        refetch(); // Refetch user details after update
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update user details");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col p-4">
      <div className="w-full bg-white p-8">
        <h2 className="text-3xl font-bold mb-6 text-[#F05025]">
          Edit Account Details
        </h2>

        <form className="mt-4 mb-3 px-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-[#111827] mb-[10px] font-medium text-sm lg:text-base leading-5"
              >
                First Name <span>*</span>
              </label>
              <br />
              <input
                type="text"
                id="firstName"
                className="border py-3 px-4 w-full mt-[10px]"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="text-[#111827] font-medium text-sm lg:text-base leading-5"
              >
                Last Name <span>*</span>
              </label>
              <br />
              <input
                type="text"
                id="lastName"
                className="border py-3 px-4 w-full mt-[10px]"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <label
              htmlFor="email"
              className="text-[#111827] font-medium text-sm lg:text-base leading-5"
            >
              Email <span>*</span>
            </label>
            <br />
            <input
              type="email"
              id="email"
              className="border py-3 px-4 w-full mt-[10px]"
              value={formData.email}
              onChange={handleInputChange}
              disabled
              required
            />
          </div>

          <fieldset className="border p-4 rounded mt-10">
            <legend className="text-lg font-medium">Password Change</legend>

            <div className="mb-4 p-2">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 p-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 p-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 sm:text-sm"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </fieldset>

          <button
            className="text-white rounded py-3 px-6 bg-[#F05025] mt-5 font-medium"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
