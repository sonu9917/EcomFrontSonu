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
      className="bg-cover h-[480px] relative grid grid-cols-1 md:grid-cols-2"
      style={{
        backgroundImage: `url(${newsLetterBg})`,
        backgroundPosition: "bottom center",
        backgroundColor: "#000",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#271919] opacity-[.71]"></div>

      <div className="z-10 text-white flex flex-col gap-6 justify-center p-8 md:pl-24 max-w-[1200px] mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Subscribe To <span className="text-[#F05025]">Our Newsletter</span>
        </h1>
        <p className="text-sm md:text-base lg:text-lg">
          Join our newsletter, so that we reach out to you with our best
          services and offers.
        </p>

        {/* Form Submission */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button
            type="submit"
            className="focus:outline-none text-white bg-[#f05025] hover:bg-white hover:text-[#f05025] focus:ring-4 focus:ring-purple-300 font-bold text-sm p-2.5 rounded w-full sm:w-auto"
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
    </section>
  );
};

export default NewsLetter;
