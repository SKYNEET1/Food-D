import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';

const useGetMyShopHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchShop = async () => {
            try {

                const result = await axios.get(`${serverURL}/api/shop/getShop`,
                    { withCredentials: true }
                );
                dispatch(setMyShopData(result.data));
                console.log('u are in getMyShopHook', result);

            } catch (error) {

                const message =
                    error.response?.data?.message || "Something went wrong";

                console.error(message);
                
            }
        }
        fetchShop();
    }, [])
}

export default useGetMyShopHook;