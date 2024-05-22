import { useState } from "react"
import toast from "react-hot-toast"

export const useSignup = () => {
    const [pwError, setPwError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [sentOTP, setSentOTP] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const signup = async (email, first_name, last_name, password, password_repeat, navigate) => {
        if (password !== password_repeat) return toast.error("Password doesn't match!");

        setIsLoading(true);
        setPwError(null)
        setEmailError(null)

        const data = {
            'email': email,
            'first_name': first_name,
            'last_name': last_name,
            'password': password
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chef/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            // setPwError(json.non_field_errors)
            // setEmailError(json.email)
            toast.error(json.message || "Something went wrong. Try again later!")
        }

        if (response.ok) {
            setIsLoading(false);
            toast.success("OTP sent to your mail.");
            setSentOTP(true);
        }
    }

    const verifyOTP = async (email, otp, navigate) => {
        if (!otp) return toast.error("Enter OTP to proceed!");

        setVerifying(true);

        const data = {
            'email': email,
            'otp': otp
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chef/verify_otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const json = await response.json()

        if (!response.ok) {
            toast.error(json.message);
        }

        if (response.ok) {
            toast.success("Account created successfully");
            navigate('/login');
        }

        setVerifying(false);
    }

    return { signup, isLoading, sentOTP, verifyOTP, verifying, pwError, emailError }
}