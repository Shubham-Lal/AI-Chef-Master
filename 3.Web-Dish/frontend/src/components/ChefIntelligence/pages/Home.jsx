import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import { darkColors, lightColors } from "../data/homeTheme";
import Typewriter from "../components/Typewriter";
import { IoIosAdd, IoIosClose } from "react-icons/io";
// import Overview from "../components/Overview";

export default function Home({ lightMode }) {
    const navigate = useNavigate()
    const { user } = useAuthContext();
    const colors = lightMode ? lightColors : darkColors;
    let userData;
    try { userData = JSON.parse(localStorage.getItem('user')); }
    catch (error) {
        userData = {};
    }

    // const [openOverview, setOpenOverview] = useState(false);

    const [ingredientData, setIngredientData] = useState([
        { ingredient: "", quantity: "", unit: "" },
    ]);

    const handleInputChange = (index, event) => {
        if (!user) return toast.error('Please login to proceed!');
        const { name, value } = event.target;
        const newIngredientData = ingredientData.map((row, i) => {
            if (i !== index) return row;
            return { ...row, [name]: value };
        });
        setIngredientData(newIngredientData);
    };

    const handleAddIngredient = () => {
        if (!user) return toast.error('Please login to proceed!');
        setIngredientData([...ingredientData, { ingredient: "", quantity: "", unit: "" }]);
    };

    const [equipmentData, setEquipmentData] = useState([]);
    const [newEquipment, setNewEquipment] = useState('');

    const handleAddEquipment = () => {
        if (!user) return toast.error('Please login to proceed!');
        if (!newEquipment.trim()) return;
        setEquipmentData([...equipmentData, newEquipment]);
        setNewEquipment('');
    };

    const handleStartProcess = async (e) => {
        e.preventDefault();

        if (!user) return toast.error('Please login to proceed!');
        for (let i = 0; i < ingredientData.length; i++) {
            const row = ingredientData[i];
            if (!row.ingredient || !row.quantity) {
                let missingData = [];
                if (!row.ingredient) missingData.push("Ingredient");
                if (!row.quantity) missingData.push("Quantity");
                if (!row.unit) missingData.push("Unit");
                return toast.error(`Row ${i + 1} is missing: ${missingData.join(", ")}`);
            }
        }

        const data = {
            user: {
                email: user.email,
                name: user.name,
                user_id: user.user_id
            },
            ingredients: ingredientData,
            equipments: equipmentData
        }

        await fetch(`${import.meta.env.VITE_API_URL}/start-process`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userData.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => {
            toast.success('Started processing...');
            setIngredientData([{ ingredient: "", quantity: "" }]);
            navigate('generatedDish');
        }).catch(() => toast.error('Something went wrong.'));
    }

    return (
        <>
            <div className="flex flex-col w-full md:w-5/6 mx-auto min-h-[calc(100dvh-56px)] items-center justify-center px-2">
                <img src='/assets/CompanyLogo.png' alt="" className="w-36 h-36" />
                <Typewriter text="Chef Intelligence" delay={200} />
                <p className={`${colors.textParagraph} text-base lg:text-lg  mt-4 mb-0 text-center font-semibold max-w-2xl`}>
                    Elevate your culinary skills with the power of AI. Search for
                    ingredients and equipment effortlessly to create masterful dishes.
                </p>
                <p className={`${colors.textParagraph} text-lg mb-12 lg:mb-4 text-center hidden lg:block font-semibold`}>
                    Start your culinary adventure today with AI Chef Master!
                </p>

                <div className={`${colors.backgroundOfDiv} max-w-[690px] w-full shadow-xl rounded-xl p-3 justify-center lg:mt-2 mt-12`}>
                    <p className="w-full font-semibold text-2xl text-center">Ingredients</p>
                    {ingredientData.map((row, index) => (
                        <div key={index} className="gap-2 mb-2">
                            <div className="flex-col flex gap-3 lg:flex-row mt-4">
                                <input
                                    className={`flex p-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-yellow-500 ${colors.inputBackground} ${colors.inputText}`}
                                    type="text"
                                    placeholder="Name"
                                    name="ingredient"
                                    value={row.ingredient}
                                    onChange={(event) => handleInputChange(index, event)}
                                    required
                                />
                                <input
                                    className={`flex p-2 border border-gray-300 rounded placeholder-gray-400 focus:outline-none focus:border-yellow-500 ${colors.inputBackground} ${colors.inputText}`}
                                    type="number"
                                    placeholder="Quantity"
                                    name="quantity"
                                    value={row.quantity}
                                    onChange={(event) => handleInputChange(index, event)}
                                    required
                                />
                                <select
                                    placeholder="Quantity"
                                    name="unit"
                                    value={row.unit}
                                    onChange={(event) => handleInputChange(index, event)}
                                    className={`bg-transparent md:w-32 flex p-2 border border-gray-300  rounded placeholder-gray-400 focus:outline-none focus:border-yellow-500 ${colors.inputBackground} ${colors.inputText}`}
                                >

                                    <option value="" >Select Unit</option>
                                    <option value="gram">gram</option>
                                    <option value="mL">mL</option>
                                    <option value="teaspoon">teaspoon</option>
                                    <option value="tablespoon">tablespoon</option>
                                    <option value="whole">piece</option>
                                </select>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center gap-2 mt-4 lg:mt-6 items-center align-middle">
                        <button
                            onClick={handleAddIngredient}
                            className={`py-2 px-4 ${colors.buttonBackground} ${colors.buttonHoverBackground} ${colors.buttonTextColor} ${colors.buttonHoverTextColor} font-bold rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
                        >
                            Add More
                        </button>
                    </div>
                </div>


                <div className={`${colors.backgroundOfDiv} max-w-[690px] w-full shadow-xl rounded-xl p-3 justify-center mt-8`}>
                    <p className="w-full font-semibold text-2xl text-center">Equipments</p>
                    <div className="mt-[20px] w-full flex items-center gap-4">
                        <input
                            name="equipments"
                            onChange={e => {
                                if (!user) return toast.error('Please login to proceed!');
                                setNewEquipment(e.target.value);
                            }}
                            placeholder="eg. Oven"
                            className={`${colors.inputBackground} ${colors.inputText} flex-1 border border-gray-300 px-2 py-1 placeholder:italic text-lg rounded-md placeholder:text-gray-400 outline-none focus:border-orange-400`}
                            value={newEquipment}
                        />
                        <button onClick={handleAddEquipment} type="button" className="">
                            <IoIosAdd className="text-green-500 text-3xl rounded-full border border-green-600 hover:bg-green-200" />
                        </button>
                    </div>
                    <ul className="flex flex-wrap gap-2 my-2 w-full">
                        {equipmentData.map((equipment, index) => (
                            <li
                                key={index}
                                className="bg-amber-300 font-medium flex flex-row rounded-md items-center gap-2 px-2 py-1"
                            >
                                <span>{equipment}</span>
                                <IoIosClose
                                    onClick={() => {
                                        const updatedEquipmentData = equipmentData.filter((_, i) => i !== index);
                                        setEquipmentData(updatedEquipmentData);
                                    }}
                                    className="text-xl cursor-pointer border border-black hover:bg-amber-500 rounded-full"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 mb-4 flex gap-4 items-center">
                    {/* <button
                        onClick={() => {
                            document.body.style.overflow = "hidden";
                            setOpenOverview(true);
                        }}
                        className={`${colors.overviewButton} ${colors.buttonHoverBackground} ${colors.buttonTextColor} ${colors.buttonHoverTextColor} w-fit mx-auto text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${colors.buttonHoverTextColor}`}
                    >
                        Overview
                    </button> */}
                    <button
                        onClick={handleStartProcess}
                        className={`${colors.button} ${colors.buttonHoverBackground} ${colors.buttonTextColor} ${colors.buttonHoverTextColor} w-fit mx-auto text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 ${colors.buttonHoverTextColor}`}
                    >
                        Start To Process
                    </button>
                </div>
            </div>

            {/* {openOverview && <Overview setOpenOverview={setOpenOverview} ingredientData={ingredientData} equipmentData={equipmentData} />} */}
        </>
    );
}

// {
//     ingredientData.map((row, index) => (
//         <div key={index} className="my-4">
//             <div className="border border-gray-300 p-4 rounded-md shadow-md">
//                 <ul>
//                     <li>
//                         <strong>Ingredient:</strong> {row.ingredient}
//                     </li>
//                     <li>
//                         <strong>Quantity:</strong> {row.quantity}
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     ))
// }