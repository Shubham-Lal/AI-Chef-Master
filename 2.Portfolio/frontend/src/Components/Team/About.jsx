import React, { useEffect } from "react";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img1 from "./img1.jpg";

const About = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <div className=" p-6 h-full min-h-screen w-full">
    
        <div className="text-center  justify-center">
          <h1 className="custom-text text-center md:text-6xl  text-4xl font-bold font-sans  tracking-widest my-12">
            WELCOME TO AI CHEF MASTER
          </h1>
          <p className="text-xl ">WHERE CULINARY CREATIVITY MEETS
            CUTTING-EDGE TECHNOLOGY.</p>
        </div>
        <div className="flex flex-col md:flex-row h-full justify-around mt-3 mb-12">
        <video
            autoPlay
            loop
            muted
            className="w-full md:h-screen h-80 max-w-7xl rounded-xl "
            style={{
              objectFit: "cover",
              filter: "brightness(0.9)", // Adjust the brightness value as needed
            }}
          >
            <source src={"assets/women_cooking.mp4"} type="video/mp4" />
          </video>
        </div>
        <div className="flex justify-center item-center h-24 bg-cyan-600 border rounded-lg mb-8 md:ml-20 md:mr-20 mt-2">
          <h1 className="text-5xl font-bold text-white font-serif py-4">
            ABOUT US
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-around">
          <p className="relative custom-text tracking-widest font-normal w-full md:w-96 text-3xl .text-left mb-8 md:mb-0">
            <div className="w-[300px] h-[300px] z-1 rounded-full absolute top-[-25px] blur-3xl bg-[#8bfb451c]" />
            "At AI Chef Master, We're Revolutionizing The Culinary Landscape By
            Harnessing The Power Of Artificial Intelligence To Inspire And
            Innovate In The Kitchen."
          </p>
          <img className="h-72 w-full md:w-96 border rounded-3xl" src={img2} alt="about" />
        </div>
        <div className="flex flex-col md:flex-row-reverse justify-around py-24">
          <p className="relative custom-text tracking-widest font-normal w-full md:w-96 text-3xl .text-right mb-8 md:mb-0">
            <div className="w-[300px] h-[300px] z-1 rounded-full absolute top-[-25px] blur-3xl bg-[#8bfb451c]" />
            "Our Team Of Experts Combines A Passion For Gastronomy With
            Expertise In machine Learning And Data Analysis To Create A
            One-Of-A-Kind Cooking Experience."
          </p>
          <img className="h-96 w-96 md:w-96 border rounded-3xl" src={img3} alt="about" />
        </div>
        <div className="flex flex-col md:flex-row justify-around py-24">
          <p className="relative custom-text tracking-widest font-normal w-full md:w-96 text-3xl .text-left mb-8 md:mb-0">
            <div className="w-[300px] h-[300px] z-1 rounded-full absolute top-[-25px] blur-3xl bg-[#8bfb451c]" />
            "Whether You're A Seasoned Chef Or A Novice in The kitchen, Our
            AI-Driven Platform Is Designed To Elevate Your Cooking Skills,
            Unleash Your Creativity, And Delight Your Taste Buds."
          </p>
          <img className="h-96 w-96 md:w-96 border rounded-3xl" src={img4} alt="about" />
        </div>
        <div className="text-center text-3xl justify-center py-24">
          <h1 className="custom-text text-center font-medium font-sans .text-center mx-2 md:mx-24 py-5 pb-12 tracking-widest">
            Join Us On A Journey Where Tradition Meets Innovations, And Discover
            The Future Of Cooking With AI Chef Master.
          </h1>
          <button className="bg-white p-4 text-2xl border rounded-2xl font-bold transform transition duration-500 hover:scale-110 shadow-2xl shadow-black">
            JOIN US
          </button>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default About;
