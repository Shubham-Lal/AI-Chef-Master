import React from 'react'
import GredientText from './GradientText'
import GredientTextReverse from './GradientTextReverse'
import { Typography, Button } from "@material-tailwind/react";
import RD from './RD.png'
import Technology from './Technology.png'
import Sale from './Sale.png'
import Design from './Design.png'
import Internships from './Internships.png'
import img2 from './img2.png'
import operations from './operations.png'
import { Link } from 'react-router-dom';
import { Fade } from 'react-reveal';

const data = [
  { image: operations, label: 'Operations', link: '/operations' },
  { image: RD, label: 'R & D', link: '/R&D' },
  { image: Technology, label: 'Technology', link: '/technology' },
  { image: Sale, label: 'Sales', link: '/sale-marketing' },
  { image: Design, label: 'Design', link: '/design' },
  { image: Internships, label: 'Internships', link: '/internships' },
];

const Page2 = () => {
  return (
    <>
      {/* <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200'> */}
      <div className='custom-text md:py-32 py-14 flex flex-col items-center justify-center'>
        <h1 className='font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-sans mb-4'>Life at AI Chef Master</h1>

        <div className="text-2xl sm:text-4xl md:text-5xl mb-3">
          <GredientText className="text-center"> Join our community</GredientText>
          <GredientTextReverse className="text-center">and Become a Member.</GredientTextReverse>
        </div>

        <p className='w-3/4 text-lg sm:text-xl md:text-3xl text-center mb-3'>
          "Embark on a journey with us, where your presence isn't just welcomed - it's crucial.
          Join our community and play a pivotal role in defining the very essence of who we are."
        </p>

        <Link className='text-blue-700 flex justify-center text-xl  md:text-3xl lg:text-4xl font-semibold transform transition duration-500 hover:scale-105' href="#">
          Learn More about AI Chef Master 🡪
        </Link>
      </div>

      <div className=" relative w-full overflow-hidden">
        <img
          src={img2} style={{ height: "90vh" }}
          className=" w-full opacity-80 object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/40">
          <div className="w-3/4 text-center md:w-2/3">
            <Typography
              variant="lead"
              color="white"
              className="mb-8 text-3xl sm:text-4xl md:text-5xl leading-relaxed font-medium"
            >
              Unlock your potential, be authentic, and thrive at AI Chef master"

              <br />
              <Link
                className='text-blue-700 flex justify-center text-2xl md:text-3xl lg:text-4xl font-semibold transform transition duration-500 hover:scale-105 mt-4'>
                Learn More about Technology 🡪
              </Link>
            </Typography>
          </div>
        </div>
      </div>

      <div className='custom-text h-full py-2'>
        <Fade>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center py-5'>Browse categories.</h1>
        </Fade>
        <Fade delay={300}>
          <p className='text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center py-4'>
            Take your career to the <GredientText className='ml-2 sm:ml-3'> next level</GredientText>
            Discover the perfect job for you.
          </p>
        </Fade>
        <div className='gap-4 mt-8 flex flex-wrap justify-center'>
          {data.map((item, index) => (
            <div className='transform transition-transform hover:scale-105'>
              <Fade key={index} delay={index * 100}>
                <div className="w-64 h-64 sm:w-60 sm:h-60 flex-shrink bg-[#d1e3fa] hover:shadow-lg rounded-md border-2 ">
                  <div className='p-2 flex justify-center items-center'>
                    <img className='h-20 sm:h-32 mt-1' src={item.image} alt={item.label} />
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button
                      className='relative bg-[#87CEEB] w-full h-16 text-black text-lg sm:text-2xl transition duration-300 transform hover:scale-105'
                    >
                      <Link
                        to={item.link}
                        onClick={() => window.scrollTo(0, 0)}
                        className="flex items-center justify-center h-full"
                      >
                        {item.label} 🡪
                      </Link>
                    </Button>
                  </div>
                </div>
              </Fade>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default Page2