import React, { useState } from "react";
import { BsFillStopwatchFill, BsFire } from "react-icons/bs";
import { SiCodechef } from "react-icons/si";
import 'plyr/dist/plyr.css';

const SingleDish = (props) => {
const { dishImage, dishAlt, dishTitle, dishType, preprationTime, dishIngredients, dishCalories, dishDescription } = props;

return (
<>
    <div className="h-full w-screen  pt-5 bg-[#f7f3cd] text-black">
        <div className="px-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full sm:w-8/12 md:w-7/12 ">
                <img src={dishImage} alt={dishAlt} className="rounded-lg w-full object-cover" />
            </div>
            <div className="flex flex-col w-full md:5/12">
                <div className="text-4xl md:text-4xl font-bold my-3">{dishTitle}</div>
                <div className="bg-[#00544f] text-white rounded-full w-fit py-1 px-2 mb-8">
                    {dishType}
                </div>

                <div className="flex flex-col justify-between  ">
                    <div className="flex items-center   justify-around text-white space-y-4 md:space-y-0 md:space-x-4 bg-[#00544f] py-2 rounded-2xl">
                        <div className="flex flex-col items-center md:flex-row gap-3">
                            <BsFillStopwatchFill className="text-4xl md:mt-2" />
                            <div className="font-semibold text-sm md:text-base">
                                <p className="text-xs md:text-sm">Time</p>
                                <p className="text-xs md:text-sm">{preprationTime} mins</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:flex-row gap-3">
                            <SiCodechef className="text-4xl md:mt-2" />
                            <div className="font-semibold text-sm md:text-base">
                                <p className="text-xs md:text-sm">Ingredients</p>
                                <p className="text-xs md:text-sm">{dishIngredients}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:flex-row gap-3">
                            <BsFire className="text-4xl md:mt-2" />
                            <div className="font-semibold text-sm md:text-base">
                                <p className="text-xs md:text-sm">Calories</p>
                                <p className="text-xs md:text-sm">{dishCalories}</p>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <h1 className="text-2xl font-bold pt-5">About the Dish</h1>
                        <p className="text-base md:text-lg text-justify"> {dishDescription} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
);
};

export default SingleDish;