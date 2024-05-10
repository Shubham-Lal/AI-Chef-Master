export const ChefCard1 = ({ heading, description, video }) => {
    return (
      <div className="w-screen flex flex-col  text-center">
        <div className="flex flex-col max-w-5/6">
          <video
            autoPlay
            loop
            muted
            className=" w-full h-80 mr-20"
            style={{
              objectFit: "cover",
              filter: "brightness(0.9)", // Adjust the brightness value as needed
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
  
        <div className="flex flex-col justify-center items-center ">
          <h2 className="  text-center flex flex-row text-black font-bold text-3xl">
            {heading}
          </h2>
          <p className=" z-10 max-w-screen p-4 flex flex-col  text-black  text-justify">
            {description}
          </p>
        </div>
      </div>
    );
  };
  