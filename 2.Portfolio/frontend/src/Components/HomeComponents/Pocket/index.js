import React, { useEffect } from "react";
import { Fade, Zoom } from "react-reveal";
import { v4 as uuidv4 } from "uuid";
import AIimage from "../../Images/AIimage.png";
import food1 from "../../Images/food1.png";
import aahar from "../../Images/aahar.png";
import "tailwindcss/tailwind.css";
import "animate.css";
import "../Pocket/index.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ChefCard = ({heading,description,video}) =>{
  return(
    <div className="max-w-sm flex text-center relative">
      <Link to={"/newpage"}>
      <div className="flex flex-col absolute space-y-6 md:space-y-8 top-6 md:top-8">
        <h2 className=" z-10 text-center  text-white font-bold text-3xl">
          {heading}
        </h2>
        <p className=" z-10 max-w-sm p-4 text-white  text-justify">
        {description}
        </p>
      </div>

      <video
        autoPlay
        loop
        muted
        className="rounded-xl brightness-0"
        style={{
          width: "400px",
          height: "400px",
          objectFit: "cover",
          borderRadius: "1rem",
          filter: "brightness(0.9)", 
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      </Link>
    </div>
  )
}
export const ChefCard1 = ({heading,description,video,link}) =>{
  const [themeClass, setThemeClass] = useState("");

  useEffect(() => {
      const theme = localStorage.getItem("theme");
      const computedThemeClass = theme === "dark" ? "border-2 border-white" : "";
      setThemeClass(computedThemeClass);
  }, []);
  return(
    <div className="max-w-sm flex text-center relative">
      <Link to={link}>
      <div className="flex flex-col justify-center items-center absolute inset-20">
        <h2 className=" z-10 text-center  text-white font-bold text-3xl">
          {heading}
        </h2>
        {/* <p className=" z-10 max-w-sm p-4 text-white  text-justify">
        {description}
        </p> */}
      </div>

      <video
        autoPlay
        loop
        muted
        className={`rounded-xl brightness-0 ${themeClass}` }
        style={{
          width: "400px",
          height: "400px",
          objectFit: "cover",
          borderRadius: "1rem",
          filter: "brightness(1)", // Adjust the brightness value as needed
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      </Link>
    </div>
  )
}
function Pocket() {
  const CardList = [
    {
      video: "",
      heading: "Chef Assistant",
      description:
        "Elevate your cooking into a tailored and engaging adventure. This feature directs users in creating delightful dishes by enabling customization of quantities and ingredients, unfolding the recipe seamlessly through a blend of audio, text, and video to enhance the culinary journey. For more details on how this feature can transform your cooking experience and unlock a world of possibilities in the kitchen.",
      pathRoute: "/AiAssistant",
    },
    {
      video: food1,
      heading: "Chef Intelligence",
      description:
        "Convert your leftover ingredients into culinary delights effortlessly. Users simply input their available ingredients, and the module generates a curated list of diverse dishes. Once a choice is made, users receive detailed cooking instructions, empowering them to effortlessly turn their kitchen odds and ends into delicious meals and enjoy your meals with the help of AI Automation.",
      pathRoute: "/aikitchen",
    },
    {
      video: aahar,
      heading: "Nutrition Manager",
      description:
        "The AI Chef Master also offers a Nutrition Manager, catering to gym enthusiasts and fitness aficionados. This feature allows you to monitor your dietary intake, keeping track of what you consume and understanding how different foods can impact your body and overall well-being. Stay on top of your nutritional goals with precision and make informed choices for a healthier lifestyle.",
      pathRoute: "/ainutritionmanager",
    },
  ];

  return (
    <div className="values-container background-style-pocket break-words text-black px-6 md:px-10 py-8 md:pt-20 text-center items-center">
      <h1 className="main-heading text-4xl md:text-5xl mb-6">
        THE AI CHEF IN YOUR POCKET
      </h1>
      <p className="custom-text text-xl md:text-2xl mb-8">
        Create and customize your favorite AI CHEF
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">

        {/* {CardList.map((card) => ( */}
          <ChefCard1 key={uuidv4()} heading={"AI Assistant"} description={""} video={"assets/AI_ASSISTANT.mp4"} link={"/AI_Assistant"}/>
          <ChefCard1 key={uuidv4()} heading={"Chef Intelligence"} link={"Chef_Intelligence"} description={""} video={"assets/Chef.mp4"}/>
          <ChefCard1 key={uuidv4()} heading={"Nutrition Manager"} description={""} video={"assets/Nutrition.mp4"} link={"/Nutrition_Manager"}/>
        {/* ))} */}
    </div>
    </div>
  );
}

export default Pocket;
