import React, { useContext, useState, useEffect } from "react";
import axios from '../axiosConfig';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../context/Context";
import Loader from "./Loader"; // Import the loader component

const Register = () => {
  const { setCookie } = useContext(MainContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralCode: ""
  });
  const [loading, setLoading] = useState(false); // State to control the loader

  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  useEffect(() => {
    const ref = query.get('ref');
    if (ref) {
      setFormData(prevFormData => ({
        ...prevFormData,
        referralCode: ref
      }));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader

    axios.post("auth/register", formData)
      .then((response) => {

        if (response.status === 201) {
          axios.post('auth/login', formData).then((response) => {
            setLoading(false) // stop the loader
            setLoading(false); // Stop the loader
            if (response.status === 200) {
              toast.success('Login successful!');
              setCookie('token', response.data.token, { path: '/' });

              navigate('/admin/dashboard');

            }
          })
        }


      })
      .catch((error) => {
        setLoading(false); // Stop the loader
        // Handle error
        toast.error(error.response.data.error);
      });

  };

  return (
    <>
      {loading && <Loader />} {/* Show the loader if loading */}
      <section className="bg-white  border">
        <div className="w-full mt-20 mb-20  flex justify-center px-4">
          <div className="w-full rounded-2xl max-w-lg lg:max-w-[800px] p-12 h-full shadow-2xl">
            <div className="text-[#EF9364]  text-center font-bold text-2xl lg:text-3xl">
              <h1 style={{textTransform:"uppercase"}} className="pb-8">Registration</h1>
            </div>
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
                    onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-[#111827]  font-medium text-sm lg:text-base leading-5"
                  >
                    Last Name <span>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="lastName"
                    className="border py-3 px-4 w-full mt-[10px]"
                    value={formData.lastName}
                    onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }}
                    required
                  />
                </div>
              </div>


              <div className="mt-8">
                <label
                  htmlFor="email"
                  className="text-[#111827]  font-medium text-sm lg:text-base leading-5"
                >
                  Email <span>*</span>
                </label>
                <br />
                <input
                  type="email"
                  id="email"
                  className="border py-3 px-4 w-full mt-[10px]"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                  required
                />
              </div>


              <div className="mt-8">
                <label
                  htmlFor="password"
                  className="text-[#111827]  font-medium text-sm lg:text-base leading-5"
                >
                  Password <span>*</span>
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  className="border py-3 px-4 w-full mt-[10px]"
                  value={formData.password}
                  onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
                  required
                />
              </div>

              <div className="mt-8">
                <label
                  htmlFor="referalCode"
                  className="text-[#111827] font-medium text-sm lg:text-base leading-5"
                >
                  Referal code
                </label>
                <br />
                <input
                  type="string"
                  id="referalCode"
                  className="border py-3 px-4 w-full mt-[10px]"
                  value={formData.referralCode}
                  onChange={(e) => { setFormData({ ...formData, referralCode: e.target.value }) }}
                />
              </div>

              <button className="text-white rounded py-3 px-6 bg-[#EF9364] mt-5 font-medium" type="submit">
                Register
              </button>

              <div className="mt-4">
                <span className="text-[#046bd2] cursor-pointer" onClick={() => navigate('/login')}>Login</span> | if you already registered
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
