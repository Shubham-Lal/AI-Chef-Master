import React from "react";
import { Fade, Zoom } from "react-reveal";
import { v4 as uuidv4 } from "uuid";
 import "animate.css";
import "../Values/index.css";
import "tailwindcss/tailwind.css";
import Graph from "../../Images/graph.png";
import Focus from "../../Images/focus.png";
import Customer from "../../Images/customer.png";
import { ChefCard1 } from "../Pocket";

const AnimatedCard = ({ imageUrl, imageAlt, header, description }) => {
  return (
    <div
      className={`container flex flex-col justify-center items-center mt-6 md:mt-0 value-card-container`}
    >
      <Fade>
        <Zoom>
          <div className="relative flex justify-center">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="custom-image object-scale-down h-48 w-full md:w-96 animate-pulse"
            />
            <div className="w-[200px] h-[200px] z-1 rounded-full absolute blur-3xl bg-[#8bfb451c]" />
          </div>
          <h1 className="custom-text mb-2 text-center text-xl md:text-3xl">
            {header}
          </h1>
          <div className="custom-text-secondary mb-2 text-md md:text-lg text-justify">
            {description}
          </div>
        </Zoom>
      </Fade>
    </div>
  );
};

const Values = () => {
  const CardList = [
    {
      imageUrl: Graph,
      imageAlt: "LTG",
      header: "Long term Growth",
      description:
        "We are dedicated to expanding our user base through enhanced user experiences. Our strategic vision includes venturing into B2B collaborations, fostering partnerships, and diversifying our dish offerings. This approach ensures sustained innovation and broad market appeal, solidifying our position as a leader in the culinary tech industry."
    },
    {
      imageUrl: Focus,
      imageAlt: "Focus on R&D",
      header: "Focus on research and development",
      description:
        "Our foundation is built on innovation, constantly pushing technological boundaries to develop and enhance advanced features. With a dedicated team at the top, we ensure that our company maintains a leading position in industry trends, consistently delivering unparalleled value, and staying firmly committed to continuous improvement."
    },
    {
      imageUrl: Customer,
      imageAlt: "Customer priorities",
      header: "Customer priorities",
      description:
        "Our focus lies in offering a user-friendly interface that guides individuals in creating personalized recipes. Simultaneously, we seamlessly integrate curated content into our user experience, promoting overall well-being by providing nutritional insights and lifestyle tips."
    }
  ];

  return (
    <div className="values-container background-style-pocket break-words text-black px-6 md:px-10 py-8 md:pb-20 text-center">
      <h1 className="main-heading text-4xl md:text-5xl mb-6">
        THE VALUES AND CORE PRINCIPLE AT ACM
      </h1>
      <p className="custom-text text-xl md:text-2xl mb-8">
        Create and customize your favorite AI CHEF
      </p>


      <div className="flex flex-col md:flex-row items-center justify-center gap-4 "> 

  <ChefCard1 key={uuidv4()} heading={"Long term Growth"} description={"Elevate your cooking into a tailored and engaging adventure. This feature directs users in creating delightful dishes by enabling customization of quantities and ingredients, unfolding the recipe seamlessly through a blend of audio, text, and video to enhance the culinary journey. For more details on how this feature can transform your cooking experience and unlock a world of possibilities in the kitchen."} video={"assets/video_1.mp4"}link={"/Growth"} />
  <ChefCard1 key={uuidv4()} heading={"Customer priorities"} description={"The AI Chef Master also offers a Nutrition Manager, catering to gym enthusiasts and fitness aficionados. This feature allows you to monitor your dietary intake, keeping track of what you consume and understanding how different foods can impact your body and overall well-being. Stay on top of your nutritional goals with precision and make informed choices for a healthier lifestyle."} video={"assets/1.mp4"} link={"/Priorities"}/>
  <ChefCard1 key={uuidv4()} heading={"Focus on R&D"} description={"Convert your leftover ingredients into culinary delights effortlessly. Users simply input their available ingredients, and the module generates a curated list of diverse dishes. Once a choice is made, users receive detailed cooking instructions, empowering them to effortlessly turn their kitchen odds and ends into delicious meals and enjoy your meals with the help of AI Automation."} video={"assets/2.mp4"}  link={"/r&d"}/>

{/* ))} */}
</div>
</div>
  );
};

export default Values;
