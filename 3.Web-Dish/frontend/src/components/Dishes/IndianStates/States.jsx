import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { useSpring, animated } from 'react-spring';
import Flip from 'react-reveal/Flip';
import 'animate.css/animate.min.css';
import { FaAngleRight } from 'react-icons/fa6';
import { IndianStatesData } from '../../../Data/IndianStates/IndianStatesData';
import RecommendedData from '../../../Data/RecommendedData';
import Footer from '../../FooterItem/Footer';
import BannerCard from '../../BannerCard';
import Card2 from '../../Card2';

function IndianStates() {
    const [viewMore, setViewMore] = useState(0);

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    return (
        <div className='bg-[#f7f3cd]'>
            <div>
                <BannerCard
                    slides={[
                        { imageUrl: "https://static.toiimg.com/photo/74984407.cms?width=500&resizemode=4&imgsize=1699947" },
                        { imageUrl: "https://img.freepik.com/free-photo/photo-table-with-traditional-indian-food-celebrate-diwali_125540-3655.jpg" },
                        { imageUrl: "https://blog.bigbasket.com/wp-content/uploads/2023/04/South-Indian-main_584509564.jpeg" },
                    ]}
                    subtitle="Indian states boast diverse, flavorful cuisine"
                    title={<img src='https://see.fontimg.com/api/renderfont4/Gg5D/eyJyIjoiZnMiLCJoIjoxOTEsInciOjEyNTAsImZzIjoxNTMsImZnYyI6IiMwMDAwMDAiLCJiZ2MiOiIjRkZGRkZGIiwidCI6MX0/SW5kaWFu/samarkan-normal.png'
                        className=' filter invert w-96 flex'
                        alt="Indian"
                    />}
                />
            </div>

            <div className='mb-16'>
                <div className='flex mx-12 flex-row items-center justify-between '>
                    <div className='flex text-black text-[2rem] mt-12'>
                        <h1 className='font-bold items-baseline text-xl sm:text-2xl md:text-4xl'> States</h1>
                    </div>
                    <button
                        onClick={(e) => {
                            setViewMore(!viewMore);
                        }}
                        className='relative ml-12 text-black px-2 mt-12 h-7'
                    >
                        <div className='flex flex-row items-center text-black justify-center '>
                            <p className='font-bold text-lg sm:text-xl md:text-2xl'>{!viewMore ? 'See More' : 'See Less'}</p>
                            <FaAngleRight />
                        </div>
                    </button>
                </div>

                {!viewMore && (
                    <div className='flex  overflow-x-scroll smooth-scroll gap-3'>
                        {IndianStatesData.map((state, index) => (
                            <div key={index} className=''>
                                <Link to={state.stateName}>
                                    <div className='flex carding py-8 flex-col items-center hover:scale-110 transition-transform duration-300'>
                                        <img
                                            style={{ borderRadius: '50%' }}
                                            className=' w-[180px] h-[180px] md:w-[200px] md:h-[200px] object-cover border-2 shadow-xl shadow-slate-400'
                                            src={state.stateLogo}
                                            alt={state.stateName}
                                        />
                                        <p className='mt-3 text-center text-lg font-bold'>{state.stateName}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                <div className='flex flex-row gap-3 flex-wrap justify-center items-center '>
                    {IndianStatesData.map((state, index) => (
                        <>
                            {!viewMore && index < 4 ? (
                                <></>
                            ) : (
                                <>
                                    {viewMore ? (
                                        <div key={index} className='text-center w-[180px] md:w-auto'>
                                            <Link to={state.stateName}>
                                                <div className='flex py-8 flex-col items-center hover:scale-110 transition-transform duration-300'>
                                                    <img
                                                        style={{ borderRadius: '50%' }}
                                                        className={`${index === 0 || index === 7 ? "margin-top-image" : ""} w-[160px] h-[160px] md:w-[200px] md:h-[200px] object-cover border-2 shadow-xl shadow-slate-400`}
                                                        src={state.stateLogo}
                                                        alt={state.stateName}
                                                    />
                                                    <p className='mt-3 text-center text-lg font-bold'>{state.stateName}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </>
                    ))}
                </div>
            </div>

            <div>
                <div className='mb-5'>
                    <div className="pb-6 pt-6 px-4 md:px-8">
                        <h1 className='text-center text-xl md:text-3xl lg:text-4xl text-[#00544f] font-semibold'>Recommended Dishes</h1>
                    </div>
                    <Marquee>
                        <div className="flex gap-3 py-3 ml-5 mr-3 overflow-hidden" >
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
            <style jsx>
                {`
          /* CustomScrollbar.css */
          .smooth-scroll {
            overflow-x: auto; /* Change overflow-x to auto for horizontal scrolling */
            overflow-y: hidden; /* Hide vertical scrollbar */
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .smooth-scroll::-webkit-scrollbar {
            display: none;
          }

          @media screen and (max-width: 767px) {
            /* Very small devices */
            .margin-top-image {
              margin-top: 28px;
            }
          }

          @media screen and (max-width: 764px) {
            /* Very small devices */
            .carding {
              width: calc((50vw) - 20px);
            }
          }

          @media screen and (min-width: 765px) and (max-width: 766px) {
            /* Small devices (sm) */
            .carding {
              width: calc((100vw / 3) - 20px);
              margin: 10px;
            }
          }

          @media screen and (min-width: 767px) and (max-width:1023px) {
            /* Medium devices (md) */
            .carding {
              width: calc((100vw / 3) - 20px);
              /* 3 cards in a row */
            }
          }

          @media screen and (min-width: 1024px) and (max-width:1439px) {
            /* Extra-large devices (xl) */
            .carding {
              width: calc((100vw / 5) - 20px);
              /* 5 cards in a row for 1500px screens */
            }
          }

          @media screen and (min-width: 1440px) {
            /* 1500px screen */
            .carding {
              width: calc((100vw / 5) - 20px); /* 5 cards in a row */
            }
          }
        `}
            </style>
        </div>
    );
}

export default IndianStates;
