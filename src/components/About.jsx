import React from "react";
import aboutBanner from "../assets/about-banner.jpg";
import aboutSecondImage from "../assets/about-second-image.jpg";

const About = () => {
  return (
    <section>
      {/* Banner Section */}
      <div
        className="h-[400px] bg-cover relative"
        style={{
          backgroundImage: `url(${aboutBanner})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#271919] opacity-[.5]"></div>

        <div className="text-white text-[30px] md:text-[50px] absolute font-bold z-50 w-full h-full flex justify-center items-center flex-col text-center p-4">
          <div>
            INTRODUCING A UNIQUE{" "}
            <span className="text-[#EF9364]">PLATFORM FOR</span>
          </div>
          <div>
            <span className="text-[#EF9364]">ARTISTS</span> AND CRAFTERS
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="p-4 flex flex-col gap-7">
          <h1 className="text-[#ef9364] font-bold text-2xl md:text-3xl">
            Introducing a Unique Platform for Artists and Crafters
          </h1>
          <p className="text-[14px] text-[#110f0f]">
            In the ever-evolving market for arts and crafts, we understand the
            challenges you face in finding alternative avenues for selling your
            creations. Social media, although with free or low-cost advertising,
            can be overwhelming as it is difficult to connect with relevant
            buyers among the sea of users.
          </p>
          <p className="text-[14px] text-[#110f0f]">
            Traditional avenues like art galleries or shops may offer exposure,
            but often come with a hefty commission because of high overheads
            that has to be shared between a relatively small number of artists.
          </p>
          <p className="text-[14px] text-[#110f0f]">
            This is why we have launched a new platform that aims to provide a
            solution – a place where artists and crafters can showcase and sell
            their work while keeping 100% of their sales revenue. How to make
            this possible? By offering a low-cost membership that eliminates
            listing fees and commissions.
          </p>
          <p className="text-[14px] text-[#110f0f]">
            While marketing our platform to a nationwide audience is a necessary
            investment, we believe in sharing the cost among our members. By
            committing a portion of our membership fees to advertising, we aim
            to ensure that the platform gains and maintains visibility and
            becomes a go-to destination for art and craft lovers and discerning
            buyers. This also means that every new member is helping us to help
            the sales for all our members.
          </p>
          <p className="text-[14px] text-[#110f0f]">
            Our platform not only connects buyers with unique, handcrafted
            creations, but also allows them to communicate directly with the
            creators themselves.
          </p>
        </div>
        <div className="p-4">
          <img
            src={aboutSecondImage}
            alt=""
            className="border rounded-xl w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
