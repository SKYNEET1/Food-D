import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { serverURL } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const Signup = () => {
  const primaryColor = "#ff4d2d";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {

      console.log(userName, email, password, phoneNo, category, confirmPassword);
      const result = await axios.post(`${serverURL}/api/auth/signup`, {
        userName,
        email,
        password,
        phoneNo,
        category,
        confirmPassword
      }, { withCredentials: true, });
      dispatch(setUserData(result.data.data));
      setError("");
      setLoading(false);
    } catch (error) {

      console.log("Signup failed : " + error.message);
      setError(error.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  }

  const handelGoogleAuth = async () => {
    try {

      if (!phoneNo || !category) {
        return setError("Mobile No and Category is required");

      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const { data } = await axios.post(`${serverURL}/api/auth/googleAuth`, {
        token,
        phoneNo,
        category,
      }, { withCredentials: true, });
      dispatch(setUserData(data));
      setError("")
    } catch (error) {

      console.log('googleAuth error  ', error.message, error);
      setError(error.response?.data?.message || error.message);
      setLoading(false);

    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>

      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h2 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Buddy Bites
        </h2>
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
            required
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
            required
          />
        </div>

        {/* mobile */}

        <div className='mb-4'>
          <label htmlFor="tel" className='block text-gray-700 font-medium mb-1'>
            Mobile
          </label>
          <input
            id='phoneNo'
            type="numeric"
            className='w-full border rounded-lg px-3 py-2 focus:outline-none'
            placeholder='Enter your mobile number'
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setPhoneNo(e.target.value)}
            value={phoneNo}
            required
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
              required
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
              required
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
            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90 cursor-pointer"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
          </button>

          <button onClick={handelGoogleAuth} className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>
          {error ? <p className='text-red-500 text-center'>{`* ${error}`}</p> : (!phoneNo || !category) && (
            <p className="text-xs text-gray-500 text-center">
              To continue with Google, please enter your phone number and choose a category !
            </p>)}
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

export default Signup;