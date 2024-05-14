import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSignup } from "../../hooks/useSignup";
import { countryPhoneCodes } from "../../Data/CountryCodeData";
import google from './google.png'
import microsoft from './microsoft.png'

function CreateAccount() {
  const navigate = useNavigate();
  const { signup, isLoading } = useSignup();

  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fname) return toast.error("Enter your first name");
    else if (!lname) return toast.error("Enter your last name");
    else if (!countryCode) return toast.error("Select your country code");
    else if (!phoneNumber) return toast.error("Enter your phone number");
    else if (!email) return toast.error("Enter your email address");
    else if (!password) return toast.error("Enter your password");
    else if (!confirmPassword) return toast.error("Confirm you password");

    if (password !== confirmPassword) return toast.error("Password doesn't match");

    await signup(fname, lname, countryCode, phoneNumber, email, password, navigate);
  }

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
  };
  const handleMicrosoftAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/login/microsoft`;
  };

  return (
    <>
      <div className='flex md:flex-row flex-col bg-[#00544f] h-[calc(100vh-64px)]'>
        <div className=' flex flex-col gap-4 justify-center py-8   items-center mx-auto md:w-2/5'>
          <img className='rounded-full h-[20vh]' src="/CompanyLogo.png" alt="Logo" />
          <h1 className='text-yellow-300  text-xl sm:text-xl md:text-2xl lg:text-3xl  font-medium'>Welcome To AI Chef Master</h1>
          <h1 className='text-white text-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium'>Where Taste Meets Technology - Experience AI Chef Master</h1>
        </div>
        <div className='bg-[#f7f3cd] flex flex-col justify-center lg:px-28 p-12 md:py-8 sm:px-12 md:px-16 md:w-3/5 border-black md:rounded-l-3xl'>
          <h1 className='text-4xl font-medium flex justify-center items-center mb-8'>Create Your Account</h1>
          <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-y-6">
            <div className="text-sm flex flex-col sm:flex-row gap-5 md:flex-row ">
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full sm:w-1/2 md:w-1/2 lg:w-1/2 placeholder-black rounded-lg"
                value={fname}
                // required
                onChange={(e) => setfName(e.target.value)}
                placeholder='First Name'
              />
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full sm:w-1/2 md:w-1/2 lg:w-1/2 placeholder-black rounded-lg "
                value={lname}
                // required
                onChange={(e) => setlName(e.target.value)}
                placeholder='Last Name'
              />
            </div>
            <div className="text-sm flex flex-col sm:flex-row md:flex-row gap-5">
              <select
                className="p-3 bg-[#f7f3cd] border rounded-lg border-black focus:outline-none sm:w-1/2 md:w-2/4"
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
              >
                <option value="">Select</option>
                {Object.keys(countryPhoneCodes).map((country, index) => (
                  <option key={index} value={countryPhoneCodes[country]}>
                    {countryPhoneCodes[country]} ({country})
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full placeholder-black rounded-lg"
                value={phoneNumber}
                // required
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder='Phone Number'
              />
            </div>
            <div className="text-sm ">
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full placeholder-black rounded-lg"
                value={email}
                // required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address'
              />
            </div>
            <div className="text-sm flex flex-col sm:flex-row md:flex-row gap-5">
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full sm:w-1/2 lg:w-1/2 placeholder-black rounded-lg"
                value={password}
                // required
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
              <input
                type="text"
                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full sm:w-1/2 lg:w-1/2 placeholder-black rounded-lg"
                value={confirmPassword}
                // required
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className={`${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#00544f]"} p-3 my-3 w-full  md:max-w-sm text-white text-2xl rounded-lg hover:scale-110 sm:text-lg sm:w-2/3  lg:w-3/4`}
              >
                Create Your Account
              </button>
            </div>
          </form>

          <div className='flex justify-center'>
            <p>Already have an account? <Link className="text-emerald-800 font-medium" to="/login">Login</Link></p>
          </div>

          <p className='text-3xl font-medium  text-center md:my-2 text-gray-700'>or</p>

          <div className='flex flex-wrap gap-3 justify-center'>
            <div
              className='border gap-2 p-2 rounded-lg border-black flex justify-start items-center  hover:scale-110'
              onClick={handleGoogleAuth}
            >
              <img src={google} alt="Google" />
              <button className='font-medium '>Continue With Google</button>
            </div>
            <div
              className='gap-2 border p-2 rounded-lg border-black flex justify-start items-center   hover:scale-110'
              onClick={handleMicrosoftAuth}
            >
              <img src={microsoft} alt="Microsoft" />
              <button className='font-medium '>Continue With Microsoft</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAccount
