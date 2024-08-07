import React, { useEffect } from "react";
import {backgroundImage,smallScreenBanner} from "../assets";
import ProductSlider from "./ProductSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsLetter from "./NewsLetter";



const Home = () => {


  return (
    <>
      {/* first section */}
      <section
        className="min-h-screen bg-cover flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center center",
        }}
      >
        <div className="max-w-[1140px] mx-auto px-4">
          <div className="text-center flex items-center flex-col mb-5 font-semibold">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[70px]">
              <span className="text-[#8B7BCF]">Empowering</span> Creators,
            </h1>
            <h1 className="text-[#F05025] text-4xl sm:text-5xl md:text-6xl lg:text-[70px]">
              Celebrating Art
            </h1>
          </div>

          <div>
            <p className="text-center text-white text-sm sm:text-base md:text-lg lg:text-xl font-thin px-4 sm:px-8 md:px-16 lg:px-24 tracking-wider">
              By supporting artists and artisans, we are fostering a culture of
              innovation and self-expression. We are providing a platform for
              individuals to showcase their talents and ideas, and to make a
              positive impact on society. By celebrating art and craft in all
              its forms, we are recognizing the beauty and diversity of human
              creativity, and promoting a world where imagination has no bounds.
            </p>
          </div>

          <div className="w-full flex justify-center items-center mt-8 ">
            <button
              type="button"
              className="focus:outline-none rounded-md text-white bg-[#f05025] hover:bg-[white] hover:text-[#f05025] focus:ring-4 focus:ring-purple-300 font-bold text-sm px-6 py-2 sm:px-8 sm:py-3 lg:px-10 lg:py-3.5 mb-2 transition duration-300"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* second section */}
      <section className="min-h-screen bg-black bg-cover grid backgroundRemove grid-cols-1 lg:grid-cols-2  mx-auto">
        <div className="flex items-center justify-center  p-8 md:p-0">
          <img
            src={smallScreenBanner}
            className="mt-5 block lg:hidden"
            alt=""
          />
        </div>
        <div className="pt-10 px-5">
          <h4 className="text-white font-semibold mb-4 text-lg sm:text-xl md:text-2xl">
            ABOUT US
          </h4>
          <div className="text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[70px] lg:leading-[67px]">
            <h1>Share Your</h1>
            <h1>
              <span className="text-[#8D7BCF]">Creativity,</span> Not
            </h1>
            <h1>
              Your <span className="text-[#f05025]">Sales</span>
            </h1>
            <h1 className="text-[#f05025]">Income</h1>
          </div>
          <div>
            <p className="text-white mt-8 text-base sm:text-lg md:text-xl lg:text-[19px] font-thin tracking-wider">
              This platform is dedicated to all individual artists and craft
              people, providing them with their own online shop to showcase
              their creations to a discerning audience of art and craft
              enthusiasts without any commission fees.
            </p>
          </div>
        </div>
      </section>
      
      {/* product section */}
      <section className="bg-black
      ">
        <div className="container mx-auto">
          <div className="text-[35px] text-white pl-8  font-extrabold">
            <h1>Find Popular</h1>
            <h1 className="text-[#8B7BCF]">Artwork</h1>
          </div>
          <div className="container mx-auto px-4">
            <ProductSlider />
          </div>
        </div>
      </section>

      {/* newsLetter section */}
      <NewsLetter />
    </>
  );
};

export default Home;
