import React from "react";
import newsLetterBg from '../images/bg.jpg'

const NewsLetter = () => {
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
          Join our newsletter, so that we reach out to you with our best services and offers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <input
            type="email"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
          <button
            type="button"
            className="focus:outline-none text-white bg-[#f05025] hover:bg-white hover:text-[#f05025] focus:ring-4 focus:ring-purple-300 font-bold text-sm p-2.5 rounded w-full sm:w-auto"
          >
            SEND
          </button>
        </div>
      </div>
    </section>

  );
};

export default NewsLetter;
