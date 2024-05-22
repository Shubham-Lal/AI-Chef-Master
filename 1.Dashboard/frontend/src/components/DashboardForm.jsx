import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";
import { statesData } from "../Data/statesData";
import { debounce } from "lodash";
import { nonVegetarianIngredients } from "../Data/nonVegetarianIngredients";

const DashboardForm = ({ setTab, form, setForm }) => {
  const [courseName, setCourseName] = useState("");

  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.account_id) {
      const updatedFormData = { ...form, chef: user.account_id, courses: form.courses || [] };
      localStorage.setItem("formData", JSON.stringify(updatedFormData));
    }
  }, [form]);

  const inputHandlerCourse = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "" || form.courses.some(course => course.name === selectedValue)) {
      return;
    }

    const courseObject = { name: selectedValue };
    setCourseName(selectedValue);
    const updatedForm = {
      ...form,
      courses: [...form.courses, courseObject],
    };
    setForm(updatedForm);
    saveFormDataToLocalStorage(updatedForm);
  };

  const removeCourse = (name) => {
    const updatedCourses = form.courses.filter(
      (course) => course.name !== name
    );

    setForm((prevData) => ({
      ...prevData,
      courses: updatedCourses,
    }));
  };

  const saveFormDataToLocalStorage = (form) => {
    localStorage.setItem("formData", JSON.stringify(form));
  };

  const debouncedCheckDishExists = debounce(async (dishName) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/chef/checkDishExists?name=${dishName.toLowerCase()}`);
      if (response.data.exists) {
        setError('Dish already exists');
      } else {
        setError('');
      }
    } catch (error) {
      setError('Error checking dish existence');
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form };

    if (name === "name") {
      updatedForm = {
        ...updatedForm,
        [name]: value,
      };

      if (value.trim() === "") {
        setError('');
      } else {
        debouncedCheckDishExists(value);
      }
    } else {
      if (name === "popularity_state" && value === "") {
        updatedForm = {
          ...updatedForm,
          popularity_state: "",
          cuisine: "",
        };
      } else if (name === "popularity_state" && value !== "") {
        updatedForm = {
          ...updatedForm,
          [name]: value,
          cuisine: "Indian",
        };
      } else {
        updatedForm = {
          ...updatedForm,
          [name]: value,
        };
      }
    }

    setForm(updatedForm);
    saveFormDataToLocalStorage(updatedForm);
  };

  const [kitchenEquipmentName, setKitchenEquipmentName] = useState("");

  const handleKitchenEquipmentChange = (e) => {
    setKitchenEquipmentName(e.target.value);
  };

  const handleKitchenEquipmentSubmit = () => {
    if (kitchenEquipmentName) {
      const newKitchenEquipment = kitchenEquipmentName;
      setForm((prevData) => ({
        ...prevData,
        kitchen_equipments: [...prevData.kitchen_equipments, newKitchenEquipment],
      }));
      localStorage.setItem("formData", JSON.stringify({
        ...form,
        kitchen_equipments: [...form.kitchen_equipments, newKitchenEquipment],
      }));
      setKitchenEquipmentName("");
    }
  };

  const removeKitchenEquipment = (equipment) => {
    const updatedEquipments = form.kitchen_equipments.filter(
      (item) => item !== equipment
    );
    setForm((prevData) => ({
      ...prevData,
      kitchen_equipments: updatedEquipments,
    }));
    localStorage.setItem("formData", JSON.stringify({
      ...form,
      kitchen_equipments: updatedEquipments,
    }));
  };

  const isNonVegIngredient = (ingredientName) => {
    const lowerCaseName = ingredientName.toLowerCase();
    return nonVegetarianIngredients.some(nonVeg => nonVeg.toLowerCase() === lowerCaseName);
  };

  const handleNextTab = async () => {
    const requiredFields = [
      { name: 'name', label: 'Dish Name' },
      { name: 'veg_non_veg', label: 'Veg or Non Veg' },
      { name: 'description', label: 'Dish Description' },
      { name: 'cuisine', label: 'Cuisine' },
      { name: 'kitchen_equipments', label: 'Kitchen Equipments' },
      { name: 'courses', label: 'Course Type' }
    ];

    for (const field of requiredFields) {
      if (field.name === 'courses' && form[field.name].length === 0) {
        toast.error(`${field.label} is required.`);
        return;
      } else if (field.name === 'kitchen_equipments' && form[field.name].length === 0) {
        toast.error(`${field.label} is required.`);
        return;
      } else if (field.name !== 'courses' && field.name !== 'kitchen_equipments' && form[field.name].trim() === '') {
        toast.error(`${field.label} is required.`);
        return;
      }
    }

    if (form.veg_non_veg === 'Vegetarian' && form.ingredients.length > 0) {
      const filteredIngredients = form.ingredients.filter(ingredient => !isNonVegIngredient(ingredient.name));

      setForm({
        ...form,
        ingredients: filteredIngredients,
      });

      localStorage.setItem('formData', JSON.stringify({
        ...form,
        ingredients: filteredIngredients,
      }));
    }

    setTab(1);
  };

  useEffect(() => {
    const dishExists = async () => {
      if (form.name.trim()) {
        try {
          setIsLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/chef/checkDishExists?name=${form.name.trim().toLowerCase()}`);
          if (response.data.exists) {
            setError('Dish already exists');
          } else {
            setError('');
          }
        } catch (error) {
          console.log(error)
          setError('Error checking dish existence');
        } finally {
          setIsLoading(false);
        }
      }
    }
    dishExists();
  }, []);

  return (
    <div className="pt-0 w-[90%] lg:w-[75%] xl:w-1/2">
      <div className="py-6 text-center">
        <p className="custom-text text-3xl font-medium ">
          Enter details of a new dish
        </p>
        <p className="custom-text-secondary text-sm italic font-semibold py-1">*Before creating a new dish, please use our word search feature to check if it already exists in our database</p>
      </div>

      {/* form  */}
      <div className="custom-bg p-1 md:p-2 lg:p-4 w-full  rounded-lg shadow-xl">
        <div className="bg-gradient-to-b  relative backdrop-filter backdrop-blur-xl rounded-lg items-center">
          {/* <div className='w-[400px] h-[400px]  rounded-full absolute top-[-40px] left-[-40px] blur-3xl z-[-10] bg-[#14318629]  '></div>  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 p-4 pb-0 lg:px-8 lg:gap-8">
            <div className="flex flex-col pt-4 relative">
              <label
                htmlFor=""
                className="custom-text text-md font-medium pb-2"
              >
                Dish Name <span className="text-rose-600">*</span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="eg Birayni"
                onChange={(e) => {
                  setIsLoading(true);
                  inputHandler(e);
                }}
                value={form.name}
                className={`custom-input custom-text border px-2 py-1 text-lg  border-black rounded-md placeholder:italic outline-none ${error ? "border-red-500 focus:border-red-500" : "focus:border-orange-400"}`}
                required
              />

              <div className={`${isLoading ? "text-orange-400" : "text-red-500"} absolute right-0`}>
                {isLoading && form.name.trim() ? "Checking..." : error}
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="" className="custom-text text-md font-medium pb-2">
                Veg or Non-veg <span className="text-rose-600">*</span>
              </label>
              <select
                name="veg_non_veg"
                value={form.veg_non_veg}
                onChange={inputHandler}
                className="custom-input custom-text text-lg border rounded-md p-2 border-black outline-none placeholder:italic focus:border-orange-400"
              >
                <option className="italic" value="">Please select</option>
                <option className="italic" value="Vegetarian">Vegetarian</option>
                <option className="italic" value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>

          <div className="p-4 pt-0 pb-0 lg:px-8">
            <div className="flex flex-col pt-4">
              <label
                htmlFor=""
                className="custom-text text-md font-medium pb-2"
              >
                Dish Description  <span className="text-rose-600">*</span>
              </label>

              <textarea
                type="textarea"
                name="description"
                placeholder="eg Biryani is Indian dish..."
                onChange={inputHandler}
                value={form.description}

                className="custom-input custom-text border px-2 py-1 text-lg w-full border-black rounded-md placeholder:italic outline-none focus:border-orange-400"
              />
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className="custom-text text-md font-medium pb-2"
                >
                  Popularity State
                </label>
                <select
                  name="popularity_state"
                  value={form.popularity_state}
                  onChange={inputHandler}
                  className="custom-input custom-text text-lg border rounded-md p-2 border-black outline-none placeholder:italic focus:border-orange-400"
                >
                  <option value="">Select State</option>
                  {statesData.map((state) => (
                    <option className="italic" value={state} key={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col pt-4">
                <label
                  htmlFor=""
                  className="custom-text text-md font-medium pb-2"
                >
                  Cuisine  <span className="text-rose-600">*</span>
                </label>

                <input
                  type="text"
                  name="cuisine"
                  onChange={inputHandler}
                  value={form.cuisine}
                  className="custom-input custom-text border px-2 py-1 text-lg border-black rounded-md placeholder:text-gray-400 outline-none placeholder:italic focus:border-orange-400"
                  placeholder="Select Cuisine"
                />
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <label className="custom-text text-md font-medium pb-2">Kitchen Equipments <span className="text-rose-600">*</span></label>
              <div className="w-full flex items-center gap-4">
                <input
                  name="kitchen_equipments"
                  value={kitchenEquipmentName}
                  onChange={handleKitchenEquipmentChange}
                  placeholder="eg. Oven, Pan, Spatula"
                  className="custom-input custom-text flex-1 border px-2 py-1 placeholder:italic text-lg border-black rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
                />
                <button onClick={handleKitchenEquipmentSubmit} type="button" className="">
                  <IoIosAdd className="text-green-500 text-3xl rounded-full border border-green-600 hover:bg-green-200" />
                </button>
              </div>
              <ul className="flex flex-wrap gap-2 my-2 w-full">
                {form.kitchen_equipments && form.kitchen_equipments.map((equipment, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-amber-300 font-medium flex flex-row rounded-md items-center gap-2 px-2 py-1"
                    >
                      <span>{equipment}</span>
                      <IoIosClose
                        onClick={() => removeKitchenEquipment(equipment)}
                        className="text-xl cursor-pointer border border-black hover:bg-amber-500 rounded-full"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="flex flex-col px-4 lg:px-8 pb-8">
            <div className="flex flex-col">
              <label htmlFor="course_type" className="custom-text text-md font-medium pb-2">
                Course Type  <span className="text-rose-600">*</span>
              </label>

              <select
                name="course_type"
                onChange={inputHandlerCourse}
                value={courseName}
                className="custom-input custom-text border p-2 placeholder:italic text-lg border-black rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400"
              >
                <option value="">Select Course Type</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Beverages">Beverages</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Brunch">Brunch</option>
                <option value="Desserts">Desserts</option>
                <option value="Dinner">Dinner</option>
                <option value="Lunch">Lunch</option>
                <option value="Main Course">Main Course</option>
                <option value="Side Dishes">Side Dishes</option>
              </select>

              <ul className="flex flex-wrap gap-2 my-2 w-full">
                {form.courses && form.courses.map((course, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-amber-300 font-medium flex flex-row rounded-md items-center gap-2 px-2 py-1"
                    >
                      <span>{course.name}</span>
                      <IoIosClose
                        onClick={() => removeCourse(course.name)}
                        className="text-xl cursor-pointer  border  border-black hover:bg-amber-500 rounded-full"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center my-5">
        <button
          onClick={handleNextTab}
           disabled={isLoading || error}
          className={  "bg-green-600 hover:bg-green-800 px-8 py-2 overflow-hidden font-medium rounded-xl border  text-xl md:text-2xl "}
        >
          <span className=" text-white">
            Next
          </span>
        </button>
      </div>
    </div>
  )
}

export default DashboardForm