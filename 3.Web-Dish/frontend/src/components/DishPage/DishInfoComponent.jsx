import { useState } from "react"
import Marquee from "react-fast-marquee"
import { Flip } from "react-reveal"
import { useSpring, animated } from 'react-spring'
import SingleDish from "../../pages/SingleDish"
import RecommendedData from "../../Data/RecommendedData"
import Card2 from "../Card2";
import Footer from "../FooterItem/Footer"

const DishInfoComponent = ({ dish, setStartCooking, people, setPeople }) => {
    const [fadeIn, setFadeIn] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    }));

    return (
        <div className="bg-[#f7f3cd] min-h-screen">
            <SingleDish
                dishTitle={dish.dish_name}
                dishImage={dish.image}
                dishDescription={dish.description}
                dishAlt={dish.dish_name}
                dishType={dish.veg_non_veg}
                preprationTime={dish.cooking_time}
                dishIngredients={dish.ingredients.length}
                dishCalories='500kcal'
            />

            <div className="px-12">
                <MainIngradients mainIngredients={dish.ingredients} />
                <KitchenEquipments kitchenEquipments={dish.kitchen_equipments} />
                <NumberOfPeople people={people} setPeople={setPeople} />
            </div>

            <div className="flex items-center justify-center my-8">
                <button
                    className="p-2 px-4 bg-indigo-600 text-white font-bold rounded-lg"
                    onClick={() => {
                        setStartCooking(true);
                        window.scrollTo(0, 0)
                    }}>
                    Start Cooking
                </button>
            </div>

            <div className='mb-5'>
                <div className="pb-6 pt-6 px-4 md:px-8">
                    <h1 className='text-center text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold'>Recommended Dishes</h1>
                </div>
                <Marquee>
                    <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden">
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
            <Footer />
        </div>
    )
}

function MainIngradients({ mainIngredients }) {
    return <div>
        <h1 className=" text-green-700 font-bold mt-5 text-2xl md:text-3xl">Main Ingradients</h1>
        <div className="m-4">
            <ul className="list-inside list-disc text-lg">
                {mainIngredients.map((item, index) => (
                    <li className="mb-2" key={index}>
                        <span className="font-semibold">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>;
}

const KitchenEquipments = ({ kitchenEquipments }) => {
    return (
        <div className="">
            <h1 className=" text-green-700 text-2xl font-bold mt-5">Kitchen Equipments</h1>

            <div className="m-4">
                <ul className="list-inside list-disc text-lg">
                    {kitchenEquipments.map((item, index) => (
                        <li className="mb-2" key={index}>
                            <span className="font-semibold">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const NumberOfPeople = ({ people, setPeople }) => {
    const handleRemovePeople = () => {
        if (people < 2) return;
        setPeople(--people);
    }
    const handleAddPeople = () => {
        if (people > 4) return;
        setPeople(++people);
    }

    return (
        <div>
            <div className="text-2xl md:text-3xl text-green-700 font-bold">Number of people</div>
            <div className="flex gap-3 border-2 border-slate-700 w-fit rounded-lg px-2 text-xl my-4">
                <button onClick={handleRemovePeople}>-</button>
                <div>{people}</div>
                <button onClick={handleAddPeople}>+</button>
            </div>
        </div>
    )
}

export default DishInfoComponent