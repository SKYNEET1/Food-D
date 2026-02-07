import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setAllItems } from '../redux/userSlice';

const useGetItemsByCity = () => {

    const dispatch = useDispatch();
    // const { currentCity } = useSelector(state => state.user)
    const currentCity = "bidanasi,cuttack"

    useEffect(() => {
        const fetchItems = async () => {
            try {

                const result = await axios.get(`${serverURL}/api/user/getItemByCity/${currentCity}`,
                    { withCredentials: true }
                );
                dispatch(setAllItems(result.data.data));
                console.log('u are in getItemByCity hook =>>> ', result.data.data);

            } catch (error) {

                console.log(error);

            }
        }
        fetchItems();
    }, [currentCity])
}

export default useGetItemsByCity;