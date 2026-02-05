import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { clearUserData, setAllShop } from '../redux/userSlice';
import { useSelector } from 'react-redux';

const useGetAllShopByCity = () => {

    const dispatch = useDispatch();
    // const { currentCity } = useSelector(state => state.user)
    const currentCity = "bidanasi,cuttack"

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const result = await axios.get(`${serverURL}/api/user/getAllShopByCity/${currentCity}`,
                    { withCredentials: true }
                );
                dispatch(setAllShop(result.data.data));
                console.log('u are in getAllShopByCity =>>> ', result.data.data);

            } catch (error) {

                console.log(error);

            }
        }
        fetchUser();
    }, [currentCity])
}

export default useGetAllShopByCity;