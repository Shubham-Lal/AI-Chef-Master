import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-reveal";
import { v4 as uuidv4 } from "uuid";
import "animate.css";
import AiAssistantData from "./Data/AiAssistantData";

const AnimatedCard = ({ imageUrl, imageAlt, heading, description, index }) => {
  const [themeClass, setThemeClass] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log(themeClass);
    const computedThemeClass =
      theme === "dark" ? "text-white bg-slate-900 " : "text-black bg-white";
    setThemeClass(computedThemeClass);
  }, []);
  
  return (
    <div>
      <div
        className={`flex flex-col md:flex-col md:min-h-full mx-2 flex-wrap rounded-2xl ${themeClass}  w-12/12 gap-4 md:gap-2`}
      >
        <Fade>
          <img
            src={imageUrl}
            className="w-full h-64 md:h-96 md:max-w-82 p-2 rounded-2xl shadow-lg"
            alt={imageAlt}
          />
        </Fade>
        <div className="relative flex flex-col justify-center gap-6  md:gap-6 md:pt-0 items-center max-w-md md:max-w-[400px]">
          <Slide>
            <h3 className="custom-text text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-center md:text-left">
              {heading}
            </h3>
          </Slide>
          <div className=" z-1 rounded-full absolute top-[-25px] blur-3xl bg-[#8bfb451c]" />
          <Slide>
            <div>
              <p className="custom-text-secondary text-lg sm:text-lg mb-3 box-border leading-6 md:text-xl  md:text-left text-justify p-6">
                {description}
              </p>
            </div>
          </Slide>
        </div>
      </div>
    </div>
  );
};

const AiAssistant = () => {
  return (
    <div className="pb-4">
      <div
        style={{ backgroundColor: "rgba(0, 84, 79, 0.5)" }}
        className="flex justify-center items-center h-28"
      >
        <h1
          style={{ textShadow: "2px 0.5px 0.5px rgba(0, 0, 0, 0.5)" }}
          className="bg-green-500 text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-serif py-4 px-6 md:px-8 lg:px-10 xl:px-12 text-center md:text-left"
        >
          AI Assistant
        </h1>
      </div>

      <div
        className="relative h-[calc(100vh-7rem-72px)] flex flex-col md:flex-row w-full bg-[#031529] bg-no-repeat bg-cover items-center justify-center px-4 md:px-8 lg:px-20 brightness-100"
        style={{
          backgroundSize: "cover",
          height: '80vh',
          backgroundPosition: "center",
        }}
      >  <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src="assets/Electricity.mp4" type="video/mp4" /> </video>
        <p className="relative z-10 w-full md:w-1/2 text-[#FFFFFF] text-base md:text-2xl lg:text-3xl font-bold md:pr-4 lg:pr-8 md:text-center">
          With our AI Assistant, cooking becomes a personalized adventure.
          Choose, customize, and enjoy a delicious meal crafted to your taste.
          <br />
          Happy cooking!
        </p>
      </div>
      <div className="mt-6 flex flex-col md:grid md:grid-cols-4">
        {AiAssistantData.map((obj, index) => (
            <AnimatedCard key={uuidv4()} index={index} {...obj} />
        ))}
      </div>
    </div>
  );
};

export default AiAssistant;
