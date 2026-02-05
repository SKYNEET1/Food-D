import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { clearUserData, setUserData } from '../redux/userSlice';

const useGetCurrentUserHook = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const result = await axios.get(`${serverURL}/api/user/currentUser`,
                    { withCredentials: true }
                );
                dispatch(setUserData(result.data));
                console.log('u are in getcurrenthook =>>>> ', result);

            } catch (error) {

                console.log(error);
                dispatch(clearUserData());
                
            }
        }
        fetchUser();
    }, [])
}

export default useGetCurrentUserHook;