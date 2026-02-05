import { serverURL } from '@/App';
import { setMyShopData } from '@/redux/ownerSlice';
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const OwnerItemsCard = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('Data in Owner Item card >>> ', data);


    const handelDeleteItem = async () => {

        try {
            const result = await axios.delete(`${serverURL}/api/item/deleteItem/${data._id}`, { withCredentials: true });
            dispatch(setMyShopData(result.data.data));
        } catch (error) {
            console.log(error)
            toast.error('Failed to delete item. Please try again.')
        }
    }

    return (
        <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
            <div className='w-[30%] sm:w-[35%] h-40 sm:h-44 shrink-0 bg-gray-100'>
                <img
                    src={data.image}
                    alt={data.name}
                    className='w-full h-full object-cover'
                />
            </div>


            <div className='flex flex-col justify-between p-3 flex-1'>
                <div>
                    <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
                    <p><span className='font-medium text-gray-700'>Category:</span> {data.category}</p>
                    <p><span className='font-medium text-gray-700'>Food Type:</span> {data.foodType}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-[#ff4d2d] font-semibold'>₹{data.price}</div>

                    <div className='flex items-center gap-2'>
                        <div className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer'>
                            <FaPen size={16} onClick={() => navigate(`/edit-item/${data._id}`)} />
                        </div>
                        <div className='p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer' onClick={handelDeleteItem}>
                            <FaTrashAlt size={16} />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default OwnerItemsCard