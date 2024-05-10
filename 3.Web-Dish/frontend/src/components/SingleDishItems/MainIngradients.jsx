import React from "react";

function MainIngradients({mainIngredients}) {
    return <div>
      <h1 className=" text-green-700 font-bold mt-5 text-2xl md:text-3xl">Main Ingredients</h1>
      <div className="m-4">
        <ul className="list-inside list-disc text-lg">
          {mainIngredients.map((item, index) => (
            <li className="mb-2" key={index}>
              <span className="font-semibold"> {item.title}</span>
            </li>
          ))}
        </ul>
      </div>
  </div>;
}

export default MainIngradients;
