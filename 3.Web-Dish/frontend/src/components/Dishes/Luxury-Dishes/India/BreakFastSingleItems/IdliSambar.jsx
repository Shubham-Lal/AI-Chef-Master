import React, { useState } from "react";
import SingleDish from "../../../../../pages/SingleDish";
//import NewMultiSelect from '../../../../../components/SingleDishItems/NewMultiSelect';
 import KitchenEquipments from '../../../../../components/SingleDishItems/KitchenEquipments';
import NumberOfPeople from '../../../../../components/SingleDishItems/NumberOfPeople';
import MainIngradients from "../../../../SingleDishItems/MainIngradients";
import { Link } from "react-router-dom";
import { IndianBreakFast } from "../../../../../Data/LuxuryDishesData/IndianDishes/IndianBreakFast";
import Marquee from 'react-fast-marquee';
import { useSpring, animated } from 'react-spring';
import Flip from 'react-reveal/Flip';  
import 'animate.css/animate.min.css';
import Card2 from "../../../../Card2";
import RecommendedData from "../../../../../Data/RecommendedData";
import Footer from "../../../../FooterItem/Footer";
 
 
const mainIngredients = [
  { title: "Idli Batter 🍚" },
  { title: "Sambar Powder🌶️", quantity: "2 tbsp" },
  { title: "Toor Dal (Split Pigeon Peas) 🌰", quantity: "1 cup" },
  { title: "Vegetables (Carrots, Beans, Potatoes)🥕🌽🥔", quantity: "1 cup, chopped" },
  { title: "Tomatoes 🍅", quantity: "2, chopped" },
  { title: "Green Chillies 🌶️", quantity: "2-3, slit" },
  { title: "Mustard Seeds 🌰", quantity: "1 tsp" },
  { title: "Curry Leaves 🍃", quantity: "1 sprig" },
  { title: "Oil🛢️", quantity: "2 tbsp" },
  { title: "Salt 🧂", quantity: "to taste" },
];

const kitchenEq = [
  { title: "Steamer 🍲" },
  { title: "Pressure Cooker 🍲🔥" },
  { title: "Saucepan 🍲🥄" },
  { title: "Frying Pan 🍳" },
  { title: "Mixing Bowl 🍲🥣" },
  { title: "Spatula 🍴" },
];

function IdliSambar() {
   const [fadeIn, setFadeIn] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  }));
const dishProps = {
dishTitle: IndianBreakFast[1].dishName ,
dishImage: IndianBreakFast[1].dishImage,
  dishDescription: "Idli Sambar: A delicious South Indian breakfast consisting of soft rice cakes (idli) served with a flavorful lentil-based soup (sambar) and coconut chutney.",
dishAlt: IndianBreakFast[1].dishImage,
dishType: "Vegetarian",
   preprationTime: "30 min", // Adjust the preparation time accordingly
  dishIngredients: "10", // Adjust the number of ingredients accordingly
  dishCalories: "400 kcal", // Adjust the calorie value accordingly
};
 
return (
<div className="bg-[#f7f3cd] min-h-screen">
    <SingleDish
        dishTitle={dishProps.dishTitle}
        dishImage={dishProps.dishImage}
        dishDescription={dishProps.dishDescription}
        dishAlt={dishProps.dishAlt}
        dishType={dishProps.dishType}
        preprationTime={dishProps.preprationTime}
        dishIngredients={dishProps.dishIngredients}
        dishCalories={dishProps.dishCalories}
    />

    <div className="px-12">
        <MainIngradients mainIngredients={mainIngredients} />
        {/*<NewMultiSelect multiple options={options} isValue={isValue} onChange={(opt)=> setValue(opt)} />*/}
        <KitchenEquipments kitchenEquipments={kitchenEq} />
        <NumberOfPeople />
    </div>

    <div className="flex items-center justify-center my-8">
        <Link to='/Idli-Sambar-Cook'>
            <button className="p-2 px-4 bg-indigo-600 text-white font-bold rounded-lg" onClick={()=> window.scrollTo(0, 0)}>Start Cooking</button>
        </Link>
    </div>

      <div className='mb-5'>
        <div className="pb-6 pt-6 px-4 md:px-8">
          <h1 className='text-center text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold'>Recommended Dishes</h1>
        </div>
        <Marquee>
          <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden">
            {RecommendedData.map((dish, index) => (
              <Flip key={index} cascade left>
                <animated.div style={fadeIn} className="flex-grow h-full">
                  <Card2 key={index} title={dish.dishName} time={dish.time} rating={dish.rating} imageUrl={dish.dishImage} />
                </animated.div>
              </Flip>
            ))}
          </div>
        </Marquee>
    </div>
    <Footer />
</div>
);
}

 export default IdliSambar;
