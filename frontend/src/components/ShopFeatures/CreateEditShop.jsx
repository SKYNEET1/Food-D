import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUtensils } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../../App';
import { setMyShopData } from '../../redux/ownerSlice';

const CreateEditShop = () => {
    const { myShopData } = useSelector(state => state.owner);
    const { currentCity, currentState, currentAddress } = useSelector(state => state.user);
    const [name, setName] = useState(myShopData?.name || "")
    const [address, setAddress] = useState(myShopData?.address || currentAddress)
    const [city, setCity] = useState(myShopData?.city || currentCity);
    const [state, setState] = useState(myShopData?.state || currentState);
    const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
    const [backendImage, setBackendImage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (frontendImage && frontendImage.startsWith("blob:")) {
                URL.revokeObjectURL(frontendImage);
            }
        };
    }, [frontendImage]);


    // This useEffect is responsible for cleaning up memory created by image previews. When you select an image, URL.createObjectURL() creates a temporary URL that points to the image file stored in the browser’s memory. React does not automatically remove this memory. This effect watches the frontendImage value, and whenever frontendImage changes or when the component is about to unmount (for example, when you leave the page), the cleanup function runs. Inside that cleanup, URL.revokeObjectURL(frontendImage) tells the browser that the old temporary image URL is no longer needed, so the memory used by it can be freed. In short, this code ensures that every temporary image preview is properly released, preventing memory leaks and keeping the application efficient and production-safe.

    const handelImage = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        setBackendImage(file); //Used when sending data to backend, backend needs the real img not the preview
        setFrontendImage(URL.createObjectURL(file)); //Converts the image file into a temporary browser URL, it will temporarily store this file in memory and give you a URL to access it.
        // Creates a temporary URL in browser memory (RAM), Browser does NOT auto-delete it
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("address", address);
            if (backendImage) {
                formData.append("image", backendImage);
            }
            const result = await axios.post(`${serverURL}/api/shop/createAndUpdateShop`,
                formData,
                {
                    withCredentials: true
                }
            );
            dispatch(setMyShopData(result.data.data));
            console.log(result.data);
            navigate('/owner-dashbord');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center flex-col items-center p-6 bg-linear-to-br from-orange-50 relative to-white min-h-screen'>
            <div className='absolute top-5 left-5 z-10 mb-2.5 cursor-pointer' onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack size={35} className='text-[#ff4d2d]' />
            </div>

            <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>

                <div className='flex flex-col items-center mb-6'>
                    <div className='bg-orange-100 p-4 mb-4 rounded-full'>
                        <FaUtensils className='w-16 h-16 text-[#ff4d2d]' />
                    </div>
                    <div className='text-3xl font-extrabold text-gray-900'>
                        {myShopData ? "Edit Shop" : "Add Shop"}
                    </div>
                </div>

                <form className='space-y-5' encType="multipart/form-data">
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input type="text" placeholder='Enter Shop Name' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Shop Image</label>
                        <input onChange={handelImage} type="file" accept='image/*' placeholder='Enter Shop Name' className='cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                        {

                            frontendImage &&
                            <div className='mt-4'>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                            </div>

                        }
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
                            <input type="text" placeholder='City' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
                            <input type="text" placeholder='State' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                        <input type="text" placeholder='Enter Shop Address' className=' w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <button onClick={handelSubmit} className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200'>
                        Save
                    </button>

                </form>
            </div>
        </div>
    )
}

export default CreateEditShop