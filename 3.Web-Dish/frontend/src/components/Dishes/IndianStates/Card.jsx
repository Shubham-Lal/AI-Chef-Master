import React from "react";
import Card2 from "../../Card2";
import { Link } from "react-router-dom";
import { dishesSeeMorePath } from "../../../Data/SeeMorePathUrl";
import { Flip } from "react-reveal";
import { useSpring, animated } from 'react-spring';
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";

const Card = ({ title, famousDish }) => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    return (
        <div className="mx-2">
            <div className="flex flex-row justify-between items-center">
                <div className="flex font-bold text-xl md:text-2xl lg:text-4xl items-baseline mt-12">{title}</div>
                {dishesSeeMorePath.map((path, index) => (
                    title === path.title && (
                        <Link key={index} to={path.pathUrl} onClick={() => window.scrollTo(0, 0)}>
                            <button className="ml-12 font-bold px-2 mt-12 h-7">
                                <div className="flex items-center mb-5 justify-center" onClick={() => window.scrollTo(0, 0)}>
                                    <MdOutlineUnfoldMoreDouble size={30} />
                                </div>
                            </button>
                        </Link>
                    )
                ))}
            </div>

            <div className="flex overflow-x-scroll smooth-scroll gap-3">
                {famousDish.map((dish, index) => (
                    <Flip key={index} cascade left>
                        <animated.div style={fadeIn} className="flex-grow h-full py-3">
                            <div style={{ height: "280px" }}>
                                <Card2
                                    title={dish.dish_name}
                                    dishPath={`/dish/${dish.dish_name}`}
                                    imageUrl={dish.image}
                                    time={dish.cooking_time}
                                    rating={0}
                                />
                            </div>
                        </animated.div>
                    </Flip>
                ))}
            </div>
        </div>
    );
};

export default Card;
