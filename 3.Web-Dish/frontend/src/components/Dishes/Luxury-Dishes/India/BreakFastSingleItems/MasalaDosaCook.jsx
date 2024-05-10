// Import React and necessary components
import React, { useState } from "react";
import { Fade } from "react-reveal";
 import Cooking from "../../../../../pages/Cooking";
import IngredientCard from "../../../../IngredientCard";
import { Link } from "react-router-dom";
 import { FcAlarmClock } from "react-icons/fc";

const recipeSteps = [
  {
    title: "Soak Ingredients",
    videoSource: "./hls/Soak_Ingredients1.mp4",
    instructions: [
      "Wash rice and urad dal separately.",
      "Soak rice, urad dal, and fenugreek seeds in water for 4-6 hours."
    ],
    ingredients: [
      { title: "Rice 🍚", quantity: "2 cups" },
      { title: "Urad Dal 🌕", quantity: "1 cup" },
      { title: "Fenugreek Seeds 🌱", quantity: "1/2 teaspoon" },
    ],
    time: "4-6 hours soaking time"
  },
  {
    title: "Grind Ingredients",
    videoSource: "./hls/Grind Ingredients2.mp4",
    instructions: [
      "Grind soaked rice and urad dal separately into a fine paste.",
      "Mix the rice and urad dal pastes together to form a unified batter."
    ],
    ingredients: [
      { title: "Rice 🍚", quantity: "2 cups" },
      { title: "Urad Dal 🌕", quantity: "1 cup" },
    ],
    time: "20 minutes grinding time"
  },
  {
    title: "Prepare Batter Consistency",
    videoSource: "./hls/Prepare Batter Consistency3.mp4",
    instructions: [
      "Add salt to the batter.",
      "Add water to achieve a smooth consistency, similar to pancake batter."
    ],
    ingredients: [
      { title: "Water 💧", quantity: "as needed" },
      { title: "Salt 🧂", quantity: "to taste" },
      { title: "Dosa Batter 🥞", quantity: "as needed" },
      { title: "Oil or Ghee 🍯", quantity: "as needed" },
      { title: "Potato Masala 🥔", quantity: "as needed" }
    ],
    time: "5 minutes"
  },
  {
    title: "Ferment Batter",
    videoSource: "./hls/Ferment Batter.mp4",
    instructions: [
      "Let the batter ferment for at least 8 hours or overnight in a warm place"
    ],
    ingredients: [
      { title: "Batter 🥞", quantity: "as needed" }
    ],
    time: "8 hours fermentation time"
  },
  {
    title: "Prepare Filling",
    videoSource: "./hls/Preparation_of_Filling.mp4",
    instructions: [
      "Heat 2 tablespoons of oil in a pan",
      "Add 1 teaspoon each of mustard seeds and cumin seeds to the hot oil, and let them splutter"
    ],
    ingredients: [
      { title: "Oil 🍶", quantity: "2 tablespoons " },
      { title: "Mustard Seeds 🌾", quantity: "1 teaspoon " }
    ],
    time: "5 minutes"
  },
  {
    title: "Add Aromatics",
    videoSource: "./hls/Aromatics.mp4",
    instructions: [
      "Add asafoetida and curry leaves to the pan.",
      "Add chopped onions and green chilies.",
      "Sauté until onions turn translucent."
    ],
    ingredients: [
      { title: "Asafoetida 😊", quantity: "as needed" },
      { title: "Curry Leaves 🍃", quantity: "as needed" },
      { title: "Onions, chopped 🧅", quantity: "as needed" },
      { title: "Green Chilies, chopped 🌶️", quantity: "as needed" }
    ],
    time: "5-7 minutes"
  },
  {
    title: "Spices and Vegetables",
    videoSource: "./hls/Spices Vegetables.mp4",
    instructions: [
      "Add turmeric powder and mix well with the sautéed ingredients.",
      "Add boiled and mashed potatoes.",
      "Add salt to taste.",
      "Mix thoroughly until well combined.",
      "Cook for a few minutes to allow flavors to meld"
    ],
    ingredients: [
      { title: "Turmeric Powder", quantity: "as needed" },
      { title: "Boiled and Mashed Potatoes 🥔", quantity: "as needed" },
      { title: "Salt 🧂", quantity: "to taste" }
    ],
    time: "10 minutes"
  },
  {
    title: "Garnish and Set Aside",
    videoSource: "./hls/Garnish and Set Aside.mp4",
    instructions: [
      "Garnish the mixture with chopped coriander leaves.",
      "Set the filling aside for later use.",
      "Add mustard seeds and cumin seeds to the hot oil, and let them splutter."
    ],
    ingredients: [
      { title: "Oil 🍶", quantity: "2 tablespoons" },
      { title: "Mustard Seeds 🌼", quantity: "1 teaspoon" },
      { title: "Cumin Seeds 🌿", quantity: "1 teaspoon" },
      { title: "Chopped Coriander Leaves 🌿", quantity: "as needed" }
    ],
    time: "5 minutes"
  },
  {
    title: "Preheat Tawa",
    videoSource: "./hls/Preheat Tawa.mp4",
    instructions: [
      "Heat a non-stick dosa tawa or skillet on medium heat until hot."
    ],
    ingredients: [
      { title: "Non-stick Dosa Tawa or Skillet 🍳", quantity: "1 Dosa Tawa" }
    ],
    time: "5 minutes"
  },
  {
    title: "Add Batter to Tawa",
    videoSource: "./hls/Batter to Tawa.mp4",
    instructions: [
      "Pour a ladleful of dosa batter onto the center of the tawa.",
      "Spread the batter in a circular motion to form a thin pancake."
    ],
    ingredients: [
      { title: "Dosa Batter 🥞", quantity: "as needed" }
    ],
    time: "2 minutes"
  },
  {
    title: "Cook the Dosa",
    videoSource: "./hls/Cook the Dosa.mp4",
    instructions: [
      "Drizzle some oil or ghee around the edges of the dosa.",
      "Cook until the bottom turns golden brown and crisp."
    ],
    ingredients: [
      { title: "Oil or Ghee 🍯", quantity: "as needed" }
    ],
    time: "3-4 minutes"
  },
  {
    title: "Flip and Cook the Other Side",
    videoSource: "./hls/Flip and Cook the Other Side.mp4",
    instructions: [
      "Flip the dosa and cook the other side for a minute or until it’s fully cooked."
    ],
    ingredients: [
      { title: "Oil or Ghee 🍯", quantity: "as needed" }
    ],
    time: "1-2 minutes"
  },
  {
    title: "Add Potato Masala",
    videoSource: "./hls/Potato Masala.mp4",
    instructions: [
      "Place a spoonful of the prepared potato masala in the center of the dosa.",
      "Fold the dosa over the filling."
    ],
    ingredients: [
      { title: "Prepared Potato Masala 🥔", quantity: "as needed" }
    ],
    time: "1 minute"
  },
  {
    title: "Serve Hot",
    videoSource: "./hls/Serve Hot.mp4",
    instructions: [
      "Serve the masala dosa hot.",
      "Pair with coconut chutney, sambar, or any other side dish of your choice."
    ],
    ingredients: [
      { title: "Coconut Chutney 🥥", quantity: "as needed" },
      { title: "Sambar 🍲", quantity: "as needed" }
    ],
    time: "Immediate"
  }
];

