import React, { useState } from "react"; // Import useState from React
import SeasonalDishesData from '../../Data/Seasonal-Top-Dishes/SeasonalDishesData';
import SeeMoreDishes from "../Dishes/SeeMoreDishes";
import SeeMoreDescription from "../Dishes/SeeMoreDescription";

function SeasonalDishes() {
  const [searchTerm, setSearchTerm] = useState("");  
  const filteredDish = SeasonalDishesData.filter(dish =>
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sliderDishes = SeasonalDishesData;

  return (
    <div className="bg-[#f7f3cd]">
      <SeeMoreDescription slideDishes={sliderDishes} />
      <h1 className="py-12 text-3xl  md:text-5xl text-center font-bold text-[#00544f]">Seasonal Dishes</h1>
      <SeeMoreDishes searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredDish={filteredDish} />
    </div>
  );
}

export default SeasonalDishes;
