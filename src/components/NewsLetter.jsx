import React, { useState } from "react";
import { newsLetterBg } from "../assets";

const NewsLetter = () => {
  // State to manage email input
  const [email, setEmail] = useState("");
  // State to manage feedback message
  const [message, setMessage] = useState("");

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Send email to your backend or third-party service
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // If the response is successful
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear email input
      } else {
        // If the response is an error
        setMessage("There was an error subscribing. Please try again.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("There was an error subscribing. Please try again.");
    }
  };

  return (
    <section
      className="bg-cover  h-[480px] relative  grid-cols-1 md:grid-cols-1"
      style={{
        backgroundImage: `url(${newsLetterBg})`,
        backgroundPosition: "bottom center",
        backgroundColor: "#000",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#271919] opacity-[.71]"></div>

      <div className="h-full text-white max-w-[1300px] mx-auto">
        <div className="max-w-[1140px] ml-24 z-10 absolute  h-full flex flex-col gap-6 justify-center  p-4 md:p-0 pt-32">
          <h1 className="text-2xl md:text-3xl lg:text-[30px] font-semibold">
            Subscribe To <span className="text-[#F05025]">Our Newsletter</span>
          </h1>
          <p className="text-sm md:text-base w-full">
            Join our newsletter, so that we reach out to you with our best
            services and offers.
          </p>

          {/* Form Submission */}
          <form onSubmit={handleSubmit} className="flex flex-row gap-3 w-full items-center">
            <input
              type="email"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="flex-1 bg-gray-50 border xl:w-[630px] placeholder:pl-4 border-gray-300 text-gray-900 text-sm rounded-sm"
              placeholder="name@flowbite.com"
              value={email}
              onChange={handleEmailChange}
              required
              style={{
                height: '50px',
                minWidth: '0', // Allow flexbox to control width
              }}
            />
            <button
              type="submit"
              className="flex-shrink-0 text-white bg-[#f05025] font-bold text-sm p-2.5 rounded-sm"
              style={{
                height: '50px',
                minWidth: '120px', // Fixed width for the button
              }}
            >
              SEND
            </button>
          </form>

          {/* Feedback Message */}
          {message && (
            <div className="text-white text-sm mt-4">
              {message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