function RecipeSteps({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);
 
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const [showAlert, setShowAlert] = useState(false);

  const handleFeedbackSubmission = () => {
    alert('You have successfully created a dish!');
  };

 
  return (
    <div className="px-4 py-8 bg-[#f7f3cd] shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center mb-8">Preparation Steps</h1>
      <div key={currentStep}>
        <h2 className="text-2xl font-semibold mb-4">{`${currentStep + 1}. ${steps[currentStep].title}`}</h2>
        <div className='flex justify-between items-center'>
          <p className="text-xl">Time: {steps[currentStep].time}</p>
          <div className='flex gap-2 items-center'>
            <FcAlarmClock size={30} /> 
            {/*<p>CountDown</p> */}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Cooking videoSource={steps[currentStep].videoSource} />
        </div>
        <Fade bottom cascade delay={500}>
          <ul className="list-disc pl-6 mb-6">
            {steps[currentStep].instructions.map((instruction, i) => (
              <li key={i} className="mb-2">{instruction}</li>
            ))}
          </ul>
        </Fade>
        <Fade bottom cascade delay={500}>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
        </Fade>
        <Fade bottom cascade delay={500}>
          <ul className="mb-4 grid grid-cols-2 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {steps[currentStep].ingredients.map((ingredient, j) => (
              <li key={j} className="">
                <IngredientCard title={ingredient.title} quantity={ingredient.quantity} />
              </li>
            ))}
          </ul>
        </Fade>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={goToPreviousStep} disabled={isFirstStep} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed" aria-label="Previous Step">
          {isFirstStep ? "First Step" : "Previous Step"}
        </button>
        <div>
          <span className="mr-2">{currentStep + 1}</span>
          <span>of</span>
          <span className="ml-2">{steps.length}</span>
        </div>
        {isLastStep ? (
          <Link to='/feedback'>
            <button onClick={handleFeedbackSubmission}  className="px-4 py-2 bg-green-500 text-white rounded-md" aria-label="Submit Feedback">
             Submit Feedback
          </button>
          </Link>
        ) : (
          <button onClick={goToNextStep} disabled={isLastStep} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed" aria-label="Next Step">
            {isLastStep ? "Last Step" : "Next Step"}
          </button>
        )}
      </div>
  
      </div>
  );
}

 function MasalaDosaCook() {
  return (
    <div className="bg-[#f7f3cd] min-h-screen flex flex-col justify-center">
      <div className="flex-1 max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Masala Dosa Recipe</h1>
        <RecipeSteps steps={recipeSteps} />
       </div>
    </div>
  );
}

export default MasalaDosaCook;
