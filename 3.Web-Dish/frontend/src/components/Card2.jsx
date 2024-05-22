// Card2.js
import React from "react";
import { FaStar } from "react-icons/fa";
import "./Card2.css";
import { Link } from "react-router-dom";

const Card2 = ({ title, imageUrl, time, rating, dishPath }) => {
  return (
    <Link to={dishPath} onClick={() => window.scrollTo(0, 0)} className="flex justify-center h-full">
      <div className="card bg-[#00544f] rounded-lg overflow-hidden h-full card-hover-effect relative">
        {/* Image */}
        <div className="image-container relative">
          <img  
            className="w-full h-48 object-cover rounded-t-lg border-2 border-[#00544f]"
            src={imageUrl}
            alt={title} 
          />   
          {/* Rating */}
          <div className="rating-container absolute top-0 right-0 p-2">
            <div className="rating-content">
              <FaStar className="star-icon" />
              <p className="rating-text">{rating}/5</p>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="flex flex-col flex-grow py-4">
          <p className="text-white text-center font-semibold">{title}</p>
          <p className="text-white text-center font-semibold">Prep Time: {time} min</p>
       </div>
      </div>
    </Link>
  );
};

export default Card2;
