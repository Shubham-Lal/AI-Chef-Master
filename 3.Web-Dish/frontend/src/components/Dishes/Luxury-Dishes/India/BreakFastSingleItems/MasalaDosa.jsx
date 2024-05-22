import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IndianBreakFast } from "../../../../../Data/LuxuryDishesData/IndianDishes/IndianBreakFast";
import Marquee from "react-fast-marquee";
import { Flip } from "react-reveal";
import { useSpring, animated } from 'react-spring';
import RecommendedData from '../../../../../Data/RecommendedData';
import SingleDish from "../../../../../pages/SingleDish";
import MainIngradients from "../../../../SingleDishItems/MainIngradients";
import KitchenEquipments from '../../../../../components/SingleDishItems/KitchenEquipments';
import NumberOfPeople from '../../../../../components/SingleDishItems/NumberOfPeople';
import Card2 from "../../../../Card2";
import Footer from '../../../../FooterItem/Footer';
 
const mainIngredients = [
  { title: "Dosa Batter 🍚" },
  { title: "Potatoes 🥔", quantity: "4 medium-sized, boiled and mashed" },
  { title: "Onion 🧅", quantity: "1 large, finely chopped" },
  { title: "Green Chillies 🌶️", quantity: "2-3, finely chopped" },
  { title: "Mustard Seeds", quantity: "1 tsp" },
  { title: "Curry Leaves 🍃", quantity: "1 sprig" },
  { title: "Turmeric Powder 🌾", quantity: "1/2 tsp" },
  { title: "Oil 🛢️", quantity: "2 tbsp" },
  { title: "Salt 🧂", quantity: "to taste" },
  { title: "Masala Dosa 🥘", quantity: "1" },
];

const kitchenEq = [
  { title: "Oven 🔥" },
  { title: "Food Processor 🍲" },
  { title: "Pressure Cooker 🍲🔥" },
  { title: "Air Fryer 🍲🔥" },
  { title: "Blender 🍲🥤" },
  { title: "Microwave 🍲🔥" },
  { title: "Dosa Tawa 🍲🍳" },
  { title: "Spatula 🍴" },
  { title: "Mixing Bowl 🍲🥣" },
];

function MasalaDosa() {
  const [fadeIn, setFadeIn] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  }));

  const dishProps = {
    dishTitle: IndianBreakFast[0].dishName,
    dishImage: IndianBreakFast[0].dishImage,
    dishDescription: "Masala Dosa: A South Indian classic, boasts a thin, crisp rice crepe embracing a spiced potato filling. The blend of mustard seeds, turmeric, and curry leaves infuses every bite with aromatic delight. Boiled and seasoned potatoes add a hearty contrast. Served with coconut chutney and sambar, Masala Dosa is a flavorful journey in just one mouthful.",
    dishAlt: IndianBreakFast[0].dishImage,
    dishType: "Vegetarian",
    preprationTime: "20 min",
    dishIngredients: "14",
    dishCalories: "500 kcal",
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
        <KitchenEquipments kitchenEquipments={kitchenEq} />
        <NumberOfPeople />
      </div>

      <div className="flex items-center justify-center my-8">
        <Link to='/Masala-Dosa-Cook'>
          <button className="p-2 px-4 bg-indigo-600 text-white font-bold rounded-lg" onClick={() => window.scrollTo(0, 0)}>Start Cooking</button>
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

export default MasalaDosa;
