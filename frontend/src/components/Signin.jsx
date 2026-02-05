import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { serverURL } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';


const Signin = () => {
  const primaryColor = "#ff4d2d";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSignin = async () => {
    setLoading(true);
    try {

      const result = await axios.post(`${serverURL}/api/auth/signin`, {
        email,
        password,
        phoneNo,
      }, { withCredentials: true, });
      console.log('Signin result >>>',result);
      dispatch(setUserData(result.data.data));
      setError("");
      setLoading(false);

    } catch (error) {

      setLoading(false);

    }
  }

  const handelGoogleAuth = async () => {
    setLoading(true);
    try {

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const {data} = await axios.post(`${serverURL}/api/auth/googleSignin`, {
        token
      }, { withCredentials: true, });
      dispatch(setUserData(data.data));
      console.log('googleAuth signin >>>',data.data)
      setError("");
      setLoading(false);

    } catch (error) {

      console.log('googleAuth error : ', error);
      setError(error.response?.data?.message);
      setLoading(false);

    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>

      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`}
        style={{ border: `1px solid ${borderColor}` }}>

        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Buddy Bites
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
            type="number"
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

        {/* forgot password */}

        <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer hover:underline' onClick={() => navigate('/forgot-password')}>
          Forgot Password
        </div>

        {/* sign in button */}

        <div className="space-y-3">
          <button
            onClick={handleSignin}
            style={{
              backgroundColor: primaryColor,
            }}
            className="w-full font-semibold py-2 rounded-lg text-white transition duration-200 hover:opacity-90"
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
          </button>

          {error && <p className='text-red-500 text-center'>{`* ${error}`}</p>}

          <button onClick={handelGoogleAuth} className="w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100">
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

export default Signin;