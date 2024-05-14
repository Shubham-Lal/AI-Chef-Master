import React from "react";
import { Carousel, Button } from "@material-tailwind/react";
import beans from "../../Images/beans.png";
import biryani from "../../Images/biryani.png";
import daal from "../../Images/daal.png";
import salad from "../../Images/—Pngtree—healthy food_3776802.png";
import pizza from '../../Images/—Pngtree—modern kitchen food box italian_9047468.png'
import sambhar from "../../Images/sambhar.png";
import "../Unique/index.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS first
import { Link } from "react-router-dom";
import { Fade } from "react-reveal"; // Import Fade effect from react-reveal
import Typewriter from "./Typewriter";

export default function Unique() {
  return (
    <div className="background-main-page h-full break-words ">
      <div className=" flex flex-col md:flex-row justify-evenly items-center px-6 md:px-10 py-8 md:py-20">
        <div className="lg:w-7/12 sm:w-full md:w-full mb-8 sm:mb-0 ">
          <h1
            style={{ lineHeight: "3rem" }}
            className="main-heading relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:text-start"
          >
            <Typewriter text="Welcome to AI Chef Master" delay={100} />
            <div className="w-[300px] h-[300px] z-1 rounded-full absolute top-[-125px] left-[-40px] blur-3xl bg-[#8bfb451c]" />
          </h1>
          <div className="md:text-start">
            <Fade bottom>
              <p className="sub-heading mb-4 text-base sm:text-xl md:text-xl lg:text-2xl">
                A Unique and powerful software to create and customize your own
                AI CHEF with the help of the AI assistant
              </p>
              <Button
                style={{ backgroundColor: "#00544f" }}
                className="button-btn rounded-full shadow-2xl"
              >
                <Link
                  to="/signup"
                  className="no-underline text-white px-4 py-2 text-base font-bold"
                >
                  Try for Free ➪
                </Link>
              </Button>
            </Fade>
          </div>
        </div>
        <div className="lg:w-5/12 sm:w-full md:w-full  ">
          <Fade right>
            <div className="w-full h-auto flex justify-center">
              <Carousel
                className="rounded-xl sm:w-1/3 md:w-2/3 "
                autoplay
                autoplayDelay={3000}
                loop
              >
                         <img
                  src={salad}
                  alt="salad"
                  className="object-cover w-full h-full"
                />
                <img
                  src={pizza}
                  alt="pizza"
                  className="object-cover w-full h-full mt-20"
                />
                <img
                  src={daal}
                  alt="daal"
                  className="object-cover w-full h-full"
                />
       
                <img
                  src={beans}
                  alt="beans"
                  className="object-cover w-full h-full"
                />
                <img
                  src={biryani}
                  alt="biryani"
                  className="object-cover w-full h-full"
                />
              </Carousel>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
