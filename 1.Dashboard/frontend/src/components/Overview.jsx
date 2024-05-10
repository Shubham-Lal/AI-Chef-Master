import { BiDish, BiFoodTag } from "react-icons/bi";

const Overview = ({ form, color, value, open, setOpen, page }) => {
  return (
    <div className={`lg:max-w-[75%] mx-auto flex flex-col justify-center items-center font-primary ${color} py-10 px-1 lg:px-8`}>
      {value == "searchPage" ? (
        <button
          className="custom-btn px-4 py-1 rounded-md text-xl"
          onClick={() => {
            document.body.style.overflow = "";
            setOpen(false);
          }}
        >
          Back
        </button>
      ) : (
        <></>
      )}
      <p className="text-3xl text-center font-semibold text-amber-500 pb-4 flex items-center justify-center gap-4">
        Dish Overview <BiDish />
      </p>
      <div className="custom-text w-full">
        <div className="flex items-center gap-4 border-b border-zinc-500">
          <p className="p-1  py-2 font-semibold lg:text-xl">Dish Name - </p>{" "}
          <span className="text-lg capitalize">{form.name}</span>
        </div>
        <div className="flex items-center gap-4 border-b border-zinc-500">
          <p className="p-1  py-2 font-semibold lg:text-xl">
            Veg or Non-veg -{" "}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-lg ">{form.veg_non_veg}</span>
            <BiFoodTag size={22} color={`${form.veg_non_veg === "vegetarian" || form.veg_non_veg === "Vegetarian" ? "rgb(16 185 129)" : "rgb(244 63 94)"}`} />
          </div>
        </div>
        {form.popularity_state && (
          <div className="flex items-center gap-4 border-b border-zinc-500">
            <p className="p-1 py-2 font-semibold lg:text-xl">
              Popularity state -{" "}
            </p>
            <span className=" text-lg"> {form.popularity_state}</span>
          </div>
        )}
        <div className="flex items-center gap-4 border-b border-zinc-500">
          <p className="p-1  py-2 font-semibold lg:text-xl">Cuisine - </p>{" "}
          <span className="text-lg "> {form.cuisine}</span>
        </div>
        <div className="flex items-center gap-4 border-b border-zinc-500">
          <p className="p-1  py-2 font-semibold lg:text-xl">
            Kitchen Equipments -{" "}
          </p>{" "}
          <div>
            {form.kitchen_equipments && form.kitchen_equipments.map((equipment, index) => (
              <span className="text-lg" key={index}>
                {equipment}{form?.kitchen_equipments?.length !== index + 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 border-b border-zinc-500">
          <p className="p-1 py-2 font-semibold lg:text-xl">Course Types - </p>
          <div className="p-1 py-2">
            {form?.courses?.map((type, index) => (
              <span key={index} className="text-lg">
                {type.name}{form?.courses?.length !== index + 1 && ", "}
              </span>
            )
            )}
          </div>
        </div>

        {form?.instructions?.length > 0 && (
          <div className="flex items-center gap-4 border-b border-zinc-500">
            <p className="p-1 py-2 font-semibold lg:text-xl">Cooking time - </p>
            <span className=" text-lg">{form.cooking_time} min</span>
          </div>
        )}

        {form?.ingredients?.length > 0 || form?.instructions?.length > 0 ? (
          <div className="p-1 border-b border-zinc-500 py-2  gap-4">
            {Array.from({ length: 5 }, (_, portion) => (
              <div key={portion} className="portion">
                <h3 className="font-bold text-xl pt-2 underline">Portion {portion + 1}</h3>
                {form?.ingredients?.length > 0 && (
                  <>
                    <p className="font-semibold text-lg">Ingredient</p>
                    <ul>
                      {form?.ingredients?.map((ingredient, ingredientIndex) => (
                        <li key={ingredientIndex} className="text-lg">
                          {ingredientIndex + 1}. {ingredient.name}- {ingredient.quantity[portion]} {ingredient.unit}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {form?.instructions?.length > 0 && (
                  <>
                    <p className="font-semibold text-lg">Instruction</p>
                    <ol>
                      {form?.instructions?.map((instruction, instructionIndex) => (
                        <li key={instructionIndex} className="text-lg">
                          {instructionIndex + 1}. {instruction.step}- {instruction.time[portion]} min
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Overview;
