import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { serverURL } from '../App';

const Signin = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log(email, password, phoneNo)
      const result = await axios.post(`${serverURL}/api/auth/signin`, {
        email,
        password,
        phoneNo,
      }, { withCredentials: true, });
      console.log(result)
    } catch (error) {
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.join("\n"));
      } else {
        alert("Signin failed: " + error.message);
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>

      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{ border: `1px solid ${borderColor}` }}>

        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          SkyFood
        </h1>
        <p className="text-gray-600 mb-8">
          Login to your account to get started with delicious food deliveries
        </p>

        {/* email */}

        <div className='mb-4'>
          <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>
            Email
          </label>
          <input
            id='email'
            type="email"
            className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your email'
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* mobile */}

        <div className='mb-4'>
          <label htmlFor="phoneNo" className='block text-gray-700 font-medium mb-1'>
            Mobile
          </label>
          <input
            id='phoneNo'
            type="number"
            className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your mobile number'
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setPhoneNo(e.target.value)}
            value={phoneNo}
          />
        </div>

        {/* password */}

        <div className='mb-4'>
          <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? "text" : "password"}
              className='w-full border rounded-lg px-3 py-2 focus:outline-none'
              placeholder='Enter your password'
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className='absolute right-3 top-2.5 text-gray-500 cursor-pointer ' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaEye /> : <FaEyeSlash />}</button>
          </div>
        </div>

        {/* forgot password */}

        <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer hover:underline' onClick={() => navigate('/forgot-password')}>
          Forgot Password
        </div>

        {/* sign in button */}

        <div className="space-y-3">
          <button
            onClick={handleSignup}
            style={{
              backgroundColor: primaryColor,
            }}
            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
          >
            Sign in
          </button>

          <button className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Sign in with Google</span>
          </button>
        </div>
        <p className="text-center mt-3 text-gray-700">
          Don't have an account?{" "}
          <span
            style={{ color: primaryColor }}
            className="font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            SignUp Here
          </span>
        </p>
      </div>

    </div>
  );
}

export default Signin