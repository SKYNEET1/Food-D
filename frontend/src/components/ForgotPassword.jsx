import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState(3);
    const [email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const primaryColor = "#ff4d2d";
    const navigate = useNavigate();


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
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
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
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
                        >
                            Verify
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div>

                        {/* confirm password */}

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
                                type="confirm password"
                                className='w-full border rounded border-gray-200-lg px-3 py-2 focus:outline-none'
                                placeholder=' password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>

                        <button
                            style={{
                                backgroundColor: primaryColor,
                            }}
                            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
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