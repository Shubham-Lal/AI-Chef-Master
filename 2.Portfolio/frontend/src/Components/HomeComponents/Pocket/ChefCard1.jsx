import { useEffect, useState } from "react";

export const ChefCard1 = ({ heading, description, video }) => {
  const [themeClass, setThemeClass] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log(themeClass);
    const computedThemeClass =
      theme === "dark" ? "text-white bg-gray-950 " : "text-black bg-white";
    setThemeClass(computedThemeClass);
  }, []);

  return (
    <div
      className={`max-w-6xl md:mt-12 flex flex-col mx-auto justify-center items-center rounded ${themeClass}`}
    >
      <div className="flex justify-center flex-col mx-auto items-center shadow-gray-500 rounded shadow-xl">
        <div className="flex flex-col items-center w-full">
          <video
            autoPlay
            loop
            muted
            className="w-full md:h-80 h-60 "
            style={{
              objectFit: "cover",
              filter: "brightness(0.9)", // Adjust the brightness value as needed
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <div className="flex flex-col justify-center items-center  ">
          <h2 className="my-4 text-center flex flex-row font-bold text-3xl">
            {heading}
          </h2>
          <p
            className={`z-10 max-w-screen p-4 flex text-xl flex-col text-justify shadow-lg shadow-gray-900  shadow-sm${themeClass}`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
