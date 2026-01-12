import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';

const UserDashbord = () => {
    return (
        <div className="w-full h-20 flex items-center justify-between px-5 fixed top-0 z-[9999] bg-[#fff9f6]">

            {/* LEFT LOGO + TITLE */}
            <div className="flex items-center gap-3">
                {/* Blank Logo Placeholder */}
                <img src="./src/assets/BuddyBiteLogo.png" alt="logo" className="w-20 h-20 rounded-full" />

                <h1 className="text-3xl font-bold text-[#ff4d2d]">
                    Buddy Bites
                </h1>
            </div>

            {/* CENTERED SEARCH BOX */}
            <div className="absolute left-1/2 -translate-x-1/2 md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg flex items-center gap-5">

                {/* LOCATION */}
                <div className="flex items-center w-[20%] gap-2.5 px-2.5 border-r-2 border-gray-400">
                    <FaLocationDot className="text-xl text-[#ff4d2d]" />
                    <div className="text-lg font-medium text-gray-800">Odisha</div>
                </div>

                {/* SEARCH INPUT */}
                <div className="w-[70%] flex items-center gap-2.5 px-2.5">
                    <IoIosSearch size={25} className="text-[#ff4d2d]" />
                    <input
                        type="text"
                        placeholder="search delicious food..."
                        className="w-full text-gray-700 outline-0 bg-transparent"
                    />
                </div>

            </div>
        </div>
    );
}

export default UserDashbord;
