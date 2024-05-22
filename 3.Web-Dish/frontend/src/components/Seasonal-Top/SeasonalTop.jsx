import React from 'react';
import Card2 from '../Card2';
// import SeasonalDishesData from '../../Data/Seasonal-Top-Dishes/SeasonalDishesData';
import TopDishesData from '../../Data/Seasonal-Top-Dishes/TopDishesData';
import 'animate.css/animate.min.css';
import Marquee from 'react-fast-marquee';
import { useSpring, animated } from 'react-spring';
import Flip from 'react-reveal/Flip';
import { Link } from 'react-router-dom';
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";
import RecommendedData from '../../Data/RecommendedData';
import useFetchDishes from '../../hooks/useFetchDishes';

const SeasonalTop = () => {
  const { loading, dishes, error } = useFetchDishes();

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="text-zinc-800 bg-[#f7f3cd] text-center py-12">
      {/* SEASONAL DISHES */}
      <div className="pb-6 pt-6 flex justify-between px-4 md:px-8">
        <h1 className='text-center text-lg sm:text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold '>Seasonal Dishes</h1>
        <div className='mr-8'>
          <button onClick={() => window.scrollTo(0, 0)}>
            <Link to='/SeasonalDishes' className=' text-end font-bold text-lg sm:text-xl md:text-2xl'><MdOutlineUnfoldMoreDouble size={30} /></Link>
          </button>
        </div>
      </div>
      {loading ? (
        <h3>Fetching...</h3>
      ) : (
        <Marquee>
          <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden" >
            {dishes.map((dish, index) => (
              <Flip key={index} cascade left>
                <animated.div style={fadeIn} className="flex-grow h-full">
                  <Card2
                    key={index}
                    title={dish.dish_name}
                    dishPath={`/dish/${dish.dish_name}`}
                    time={dish.cooking_time}
                    rating={0}
                    imageUrl={dish.image || 'https://playswellwithbutter.com/wp-content/uploads/2021/04/Grilled-Bell-Peppers-6-960x1440.jpg'}
                  />
                </animated.div>
              </Flip>
            ))}
          </div>
        </Marquee>
      )}

      {/* TOP DISHES */}
      <div className="pb-6 pt-6 flex justify-between px-4 md:px-8">
        <h1 className='text-center text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold '>Top Dishes</h1>
        <div className='mr-8'>
          <button onClick={() => window.scrollTo(0, 0)}>
            <Link to='/TopDishes' className=' text-end font-bold text-lg sm:text-xl md:text-2xl'><MdOutlineUnfoldMoreDouble size={30} /></Link>
          </button>
        </div>
      </div>
      <Marquee>
        <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden" >
          {TopDishesData.map((dish, index) => (
            <Flip key={index} cascade left>
              <animated.div style={fadeIn} className="flex-grow h-full">
                <Card2 key={index} title={dish.dishName} time={dish.time} rating={dish.rating} imageUrl={dish.dishImage} />
              </animated.div>
            </Flip>
          ))}
        </div>
      </Marquee>

      <div className="pb-6 pt-6 flex justify-between px-4 md:px-8">
        <h1 className='text-center text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold'>Recommended Dishes</h1>
      </div>
      <Marquee>
        <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden" >
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
  );
};

export default SeasonalTop;

// {
//   SeasonalDishesData.map((dish, index) => (
//     <Flip key={index} cascade left>
//       <animated.div style={fadeIn} className="flex-grow h-full">
//         <Card2 key={index} title={dish.dishName} time={dish.time} rating={dish.rating} imageUrl={dish.dishImage} />
//       </animated.div>
//     </Flip>
//   ))
// }