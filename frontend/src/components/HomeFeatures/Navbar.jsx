import React, { useState } from 'react';
import { FaLocationDot, FaPlus } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import { IoCartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { serverURL } from '../../App';
import { setUserData } from '../../redux/userSlice';
import axios from 'axios';
import { TbReceipt2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const { userData, currentCity } = useSelector(store => store.user);
    const { myShopData } = useSelector(store => store.owner);
    console.log('navbar', userData);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            await axios.post(
                `${serverURL}/api/auth/signout`,
                {},
                { withCredentials: true }
            );

            dispatch(setUserData(null));

        } catch (error) {

            console.log(error);

        }
    }
    return (
        <div className='w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 fixed top-0 z-9999 bg-[#fff9f6] 
overflow-visible'>

            {showSearch && userData.category === "consumer" && <div className='w-[90%] h-17.5 md:hidden fixed flex bg-white shadow-xl rounded-lg items-center gap-5 top-20 left-[5%]'>

                <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                    <FaLocationDot className='w-6.25 h-6.25 text-[#ff4d2d] ' />
                    <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
                </div>

                <div className='w-[80%] flex items-center gap-2.5'>
                    <IoIosSearch size={25} className='text-[#ff4d2d]' />
                    <input
                        type="text"
                        placeholder='search delicious food...'
                        className='px-2.5 text-gray-700 outline-0 w-full'
                    />
                </div>

            </div>}


            <h2 className='text-3xl font-bold mb-2 text-[#ff4d2d]'>
                Buddy Bite
            </h2>

            {

                userData?.data?.category === "consumer" &&
                <div className='md:w-[60%] lg:w-[40%] h-17.5 hidden md:flex bg-white shadow-xl rounded-lg items-center gap-5 '>
                    <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                        <FaLocationDot className='w-6.25 h-6.25 text-[#ff4d2d] ' />
                        <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
                    </div>

                    <div className='w-[80%] flex items-center gap-2.5'>
                        <IoIosSearch size={25} className='text-[#ff4d2d] cursor-pointer' />
                        <input
                            type="text"
                            placeholder='search delicious food...'
                            className='px-2.5 text-gray-700 outline-0 w-full'
                        />
                    </div>
                </div>

            }


            <div className='flex items-center gap-4'>
                {

                    userData?.data?.category === "consumer" &&
                    (showSearch ? <RxCross2 size={30} className='text-[#ff4d2d] md:hidden cursor-pointer' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={30} className='text-[#ff4d2d] md:hidden cursor-pointer' onClick={() => setShowSearch(true)} />)

                }

                {

                    userData?.data?.category == "restaurant" ?
                        <>
                            {

                                myShopData &&
                                <>
                                    <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' size={20} onClick={() => navigate('/addItem')}>
                                        <FaPlus />
                                        <span>Add Food Item</span>
                                    </button>
                                    <button className='md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                                        <FaPlus size={20} onClick={() => navigate('/addItem')} />
                                    </button>
                                </>

                            }


                            <div className='md:flex hidden items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                                <TbReceipt2 size={20} />
                                <span>My Orders</span>
                                <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-1.5 py-px'>
                                    0
                                </span>
                            </div>

                            <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                                <TbReceipt2 size={20} />
                                <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-1.5 py-px'>
                                    0 
                                </span>
                            </div>

                        </>

                        :

                        (<>

                            <div className='relative cursor-pointer'>
                                <IoCartOutline size={30} className='text-[#ff4d2d]' />
                                <span className='absolute -right-2.25 -top-3 text-[#ff4d2d]'>0</span>
                            </div>

                            <button className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium'>
                                My Orders
                            </button>

                        </>)

                }




                <div className='w-8 h-8 rounded-full text-center sm:rounded-full flex items-center justify-center bg-[#ff4d2d]'>
                    <p onClick={() => setShowInfo(prev => !prev)} className='text-white text-[25px] shadow-xl font-semibold cursor-pointer mb-1 ml-0.5'>{userData?.data?.userName.slice(0, 1)}</p>
                </div>

                {
                    showInfo && <div className='fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999'>
                        <div className='text-[17px] font-semibold'>{userData?.data?.userName}</div>
                        {

                            userData?.data?.category === "user" && <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer'>My Orders</div>

                        }

                        <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogout}>Log Out</div>
                    </div>
                }

            </div>
        </div>
    );
}

export default Navbar;
