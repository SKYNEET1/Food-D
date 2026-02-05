import React from 'react';
import Navbar from './Navbar';
import CategoryCard from '../CategoryFeatures/CategoryCard';
import { categories } from '@/helper/category';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserDashbord = () => {
    const { currentCity, shopsInMyCity } = useSelector(state => state.user)
    const catScrollRef = useRef();
    const shopScrollRef = useRef();
    const [showLeftCatBtn, setShowleftCatBtn] = useState(false);
    const [showRightCatBtn, setShowRightCatBtn] = useState(false);
    const [showRightShopBtn, setShowRightShopBtn] = useState(false);
    const [showLeftShopBtn, setShowleftShopBtn] = useState(false);

    const updateBtn = (ref, setRightBtn, setleftBtn) => {
        const element = ref.current;
        if (element) {
            setleftBtn(element.scrollLeft > 0);
            setRightBtn(element.scrollLeft + element.clientWidth < element.scrollWidth);
        }
    }

    const scrollHandler = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        const catEl = catScrollRef.current;
        const shopEl = shopScrollRef.current;

        if (!catEl || !shopEl) return;

        const handleCatScroll = () => {
            updateBtn(catScrollRef, setShowRightCatBtn, setShowleftCatBtn);
        };

        const handleShopScroll = () => {
            updateBtn(shopScrollRef, setShowRightShopBtn, setShowleftShopBtn);
        };

        // Initial calculation
        handleCatScroll();
        handleShopScroll();

        catEl.addEventListener("scroll", handleCatScroll);
        shopEl.addEventListener("scroll", handleShopScroll);

        return () => {
            catEl.removeEventListener("scroll", handleCatScroll);
            shopEl.removeEventListener("scroll", handleShopScroll);
        };
    }, [shopsInMyCity]);



    return (
        <div className='w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto pt-20'>
            <Navbar />

            {/* category */}
            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">

                <h2 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h2>

                <div className='w-full relative'>
                    {/* Left scroll */}
                    {

                        showLeftCatBtn && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(catScrollRef, "left")}>
                            <FaCircleChevronLeft />
                        </button>

                    }

                    <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={catScrollRef}>
                        {categories?.map((cate, index) => (
                            <CategoryCard data={cate} key={index} />
                        ))}
                    </div>
                    {/* Right scroll */}
                    {

                        showRightCatBtn && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(catScrollRef, "right")}>
                            <FaCircleChevronRight />
                        </button>

                    }

                </div>

            </div>

            {/* shop */}
            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
                <h1 className='text-gray-800 text-2xl sm:text-3xl'>Best shop in {currentCity}</h1>
                <div className='w-full relative'>
                    {/* Left scroll */}
                    {

                        showLeftShopBtn && <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "left")}>
                            <FaCircleChevronLeft />
                        </button>

                    }

                    <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth' ref={shopScrollRef}>
                        {shopsInMyCity?.map((cate, index) => (
                            <CategoryCard data={cate} key={index} />
                        ))}
                    </div>
                    {/* Right scroll */}
                    {

                        showRightShopBtn && <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10' onClick={() => scrollHandler(shopScrollRef, "right")}>
                            <FaCircleChevronRight />
                        </button>

                    }

                </div>
            </div>

            <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
                <h2 className='text-gray-800 text-2xl sm:text-3xl'>
                    Suggested Food Items
                </h2>
            </div>
        </div>
    );
}

export default UserDashbord;
