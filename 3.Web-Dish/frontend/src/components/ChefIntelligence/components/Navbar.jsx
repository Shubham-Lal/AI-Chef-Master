import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { darkColors, lightColors } from "../data/navbarTheme";
import { Disclosure } from "@headlessui/react";
import { MdMenu, MdArrowDropDown, MdAccountCircle } from "react-icons/md";
import { FiSun, FiMoon, FiLogIn } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";

const Navbar = ({ lightMode, setLightMode, sideBarOpen, setSideBarOpen }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [profileOpen, setProfileOpen] = useState(false);
  const [voiceAssistantOpen, setVoiceAssistantOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);


  const toggleVoiceAssistant = () => {
    setVoiceAssistantOpen(!voiceAssistantOpen);
  };


  const indianLanguages = ["Hindi", "Bengali", "Telugu", "Marathi", "Tamil"];

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const colors = lightMode ? lightColors : darkColors;

  return (
    <Disclosure
      as="nav"
      className={`${colors.text} bg-[#00544f] sticky top-0 z-50`}
    >
      {({ open }) => (
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-auto flex items-center justify-between md:gap-1 lg:gap-3">
            <div className="flex items-center">
              <div
                className="text-white font-extrabold p-2 cursor-pointer"
                onClick={() => setSideBarOpen(!sideBarOpen)}
              >
                {sideBarOpen ? (
                  <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <MdMenu className="h-6 w-6" aria-hidden="true" />
                )}
              </div>
              <div className="flex items-center">
                <img
                  className="h-14 rounded-lg w-auto navbar-logo"
                  src="/assets/CompanyLogo.png"
                  alt="LOGO"
                />
                <Link
                  className="text-lg font-bold md:text-sm lg:text-lg"
                  to="/"
                >
                  AI CHEF MASTER
                </Link>
              </div>
            </div>

            <div className="md:hidden justify-end items-center align-middle">
              <Disclosure.Button className="text-white font-extrabold p-2">
                {open ? (
                  <HiOutlineX className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <div className="h-5 w-1 mr-1 rounded-full flex flex-col justify-between">
                    <span className="h-1 bg-gray-100"></span>
                    <span className="h-1 bg-gray-100"></span>
                    <span className="h-1 bg-gray-100"></span>
                  </div>
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel
            className={`md:hidden flex flex-col gap-4 mt-2 w-full text-white font-semibold ${colors.background} ${colors.text}`}
          >
            {user && (
              <div className="flex flex-row items-center justify-center">
                <MdAccountCircle
                  className={`text-3xl flex flex-row  justify-center text-center align-center items-center ${colors.hoverText}`}
                />

                <div className="py-1 ml-2 text-lg text-center inline-block">
                  {user.email}
                </div>
              </div>
            )}

            <div className="pt-1 flex flex-col text-lg ml-2 ">
              <p className="text-2xl ">Account</p>
            </div>

            <div className="flex flex-col ml-6">
              <div className="p-2 flex flex-col text-lg border-b border-green-900">
                <Link to="/upgrade-premium" className="text-sm text-gray-200">
                  Subscription
                </Link>
              </div>
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                <Link
                  to="/chef-intelligence/achives"
                  className="text-sm text-gray-200"
                >
                  Archives
                </Link>
              </div>
            </div>
            <div className="pt-1 flex flex-col text-lg ml-2 ">
              <p className="text-2xl ">Custom</p>
            </div>
            <div
              className="p-2 ml-6 flex flex-row text-lg  border-b border-green-900"
              onClick={toggleVoiceAssistant}
            >
              <p className="text-sm text-gray-200">Custom Instructions</p>
              <svg
                className={`ml-auto h-5 w-5  justify-center flex align-center transform-${voiceAssistantOpen ? "rotate-180" : ""
                  }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {voiceAssistantOpen && (
              <div className="p-2 flex flex-col  border-b border-green-900">
                <p className="text-sm text-gray-200 ml-6 text-center">
                  Mode Of Communication
                </p>

                {/* Sound Option */}
                <div className="flex items-center mt-2 w-full text-center flex-col">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="50"
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(Number(e.target.value))}
                    className="mr-2 w-2/3"
                  />

                  <label htmlFor="soundOption" className="text-sm">
                    {selectedValue === 0
                      ? "Chat"
                      : selectedValue === 50
                        ? "Voice"
                        : "Chat and Voice"}
                  </label>
                </div>
              </div>
            )}

            {/* Settings Section */}
            <div className="pt-0 flex flex-col text-lg  ml-2">
              <p className="text-2xl">Settings</p>
            </div>

            <div className="flex flex-col ml-6 text-lg">
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                <a
                  href="https://www.aichefmaster.com"
                  className="text-sm text-gray-200"
                >
                  Home
                </a>
              </div>

              {/* Theme Section */}
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                <button
                  onClick={() => setLightMode(!lightMode)}
                  className=" flex items-center flex-row text-sm text-gray-200"
                >
                  {lightMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                <div className="flex items-center  gap-1 md:ml-0">
                  <div
                    className="flex  md:ml-0 text-sm text-gray-200"
                    onClick={() =>
                      setSelectedLanguage((prev) =>
                        prev === "Hindi" ? "Bengali" : "Hindi"
                      )
                    }
                  >
                    {selectedLanguage}
                    <MdArrowDropDown size={23} />
                  </div>
                </div>
                <div className="invisible absolute z-50 flex flex-col mt-2 py-1 px-4 text-white shadow-xl group-hover:visible">
                  {indianLanguages.map((language) => (
                    <div
                      key={language}
                      className="flex text-white pt-1 bg-green-900 items-center gap-2 cursor-pointer text-center "
                      onClick={() => selectLanguage(language)}
                    >
                      <span className="px-2 py-1">{language}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                <a
                  href="mailto:?to=info@aichefmaster.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-200"
                >
                  Help Center
                </a>
              </div>
              <div className="p-2 flex flex-col text-lg  border-b border-green-900">
                {user ? (
                  <button
                    onClick={logout}
                    className="text-sm text-start text-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="text-sm text-gray-200">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </Disclosure.Panel>

          <div className="hidden md:flex justify-center items-center gap-8">
            <Link
              to="/"
              className={`p-2 ${colors.hoverBackground} hover:rounded flex-row flex`}
            >
              Home
            </Link>
            <div className="group cursor-pointer py-2 text-base md:text-md">
              <div className="flex items-center gap-4">
                <div
                  className="flex"
                  onClick={() =>
                    setSelectedLanguage((prev) =>
                      prev === "Hindi" ? "Bengali" : "Hindi"
                    )
                  }
                >
                  {selectedLanguage}
                  <MdArrowDropDown size={23} />
                </div>
              </div>
              <div className="invisible absolute z-50 flex mx-auto flex-col mt-2 py-1 px-4 text-white shadow-xl group-hover:visible bg-[#022a28]">
                {indianLanguages.map((language) => (
                  <div
                    key={language}
                    className="flex  text-white pt-1 items-center gap-2 cursor-pointer"
                    onClick={() => selectLanguage(language)}
                  >
                    <span className="hover:bg-[#022a28] p-1 hover:rounded">
                      {language}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`p-2 ${colors.hoverBackground} hover:rounded flex flex-row`}
              onClick={() => setLightMode(!lightMode)}
            >
              {lightMode ? (
                <FiSun className="mr-2 mt-1" />
              ) : (
                <FiMoon className="mr-2 mt-1" />
              )}
              {lightMode ? "Light Mode" : "Dark Mode"}
            </button>

            {user ? (
              <div className={`group cursor-pointer`}>
                <MdAccountCircle
                  className={`text-4xl mr-4 ${colors.hoverText}`}
                  onClick={() => setProfileOpen(!profileOpen)}
                />
                {profileOpen && (
                  <div
                    className={`absolute top-4 right-4 flex-col mt-[56px] w-64  ${colors.textdialog} shadow-md rounded-md p-4 text-sm z-10 flex ${colors.dialogbg} `}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <MdAccountCircle
                        className={`text-5xl flex flex-row justify-center text-center  align-center items-center ${colors.hoverText}`}
                      />
                    </div>

                    {user && (
                      <div className="py-1  border-b text-center">
                        {user.email}
                      </div>
                    )}

                    {/* <div className="py-2">My Account</div> */}

                    <div className="p-2 flex flex-col text-center hover:bg-green-600 border-b border-green-900">
                      <a
                        href="mailto:?to=info@aichefmaster.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-center"
                      >
                        Help Center
                      </a>
                    </div>
                    <div className="p-2 flex flex-col text-center hover:bg-green-600 border-b border-green-900">
                      <Link
                        to="/chef-intelligence/archives"
                        className="text-lg text-center"
                      >
                        Archives
                      </Link>
                    </div>
                    <div className="p-2 flex flex-col text-center hover:bg-green-600 border-b border-green-900">
                      <Link
                        to="/upgrade-premium"
                        className="text-lg text-center"
                      >
                        Subscription
                      </Link>
                    </div>
                    <div
                      className="p-2 flex flex-row text-center hover:bg-green-600 border-b border-green-900"
                      onClick={toggleVoiceAssistant}
                    >
                      <p className="text-lg text-center">Custom Instructions</p>
                      <svg
                        className={`ml-auto h-5 w-5 mt-2 justify-center flex align-center ${voiceAssistantOpen ? "rotate-180" : ""
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Voice Assistance */}
                    {voiceAssistantOpen && (
                      <div className="p-2 flex flex-col text-center hover:bg-green-600 border-b border-green-900">
                        <p className="text-base text-center">
                          Mode Of Communication
                        </p>

                        {/* Sound Option */}
                        <div className="flex items-center mt-2 w-full text-center flex-col">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="50"
                            value={selectedValue}
                            onChange={(e) =>
                              setSelectedValue(Number(e.target.value))
                            }
                            className="mr-2 w-full"
                          />

                          <label htmlFor="soundOption" className="text-sm">
                            {selectedValue === 0
                              ? "Chat"
                              : selectedValue === 50
                                ? "Voice"
                                : "Chat and Voice"}
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="pt-2 flex items-center justify-center">
                      <button
                        onClick={logout}
                        className={`mt-2 p-2 ${colors.hoverBackground} ${colors.background} text-white rounded`}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className={`p-2 ${colors.hoverBackground} hover:rounded flex-row flex`}
              >
                <FiLogIn className="mr-1 mt-1" />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Navbar;
