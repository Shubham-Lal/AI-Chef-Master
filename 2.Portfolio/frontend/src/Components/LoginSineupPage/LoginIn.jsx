import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogin } from '../../hooks/useLogin';
import { toast } from 'react-hot-toast';
import google from './google.png';
import microsoft from './microsoft.png';

function LoginIn() {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const { login, isLoading } = useLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rememberMe, setRememberMe] = useState(false);
    // const [showResetModal, setShowResetModal] = useState(false);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            setEmail(rememberedEmail);
            setPassword(rememberedPassword);
            // setRememberMe(true);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userDataStr = urlParams.get('data');
        if (userDataStr) {
            const userData = JSON.parse(decodeURIComponent(userDataStr));
            localStorage.setItem('user', JSON.stringify(userData));
            dispatch({ type: 'LOGIN', payload: userData });
            toast.success("Logged in Successfully");
            navigate(window.location.pathname, { replace: true });
        }
    }, [dispatch, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Enter your email");
        else if (!password) return toast.error("Enter your password");

        await login(email, password);
    };

    const handleForgetPassword = () => {
        // setShowResetModal(true);
    };

    const handleGoogleAuth = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/login/google`;
    };
    const handleMicrosoftAuth = () => {
        window.location.href = `${process.env.REACT_APP_API_URL}/login/microsoft`;
    };

    return (
        <>
            <div className='flex md:flex-row flex-col bg-[#00544f] h-[calc(100vh-64px)]'>
                <div className=' flex flex-col gap-5 justify-center items-center py-8 md:w-2/5'>
                    <img className=" rounded-full h-[20vh]" src="/CompanyLogo.png" alt="Logo" />
                    <h1 className="text-yellow-300 text-xl sm:text-xl md:text-2xl lg:text-3xl  font-medium">Welcome Back</h1>
                    <h1 className="text-yellow-300 text-center text-xl sm:text-xl md:text-2xl lg:text-3xl font-medium">SIGN IN TO AI CHEF MASTER</h1>
                    <h1 className="text-white text-center text-xl sm:text-xl md:text-2xl lg:text-3xl ">Where Taste Meets Technology - Experience AI Chef Master</h1>
                </div>
                <div className='bg-[#f7f3cd] flex flex-col justify-center lg:px-28 p-12  sm:px-12 md:px-16  md:w-3/5 border-black md:rounded-l-3xl'>
                    <h1 className="text-4xl font-medium flex justify-center items-center mb-8">Login Account</h1>
                    <form onSubmit={handleSubmit} className="my-5 flex flex-col  gap-y-7">
                        <div className=" text-sm flex ">
                            <input
                                type="text"
                                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full placeholder-black rounded-lg"
                                value={email}
                                // required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="text-sm ">
                            <input
                                type="password"
                                className="p-3 bg-[#f7f3cd] border border-black focus:outline-none w-full placeholder-black rounded-lg"
                                value={password}
                                // required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                style={{ transform: 'scale(1.5)', marginRight: '5px' }}
                                // onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className="text-sm text-gray-700">Remember me</span>
                            <button
                                type="button"
                                className="ml-2 text-sm text-emerald-800 underline"
                                onClick={handleForgetPassword}
                            >
                                Forget Password
                            </button>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className={`${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-[#00544f]"} p-3 my-3 w-full  md:max-w-sm text-white text-2xl rounded-lg hover:scale-110 sm:text-lg sm:w-2/3  lg:w-3/4`}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    <p className='text-3xl font-medium  text-center'>or</p>

                    <div className='flex justify-center'>
                        <p className='mb-5'> Create New Account <Link className="text-emerald-800 font-medium" to="/signup">Signup</Link></p>
                    </div>
                    <div className='flex flex-wrap gap-3 justify-center'>
                        <div
                            className='border gap-2 p-2 rounded-lg border-black flex justify-start items-center  hover:scale-110'
                            onClick={handleGoogleAuth}
                        >
                            <img src={google} alt="Google" />
                            <button className='font-medium'>Continue With Google</button>
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
    );
}

export default LoginIn;
