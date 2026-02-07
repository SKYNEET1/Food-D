import React from 'react'
import { useState } from 'react'
import { FaDrumstickBite, FaLeaf, FaMinus, FaPlus, FaRegStar, FaShoppingCart, FaStar } from 'react-icons/fa'

const FoodCard = ({ data }) => {

    const [quantity, setQuantity] = useState(0);
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                (
                    i <= rating ? (
                        <FaStar className='text-yellow-500 text-lg' />
                    ) : (
                        <FaRegStar className='text-yellow-500 text-lg' />
                    )

                )
            )
        }

        return stars;

    }

    const handelIncrease = () => {

    }
    const handelDecrease = () => {

    }

    return (
        <div className='w-62.5 rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md
overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>

            {/* Food -> image, type */}
            <div className='relative w-full h-42.5 flex justify-center items-center bg-white'>

                <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'>
                    {data?.foodType == "veg" ? <FaLeaf className='text-green-600 text-lg ' /> : <FaDrumstickBite
                        className='text-red-600 text-lg z-10' />}
                </div>

                <img src={data?.image} alt="" className='w-full h-full object-cover transition-transform
        duration-300 hover:scale-105'/>

            </div>

            {/* Food -> rating, count */}
            <div className="flex-1 flex flex-col p-4">
                <h2 className='font-semibold text-gray-900 text-base truncate'>{data?.name}</h2>

                <div className='flex items-center gap-1 mt-1'>
                    {renderStars(data?.rating?.average || 0)}
                    <span className='text-xs text-gray-500 pl-1'>
                        {data?.rating?.count}
                    </span>
                </div>
            </div>

            {/* Food -> Price and +, - */}
            <div className='flex items-center justify-between mt-auto p-4'>
                <span className='font-semibold text-gray-900 text-lg'>
                    {data?.price}
                </span>

                <div className='flex items-center border rounded-full overflow-hidden shadow-sm'>
                    <button className='px-2 py-2 text-sm hover:bg-gray-200 transition ' onClick={() => {
                        quantity > 0 &&
                            setQuantity((quantity) => quantity - 1)
                    }}>
                        <FaMinus size={12} />
                    </button>
                    <span>{quantity}</span>
                    <button className='px-2 py-2 text-sm hover:bg-gray-200 transition ' onClick={() => setQuantity((quantity) => quantity + 1)}>
                        <FaPlus size={12} />
                    </button>
                    <button className='bg-[#ff4d2d] text-white px-3 py-2 transition-colors' >
                        <FaShoppingCart size={12} />
                    </button>
                </div>
            </div>

        </div >
    )
}

export default FoodCard