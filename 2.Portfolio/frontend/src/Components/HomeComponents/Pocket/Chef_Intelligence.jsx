import { Link } from "react-router-dom";
import { ChefCard1 } from "./ChefCard1";
import { v4 as uuidv4 } from "uuid";
export default function Chef_Intelligence() {
  return (
    <>
      <ChefCard1
        key={uuidv4()}
        heading={"Chef Intelligence"}
        description={
          "Transform your leftover ingredients into culinary masterpieces with our innovative cooking module. It’s designed to make meal planning not only easy but also resourceful. Instead of scratching your head over what to do with random ingredients, just input what you have into the system, and it will generate a curated list of diverse dishes you can make. The feature considers everything from simple staples to exotic ingredients, offering a wide range of recipes to suit your tastes and skill level.After you select a dish from the list, the module provides detailed cooking instructions to guide you through every step of the process. These instructions are clear and user-friendly, designed to make your cooking experience seamless and enjoyable. With this tool, you can effortlessly convert kitchen odds and ends into delightful meals, reducing food waste and saving money. Plus, AI automation makes sure you are not just recycling ingredients but creating meals you'll be excited to eat."
        }
        video={"assets/Chef.mp4"}
      ></ChefCard1>
    </>
  );
}

