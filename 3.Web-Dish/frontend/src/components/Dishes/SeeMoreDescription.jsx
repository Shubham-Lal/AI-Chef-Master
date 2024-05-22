// Inside SeeMoreDescription.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SeeMoreDescription({ slideDishes }) {  
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-500">&#9734;</span>);
    }

    return stars;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "custom-slider",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
       {slideDishes.map((dish, index) => (
        <div key={index} className="slider-item relative overflow-hidden">
          <div className="h-[80vh] flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
             <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 transform scale-100 hover:scale-110"
              src={dish.image || 'https://playswellwithbutter.com/wp-content/uploads/2021/04/Grilled-Bell-Peppers-6-960x1440.jpg'}  
              alt={dish.dish_name}
              // alt={dish.dishName}  
            />
            <div className="absolute px-5 inset-0 flex flex-col items-center justify-center text-white z-20">
              <h1 className="text-5xl font-bold mb-4">{dish.dish_name}</h1>  
              {/* <h1 className="text-5xl font-bold mb-4">{dish.dishName}</h1>   */}

              {/* <div className="flex text-2xl items-center justify-center mb-4">
                {renderStarRating(0)}  
                {renderStarRating(dish.rating)}  
                <span className="ml-2 text-2xl font-semibold">
                  {dish.rating} 
                </span>
              </div> */}
              
              <p className="text-lg text-justify max-w-lg mx-auto mb-8">{dish.description}</p>  
            </div>
          </div> 
        </div>
      ))}
    </Slider>
  );
}

export default SeeMoreDescription;
