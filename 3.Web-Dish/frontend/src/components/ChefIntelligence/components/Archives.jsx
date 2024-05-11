import Typewriter from "../components/Typewriter";
import { archived } from "../data/archivedData";
import Card2 from "../../Card2";

export default function Archives({ lightMode }) {
    return (
        <div className="flex flex-col w-full md:w-5/6 mx-auto min-h-[calc(100dvh-56px)] items-center justify-center px-2">
            <img src='/assets/CompanyLogo.png' alt="" className="w-36 h-36" />
            <Typewriter text="Chef Intelligence" delay={200} />

            <h2 className="mb-2 text-3xl md:text-4xl font-semibold">Archived Recipes</h2>

            <div className="flex flex-wrap gap-3 justify-center">
                {archived.map((item, i) => (
                    <Card2 
                        key={i}
                        title={item.dishName}
                        imageUrl={item.dishImage}
                        time="60"
                        rating={item.rating}
                        dishPath="/chef-intelligence/generatedDish"
                    />
                ))}
            </div>
            
        </div>
    );
}