import { useEffect, useState } from "react";
import { IoIosClose, IoIosPie } from "react-icons/io";
import { nonVegetarianIngredients } from "../../Data/nonVegetarianIngredients";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import "./style.css";

const Ingredient = ({ formData, setFormData, portion }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [isQuantityDisabled, setIsQuantityDisabled] = useState(false);

  useEffect(() => {
    if (portion !== 1 && formData.ingredients.length > 0) {
      const firstIngredient =
        formData.ingredients[formData.ingredients.length - 1];
      setIngredientName(firstIngredient.name);
      setIngredientUnit(firstIngredient.unit);
      setIsQuantityDisabled(false);
    } else {
      if (portion !== 1) setIngredientName("");
      setIngredientUnit("");
      setIsQuantityDisabled(true);
    }
  }, [portion, formData.ingredients]);

  const handleIngredientSubmit = (e) => {
    e.preventDefault();

    if (portion != 1 && !ingredientQuantity)
      return toast.error(`Enter Ingredient quanitity for portion ${portion}`);

    if (ingredientName && ingredientQuantity > 0 && ingredientUnit) {
      if (portion === 1 && formData.ingredients.length > 0) {
        const lastIngredient =
          formData.ingredients[formData.ingredients.length - 1];
        const missingPortions = lastIngredient.quantity
          .slice(1)
          .reduce((acc, quantity, index) => {
            if (quantity === "") {
              acc.push(index + 2);
            }
            return acc;
          }, []);

        if (missingPortions.length > 0) {
          const firstMissingPortionIndex = missingPortions[0];
          toast.error(
            `Please complete adding the quantity for portion ${firstMissingPortionIndex} before adding a new ingredient.`
          );
          return;
        }
      }

      const newIngredient = {
        name: ingredientName,
        quantity: ["", "", "", "", ""],
        unit: ingredientUnit,
      };
      newIngredient.quantity[portion - 1] = ingredientQuantity;

      const lowerCaseIngredientName = ingredientName.toLowerCase();
      const isNonVegetarian = nonVegetarianIngredients.some((ingredient) =>
        lowerCaseIngredientName.includes(ingredient.toLowerCase())
      );

      if (formData.veg_non_veg === "Vegetarian" && isNonVegetarian) {
        toast.error(
          "Cannot add Non-Vegetarian ingredient to a Vegetarian recipe."
        );
        return;
      }

      const existingIngredientIndex = formData.ingredients.findIndex(
        (ingredient) =>
          ingredient.name.toLowerCase() === ingredientName.toLowerCase()
      );

      let updatedIngredients;
      if (existingIngredientIndex !== -1) {
        updatedIngredients = formData.ingredients.map((ingredient, index) => {
          if (index === existingIngredientIndex) {
            const updatedQuantity = [...ingredient.quantity];

            const newQuantityValue = Number(ingredientQuantity);

            const isGreaterThanOrEqualToPrevious = updatedQuantity
              .slice(0, portion - 1)
              .every((q) => q === "" || newQuantityValue >= Number(q));
            if (!isGreaterThanOrEqualToPrevious) {
              toast.error(
                "The current quantity value is less than the previous quantity value."
              );
              return ingredient;
            }

            const isLessThanOrEqualToNext = updatedQuantity
              .slice(portion)
              .every((q) => q === "" || newQuantityValue <= Number(q));
            if (!isLessThanOrEqualToNext) {
              toast.error(
                "The current quantity value is greater than the next quantity value."
              );
              return ingredient;
            }

            updatedQuantity[portion - 1] = ingredientQuantity;
            return {
              ...ingredient,
              quantity: updatedQuantity,
            };
          }
          return ingredient;
        });
      } else {
        updatedIngredients = [...formData.ingredients, newIngredient];
      }

      const updatedFormData = {
        ...formData,
        ingredients: updatedIngredients,
      };

      setFormData(updatedFormData);
      localStorage.setItem("formData", JSON.stringify(updatedFormData));

      setIngredientName("");
      setIngredientQuantity("");
      setIngredientUnit("gram");
    }
  };

  const removeIngredient = (name, portionToRemove) => {
    if (portionToRemove === 1) {
      const updatedIngredients = formData.ingredients.filter(
        (ingredient) => ingredient.name !== name
      );
      setFormData({
        ...formData,
        ingredients: updatedIngredients,
      });
      localStorage.setItem(
        "formData",
        JSON.stringify({
          ...formData,
          ingredients: updatedIngredients,
        })
      );
    } else {
      const updatedIngredients = formData.ingredients.map((ingredient) => {
        if (ingredient.name === name) {
          const updatedQuantity = [...ingredient.quantity];
          updatedQuantity[portionToRemove - 1] = "";
          return {
            ...ingredient,
            quantity: updatedQuantity,
          };
        }
        return ingredient;
      });
      setFormData({
        ...formData,
        ingredients: updatedIngredients,
      });
      localStorage.setItem(
        "formData",
        JSON.stringify({
          ...formData,
          ingredients: updatedIngredients,
        })
      );
    }
  };

  const isQuantityFilledForPortion = (portion) => {
    if (formData.ingredients.length === 0) return false;
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];
    if (!lastIngredient) return false;
    return lastIngredient.quantity[portion - 1] !== "";
  };

  return (
    <>
      {" "}
      <p className="custom-text text-3xl text-center flex justify-center items-center gap-2 font-medium pt-8">
        Ingredients <IoIosPie className="text-green-600" />{" "}
        <h1 className="font-semibold mt-6 md:mt-0 text-3xl text-center flex gap-2 items-center ml-3">
          <div className="group relative inline-block whitespace-nowrap">
            <span className="flex size-8 px-3 py-1 cursor-pointer items-center justify-center rounded-full bg-primary text-sm font-semibold text-green-600 bg-gray-100">
              i
            </span>


            <span
              role="tooltip"
              className="pointer-events-none absolute inline-flex items-center justify-center rounded-md px-3 py-1 font-semibold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-primary text-gray-800  bg-gray-100 min-h-7 text-sm left-1/2 -translate-x-1/2 after:absolute after:block after:size-0 after:border-8 after:border-transparent after:border-t-primary after:-bottom-[0.95rem] after:left-1/2 after:-translate-x-1/3 top-[-2.5rem] z-90 mt-1"
            >
              Please add all ingredients separately{" "}
            </span>
          </div>
        </h1>
      </p>
      <p className="custom-text-secondary text-center text-sm italic font-semibold">
        * Enter quantity for portion {portion}
      </p>
      <div className="bg-transparent rounded-xl p-4 lg:p-8 py-4 lg:py-4 flex flex-col justify-center items-center">
        <div className="w-full">
          {portion === 1 || !isQuantityFilledForPortion(portion) ? (
            <>
              <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
                  <label className="custom-text block">
                    Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    disabled={portion !== 1}
                    type="text"
                    name="ingredient_name"
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    placeholder="eg. Chicken"
                    className={`custom-input custom-text ${
                      portion !== 1 ? "cursor-not-allowed" : "cursor-text"
                    } px-2 mt-2 py-1 text-lg w-full border border-black rounded-md focus:border-orange-400 placeholder:italic outline-none`}
                  />
                </div>

                                        className={`custom-input custom-text ${portion !== 1 ? "cursor-not-allowed" : "cursor-pointer"} px-2 mt-2 py-[7px] text-lg w-full border border-black rounded-md focus:border-orange-400 placeholder:italic outline-none`}
                                    >
                                        <option value="">Select Unit</option>
                                        <option value="gram">gram</option>
                                        <option value="mL">mL</option>
                                        <option value="teaspoon">teaspoon</option>
                                        <option value="tablespoon">tablespoon</option>
                                        <option value="whole">piece</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                {portion === 1 ? (
                                    <button
                                        onClick={handleIngredientSubmit}
                                        type="button"
                                        className={`text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950`}
                                    >
                                        Add Ingredient
                                    </button>
                                ) : portion !== 1 && !isQuantityDisabled && (
                                    <button
                                        onClick={handleIngredientSubmit}
                                        type="button"
                                        className={`text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950`}
                                    >
                                        Add Quantity
                                    </button>
                                )}
                            </div>
                        </>
                    ) : null}


                <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
                  <label className="custom-text block">
                    Quantity <span className="text-rose-600">*</span>
                  </label>
                  <input
                    disabled={portion !== 1 && isQuantityDisabled}
                    type="number"
                    name="ingredient_quantity"
                    value={ingredientQuantity}
                    onChange={(e) => setIngredientQuantity(e.target.value)}
                    onFocus={(e) =>
                      e.target.addEventListener(
                        "wheel",
                        function (e) {
                          e.preventDefault();
                        },
                        { passive: false }
                      )
                    }
                    placeholder="eg. 200"
                    className={`custom-input custom-text ${
                      portion !== 1 && isQuantityDisabled
                        ? "cursor-not-allowed"
                        : "cursor-text"
                    } input-number px-2 mt-2 py-1 text-lg w-full border border-black rounded-md placeholder:italic focus:border-orange-400 outline-none`}
                  />
                </div>
                <div className="w-full lg:w-1/2 pt-4 lg:pt-0">
                  <label className="custom-text block">
                    Unit <span className="text-rose-600">*</span>
                  </label>
                  <select
                    disabled={portion !== 1}
                    name="ingredient_unit"
                    value={ingredientUnit}
                    onChange={(e) => setIngredientUnit(e.target.value)}
                    className={`custom-input custom-text ${
                      portion !== 1 ? "cursor-not-allowed" : "cursor-pointer"
                    } px-2 mt-2 py-[7px] text-lg w-full border border-black rounded-md focus:border-orange-400 placeholder:italic outline-none`}
                  >
                    <option value="gram">gram</option>
                    <option value="mL">mL</option>
                    <option value="teaspoon">teaspoon</option>
                    <option value="tablespoon">tablespoon</option>
                    <option value="whole">piece</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full items-center justify-center">
                {portion === 1 ? (
                  <button
                    onClick={handleIngredientSubmit}
                    type="button"
                    className={`text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950`}
                  >
                    Add Ingredient
                  </button>
                ) : (
                  portion !== 1 &&
                  !isQuantityDisabled && (
                    <button
                      onClick={handleIngredientSubmit}
                      type="button"
                      className={`text-white border  bg-zinc-700 p-2 px-6 my-4 rounded-xl hover:bg-zinc-950`}
                    >
                      Add Quantity
                    </button>
                  )
                )}
              </div>
            </>
          ) : null}

          <ul className="flex flex-wrap gap-2 lg:gap-4 w-full">
            {formData.ingredients
              .filter((ingredient) => ingredient.quantity[portion - 1] !== "")
              .map((ingredient, index) => (
                <li
                  key={index}
                  className="bg-amber-300 font-medium flex rounded-md items-center gap-2 px-2 py-1"
                >
                  <span>
                    {ingredient.name} -{" "}
                    {ingredient.quantity[portion - 1]
                      ? ingredient.quantity[portion - 1]
                      : "N/A"}{" "}
                    {ingredient.unit}
                  </span>
                  {portion === 1 ? (
                    <IoIosClose
                      onClick={() => removeIngredient(ingredient.name, portion)}
                      className="text-xl cursor-pointer border border-black hover:bg-amber-500 rounded-full"
                    />
                  ) : (
                    <MdEdit
                      onClick={() => removeIngredient(ingredient.name, portion)}
                      className="text-xl cursor-pointer rounded-full"
                    />
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Ingredient;
