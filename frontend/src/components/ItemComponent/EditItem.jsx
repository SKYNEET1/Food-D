import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUtensils } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { serverURL } from '../../App';
import { setMyShopData } from '../../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

const EditItem = () => {

    const [currentItem, setCurrentItem] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { itemId } = useParams();

    const categories = [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Fast Food",
        "Others"
    ];
    const [category, setCategory] = useState("");
    const [foodType, setFoodType] = useState("Veg")

    useEffect(() => {
        return () => {
            if (frontendImage && frontendImage.startsWith("blob:")) {
                URL.revokeObjectURL(frontendImage);
            }
        };
    }, [frontendImage]);


    const handelImage = (e) => {
        // console.log(e.target.files);
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));

    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const formData = new FormData();
            formData.append("name", name);
            formData.append("foodType", foodType);
            formData.append("price", price);
            formData.append("category", category);
            if (backendImage) {
                formData.append("image", backendImage);
            }
            const result = await axios.post(`${serverURL}/api/item/updateItem/${itemId}`,
                formData,
                {
                    withCredentials: true
                }
            );
            dispatch(setMyShopData(result?.data?.data));
            setLoading(false)
            console.log('Checking for shop and items in additem ', result.data.data);
            navigate('/');

        } catch (error) {

            console.log(error);
            setLoading(false)

        }
    }

    useEffect(() => {


        const handelGetItemById = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/item/getTargetItem/${itemId}`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                setCurrentItem(result.data.data);
                console.log('to find out edit item api >>>>', result.data.data);
            }
            catch (error) {
                console.log('You are in edit Item >>> ', error)
            }
        }

        handelGetItemById();

    }, []);

    // State derived from async data must be set in useEffect, not useState initializer
    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name);
            setPrice(currentItem.price);
            setCategory(currentItem.category);
            setFoodType(currentItem.foodType);
            setFrontendImage(currentItem.image);
        }
    }, [currentItem]);


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
                        Edit Food Item
                    </div>
                </div>

                <form className='space-y-5'>
                    {/* name */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Food Name</label>
                        <input type="text" placeholder='Enter Food Name' className='cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    {/* food image */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Food Image</label>
                        <input onChange={handelImage} type="file" accept='image/*' className='cursor-pointer w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
                        {

                            frontendImage &&
                            <div className='mt-4'>
                                <img src={frontendImage} alt="" className='w-full h-48 object-cover rounded-lg border' />
                            </div>

                        }
                    </div>
                    {/* price */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                        <input type="number" placeholder='0' className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>
                    {/* category */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
                        <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="">Select Category</option>
                            {

                                categories.map((categ, index) => (
                                    <option value={categ} key={index}>{categ}</option>
                                ))

                            }
                        </select>
                    </div>
                    {/* Food Type */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Select Food Type</label>
                        <select className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                            onChange={(e) => setFoodType(e.target.value)}
                            value={foodType}
                        >

                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>

                        </select>
                    </div>
                    <button onClick={handelSubmit} disabled={loading} className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200'>
                        {loading ? <ClipLoader size={20} color='white'/> : "Save"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default EditItem;