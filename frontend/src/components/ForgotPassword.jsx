import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../App';
import { ClipLoader } from 'react-spinners';


const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const primaryColor = "#ff4d2d";
    const navigate = useNavigate();

    const handleSendOTP = async (userEmail) => {
        setLoading(true);
        try {

            const result = await axios.post(
                `${serverURL}/api/auth/forgotpassword`,
                { email: userEmail },
                { withCredentials: true, }
            )
            console.log(result);
            setStep(2);
            setError("");
            setLoading(false);

        } catch (error) {

            console.log(error);
            setError(error.response?.data?.message)
            setLoading(false);

        }

    }

    const verifyOTP = async (otp, userMail) => {
        setLoading(true);
        try {

            const result = await axios.post(
                `${serverURL}/api/auth/verifyOTP`,
                { otp, email: userMail },
                { withCredentials: true, }
            )
            console.log(result);
            setStep(3);
            setError("");
            setLoading(false);

        } catch (error) {

            console.log(error);
            setError(error.response?.data?.message);
            setLoading(false);

        }
    }

    const setNewPassword = async (password, newPassword) => {
        setLoading(true);

        try {

            if (password !== newPassword) {
                alert('');
                return null;
            }
            const result = await axios.post(
                `${serverURL}/api/auth/newpassword`,
                { password },
                { withCredentials: true, }
            )
            console.log(result);
            setError("");
            navigate("/signin");
            setLoading(false);


        } catch (error) {

            console.log(error);
            setError(error.response?.data?.message);
            setLoading(false);


        }

    }

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>

            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>

                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
                    <h2 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h2>
                </div>

                {step === 1 && (
                    <div>

                        {/* email */}

                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>
                                Email
                            </label>
                            <input
                                id='email'
                                type="email"
                                className='w-full border rounded border-gray-200-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter your email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => handleSendOTP(email)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            {loading ? <ClipLoader size={20} color='white'/> : "Send OTP"}

                        </button>
                        {error && <p className='text-red-500 text-center'>{`* ${error}`}</p>}
                    </div>
                )}

                {step === 2 && (
                    <div>

                        {/* otp */}

                        <div className='mb-4'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>
                                OTP
                            </label>
                            <input
                                id='otp'
                                type="otp"
                                className='w-full border rounded border-gray-200-lg px-3 py-2 focus:outline-none'
                                placeholder='Enter OTP'
                                onChange={(e) => setOTP(e.target.value)}
                                value={OTP}
                                required
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => verifyOTP(OTP, email)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Verify"}

                        </button>
                        {error && <p className='text-red-500 text-center'>{`* ${error}`}</p>}
                    </div>
                )}

                {step === 3 && (
                    <div>

                        {/* set new password */}

                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
                                Password
                            </label>
                            <input
                                id='password'
                                type="password"
                                className='w-full border rounded border-gray-200-lg px-3 py-2 focus:outline-none'
                                placeholder='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="confirm password" className='block text-gray-700 font-medium mb-1'>
                                Confirm Password
                            </label>
                            <input
                                id='confirm password'
                                type="password"
                                className='w-full border rounded border-gray-200-lg px-3 py-2 focus:outline-none'
                                placeholder='password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => setNewPassword(password, confirmPassword)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Reset"}

                        </button>
                        {error && <p className='text-red-500 text-center'>{`* ${error}`}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword;