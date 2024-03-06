import React, { useState } from 'react';
import { SpanishDinner } from '../../../../Data/LuxuryDishesData/SpanishDishes/SpanishDinner';
 import SeeMoreDishes from '../../SeeMoreDishes';

const SpanishLuxuryDinner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredDish = SpanishDinner.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="  bg-[#f7f3cd]">
      <div>
        <h1 className='py-12 text-lg md:text-3xl text-center font-bold text-black'>Spanish Dinner Dishes</h1>
      </div>
      <SeeMoreDishes searchTerm={searchTerm} setSearchTerm={setSearchTerm} filteredDish={filteredDish} />
    </div>
  );
};

export default SpanishLuxuryDinner;
