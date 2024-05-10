import { Link } from "react-router-dom";
import { ChefCard1 } from "./ChefCard1";
import { v4 as uuidv4 } from "uuid";
export default function AI_Assistant() {
  return (
    <>
      <ChefCard1
        key={uuidv4()}
        heading={"Ai Assistant"}
        description={
          "Elevate your cooking experience to a new level with our innovative culinary feature, designed to turn every meal into a personalized adventure. This unique tool offers an intuitive way to customize your recipes, allowing you to adjust ingredient quantities to suit your taste and dietary needs. Whether you're reducing sugar, opting for more vegetables, or adding extra spice, the flexibility is in your hands.What makes this feature truly special is its interactive nature. As you cook, you receive step-by-step guidance through a combination of audio, text, and video, ensuring you are never left wondering what to do next. This seamless blend of formats provides a rich and engaging experience, keeping you on track and entertained as you prepare your meal.Whether you are a seasoned chef or just starting in the kitchen, this feature offers something for everyone. Dive into a world of culinary creativity and transform your cooking experience today."
        }
        video={"assets/AI_ASSISTANT.mp4"}
      ></ChefCard1>
    </>
  );
}

