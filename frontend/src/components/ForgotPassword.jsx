import axios from 'axios';
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../App';


const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const primaryColor = "#ff4d2d";
    const navigate = useNavigate();

    const handleSendOTP = async (userEmail) => {
        try {

            const result = await axios.post(
                `${serverURL}/api/auth/forgotpassword`,
                { email: userEmail },
                { withCredentials: true, }
            )
            console.log(result);
            setStep(2);

        } catch (error) {

            console.log(error);

        }

    }

    const verifyOTP = async (otp, userMail) => {
        try {

            const result = await axios.post(
                `${serverURL}/api/auth/verifyOTP`,
                { otp,email: userMail },
                { withCredentials: true, }
            )
            console.log(result);
            setStep(3);

        } catch (error) {

            console.log(error);

        }
    }

    const setNewPassword = async (password, newPassword) => {
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
            navigate("/signin");

        } catch (error) {

            console.log(error);

        }

    }

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>

            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>

                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
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
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => handleSendOTP(email)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            Send OTP
                        </button>
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
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => verifyOTP(OTP, email)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            Verify
                        </button>
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
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            onClick={() => setNewPassword(password, confirmPassword)}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
                        >
                            Reset
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword