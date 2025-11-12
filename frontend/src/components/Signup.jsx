import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { serverURL } from '../App';
const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [category, setCategory] = useState("consumer");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      console.log(userName, email, password, phoneNo, category)
      const result = await axios.post(`${serverURL}/api/auth/signup`, {
        userName,
        email,
        password,
        phoneNo,
        category,
        confirmPassword
      }, { withCredentials: true, });
      console.log(result)
    } catch (error) {
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.join("\n"));
      } else {
        alert("Signup failed: " + error.message);
      }
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>

      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          SkyFood
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* userName */}

        <div className='mb-4'>
          <label htmlFor="userName" className='block text-gray-700 font-medium mb-1'>
            Full Name
          </label>
          <input
            id='userName'
            type="text"
            className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your Full Name'
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
          />
        </div>

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

        {/* Confirm password */}

        <div className='mb-4'>
          <label htmlFor="confirm password" className='block text-gray-700 font-medium mb-1'>
            Confirm Password
          </label>
          <div className='relative'>
            <input
              id='confirm password'
              type={showConfirmPassword ? "text" : "password"}
              className='w-full border rounded-lg px-3 py-2 focus:outline-none'
              placeholder='Confirm Password'
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button className='absolute right-3 top-2.5 text-gray-500 cursor-pointer ' onClick={() => setshowConfirmPassword(prev => !prev)}>{!showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</button>
          </div>
        </div>

        {/* category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>

          <div className="flex flex-wrap justify-center gap-3 bg-gray-50 rounded-lg w-full p-3">
            {["consumer", "restaurant", "deliveryagent", "admin"].map((role, index) => (
              <button
                key={index}
                onClick={() => setCategory(role)}
                className={`flex-1 min-w-[45%] sm:min-w-[22%] wrap-break-word text-sm border rounded-md px-1 py-1 text-center font-small capitalize transition-all duration-200 cursor-pointer
          ${category === role
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-orange-500 hover:text-white"
                  }`}
              >
                {role === "deliveryagent" ? "Delivery Agent" : role}
              </button>
            ))}
          </div>
        </div>


        {/* sign up button */}
        <div className="space-y-3">
          <button
            onClick={handleSignup}
            style={{
              backgroundColor: primaryColor,
            }}
            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
          >
            Sign Up
          </button>

          <button className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>
        </div>

        <p className="text-center mt-3 text-gray-700">
          Already have an account?{" "}
          <span
            style={{ color: primaryColor }}
            className="font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup