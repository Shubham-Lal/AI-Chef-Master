// SeeMoreDishes.js
import React from "react";
import Card2 from "../Card2";
import SearchDish from "./SearchDish";
import SearchDishNotFound from "./SearchDishNotFound";

function SeeMoreDishes({ searchTerm, setSearchTerm, filteredDish }) {
  return (
    <div>
      <div className="mb-8">
        <SearchDish setSearchTerm={setSearchTerm} />
      </div>

      <div className="flex flex-wrap gap-3 justify-center pb-12">
        {filteredDish.length > 0 ? (
          filteredDish.map((dish, index) => (
            <div key={index} className="">
              <Card2
                title={dish.dish_name}
                dishPath={`/dish/${dish.dish_name}`}
                imageUrl={dish.image || 'https://playswellwithbutter.com/wp-content/uploads/2021/04/Grilled-Bell-Peppers-6-960x1440.jpg'}
                time={dish.cooking_time}
                rating={0}
              />
            </div>
          ))
        ) : (
          <SearchDishNotFound />
        )}
      </div>
    </div>
  );
}

export default SeeMoreDishes;

{/* <Card2
  title={dish.dishName}
  dishPath={dish.dishPath}
  imageUrl={dish.dishImage}
  time={60}
  rating={4.5}
/> */}
