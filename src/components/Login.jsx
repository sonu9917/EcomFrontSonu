import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig'; // Import Axios
import { toast } from 'react-toastify'; // Import toast for notifications
import { MainContext } from '../context/Context';
import Loader from "./Loader"; // Import the loader component

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // State to control the loader

  const navigate = useNavigate();
  const { setCookie } = useContext(MainContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader

    try {
      axios.post('/auth/login', formData)
        .then((response) => {
          setLoading(false); // Stop the loader
          if (response.status === 200) {
            toast.success('Login successful!');
            setCookie('token', response.data.token, { path: '/' });

            navigate('/admin/dashboard');

          }
        })
        .catch((err) => {
          setLoading(false); // Stop the loader
          toast.error(err.response.data.error); // Display error toast
        });
    } catch (error) {
      console.log(error)
      setLoading(false); // Stop the loader
      toast.error(error.response.data.error); // Display error toast
    }
  };

  return (
    <>
      {loading && <Loader />} {/* Show the loader if loading */}
      <section className="bg-[#F5F5F5] border">
        <div className="w-full mt-20 mb-20 flex justify-center px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl lg:max-w-[800px] p-[50px]  h-full shadow-2xl pb-24">
            <div className="text-[#EF9364] pt-7 text-center font-bold text-2xl lg:text-3xl">
              <h1 style={{textTransform:"uppercase"}}>Login</h1>
            </div>
            <form className="mt-4 mb-3 px-4" onSubmit={handleSubmit}>
              <div className="mt-3">
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
                  name="email"
                  className="border py-3 px-4 w-full mt-[10px]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="text-[#111827] font-medium text-sm lg:text-base leading-5"
                >
                  Password <span>*</span>
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border py-3 px-4 w-full mt-[10px]"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button type="submit" className="text-white rounded py-3 px-6 bg-[#EF9364] mt-5">
                Login
              </button>

              <div className="mt-4">
                <span className="text-[#046bd2] cursor-pointer" onClick={() => { navigate('/register') }}>Register</span> | if you not register here <br />
                <span className="text-[#046bd2] cursor-pointer" onClick={() => { navigate('/forgot-password') }}>Forgot Password</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
