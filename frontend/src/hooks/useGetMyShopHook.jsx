import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';

const useGetMyShopHook = () => {

    const dispatch = useDispatch();
    const { userData, loading } = useSelector(state => state.user);

    useEffect(() => {

        if (loading) return;

        if (!userData) {
            console.log('UserData not found | Inside useGetMyShopHook >>>');
            return;
        };

        const fetchShop = async () => {
            try {

                const result = await axios.get(`${serverURL}/api/shop/getShop`,
                    { withCredentials: true }
                );
                dispatch(setMyShopData(result?.data?.data));
                console.log('u are in getMyShopHook', result);

            } catch (error) {

                const message =
                    error.response?.data?.message || "Something went wrong";

                console.error(message);

            }
        }
        fetchShop();
    }, [userData, loading, dispatch])
}

export default useGetMyShopHook;