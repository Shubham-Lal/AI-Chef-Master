import React, { useState } from "react";
// import SeasonalDishesData from '../../Data/Seasonal-Top-Dishes/SeasonalDishesData';
import SeeMoreDishes from "../Dishes/SeeMoreDishes";
import SeeMoreDescription from "../Dishes/SeeMoreDescription";
import useFetchDishes from "../../hooks/useFetchDishes";

function SeasonalDishes() {
  const { loading, dishes, error } = useFetchDishes();

  const [searchTerm, setSearchTerm] = useState("");
  const filteredDish = !loading && dishes.filter(dish =>
    dish.dish_name.toLowerCase().includes(searchTerm.toLowerCase())
    // dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const sliderDishes = SeasonalDishesData;

  return (
    <div className="bg-[#f7f3cd]">
      {loading ? (
        <h3>Fetching...</h3>
      ) : (
        <>
          <SeeMoreDescription slideDishes={dishes} />
          <h1 className="py-12 text-3xl  md:text-5xl text-center font-bold text-[#00544f]">Seasonal Dishes</h1>
          <SeeMoreDishes searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredDish={filteredDish} />
        </>
      )}
    </div>
  );
}

export default SeasonalDishes;
