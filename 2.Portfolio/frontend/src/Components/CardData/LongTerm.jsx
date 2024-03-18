import React from 'react';
import { Fade, Slide } from "react-reveal";
import { v4 as uuidv4 } from "uuid";

import i1 from './i1.jpg';
import i2 from './i2.jpg';
import i3 from './i3.jpg';
import i4 from './i4.jpg';
const AnimatedCard = ({ imageUrl, imageAlt, heading, description, index }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} justify-center items-center w-full gap-8 md:gap-12 mx-auto my-12 px-4 sm:px-6 lg:px-8`}
    >
      <Fade right={index % 2 === 0} left={index % 2 !== 0}>
        <img
          src={imageUrl}
          className="w-full h-64 md:h-96 md:w-1/2 rounded-lg shadow-lg"
          alt={imageAlt}
        />
      </Fade>
      <div className="flex flex-col justify-center gap-6 md:gap-12 md:pt-0 items-center max-w-md md:max-w-[400px]">
        <Slide left={index % 2 === 0} right={index % 2 !== 0}>
          <h3 className="text-xl sm:text-lg md:text-2xl lg:text-3xl font-bold text-center md:text-left">
            {heading}
          </h3>
        </Slide>
        <Slide left={index % 2 === 0} right={index % 2 !== 0}>
          <div>
            <p className="text-lg sm:text-lg mb-3 box-border leading-6 md:text-xl text-center md:text-left  ">
             {description}  
             </p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

const sectionData = [
  {
    heading: 'STRATEGIC VISION:',
    description: 'We are committed to pushing culinary boundaries and expanding our influence in the market. With a focus on user-centric experiences and foresight into the future, our growth-oriented vision is a testament to our strategic goals and ambitions.',
    imageUrl: i1,
  },
  {
    heading: 'B2B COLLABORATIONS:',
    description: 'Long Term Growth is synonymous with forging strong B2B collaborations, creating synergies with restaurants and culinary establishments. By providing a comprehensive suite of services, including order management, inventory control, analytics, invoicing, and menu designing, we empower our partners to streamline their operations and enhance overall efficiency.',
    imageUrl: i2,
  },
  {
    heading: 'INNOVATION THROUGH DIVERSITY:',
    description: 'Diversification is the key to sustained success. By expanding our dish offerings, exploring new culinary frontiers, and staying attuned to emerging market trends, we ensure that our users always have exciting, relevant, and diverse options at their fingertips.',
    imageUrl: i3,
  },
  {
    heading: 'LEADER IN CULINARY TECH:',
    description: 'Long Term Growth solidifies our position as a trailblazer in the culinary tech industry. By combining advanced technology with a deep understanding of user preferences and industry dynamics, we pave the way for sustained innovation, unparalleled user experiences, and lasting success.',
    imageUrl: i4,
  },
];

const LongTerm = () => {
  return (
    <>
      <div className='min-h-screen md:pb-16'>
      <div style={{ backgroundColor: 'rgba(0, 84, 79, 0.5)' }} className='flex justify-center items-center h-32 text-black'>
        <h1 style={{textShadow: '2px 0.5px 0.5px rgba(0, 0, 0, 0.5)'}} className='bg-green-500 text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-serif py-4 px-6 md:px-8 lg:px-10 xl:px-12 text-center md:text-left'>
          Long Term Growth - Elevating Culinary Experiences, Expanding Horizons
        </h1>
      </div>

        <p className='text-2xl font-medium py-12 px-6 md:px-12 text-center md:text-left'>We are committed to pushing culinary boundaries and expanding our influence in the market. With a focus on user-centric experiences and foresight into the future, our growth-oriented vision is a testament to our strategic goals and ambitions.</p>

      <div className="mt-6">
        {sectionData.map((obj, index) => (
          <AnimatedCard key={uuidv4()} index={index} {...obj} />
         ))}
      </div>

        <p className='text-2xl py-12 px-6 md:px-24 text-center md:text-left'>As we embark on this journey, the Long Term Growth encapsulates our dedication to creating a lasting impact, not just in the kitchens of individuals but across the entire culinary landscape. It is more than a strategy; it's a commitment to excellence, evolution, and enduring success.</p>
      </div>
    </>
  );
};

export default LongTerm;