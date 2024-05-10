import { Link } from "react-router-dom";
import { ChefCard1 } from "./ChefCard1";
import { v4 as uuidv4 } from "uuid";
export default function Nutrition_Manager() {
  return (
    <>
      <ChefCard1
        key={uuidv4()}
        heading={"Nutrition Manager"}
        description={
          "Introducing the AI Chef Master's Nutrition Manager, the ultimate companion for gym enthusiasts and fitness aficionados. This advanced feature allows you to monitor your dietary intake with precision, giving you the tools to track everything you consume. It provides a detailed analysis of the nutritional content of your meals, allowing you to understand how different foods impact your body and overall well-being With this feature, you can set specific dietary goals based on your fitness plans, whether it's gaining muscle, losing weight, or simply eating healthier. The Nutrition Manager helps you make informed choices by providing insights into the calorie count, macronutrients, and micronutrients of each dish. It can also suggest food combinations that align with your health objectives, ensuring you're getting the right balance of nutrients.Stay in control of your diet with the AI Chef Master's Nutrition Manager, and take the guesswork out of eating right. This feature is designed to support you in achieving a healthier lifestyle, with data-driven insights and personalized recommendations to keep you on track."
        }
        video={"assets/Nutrition.mp4"}
      ></ChefCard1>
    </>
  );
}

