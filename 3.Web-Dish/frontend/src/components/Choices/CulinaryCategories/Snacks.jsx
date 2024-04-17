import React, { useState } from "react";
import SeeMoreDishes from "../../Dishes/SeeMoreDishes";
import QuickDishesRecommendedData from "../../../Data/QuickDishesData/QuickDishesRecommendedData/QuickDishesRecommendedData";
import SeeMoreDescription from "../../Dishes/SeeMoreDescription";

function Snacks() {
  const [searchTerm, setSearchTerm] = useState("");  
  const filteredDish = QuickDishesRecommendedData.filter(dish =>
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#f7f3cd]">
      <SeeMoreDescription searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredDish={filteredDish} />
      <h1 className="py-12 text-xl sm:text-3xl md:text-5xl text-center font-bold text-black">Snacks</h1>
      <SeeMoreDishes searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredDish={filteredDish} />
    </div>
  );
}

export default Snacks;
