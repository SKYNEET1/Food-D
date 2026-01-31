import axios from 'axios'
import React, { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCity, setCurrentState, setCurrentAddress } from '../redux/userSlice';

const useGetCurrentcityHook = () => {

    const dispatch = useDispatch();
    const { userData } = useSelector(state => state.user);
    useEffect(() => {

        if (!userData) {
            console.log('UserData not found | Inside useGetCurrentCityHook >>>');
            return;
        };

        if (!navigator.geolocation) {
            console.log("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {

            console.log('pos', position);
            const API_KEY = import.meta.env.VITE_GEO_APIKEY;
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${API_KEY}`, {});

            // console.log(result.data);
            dispatch(setCurrentCity(result.data.results[0].city));
            dispatch(setCurrentState(result.data.results[0].state));
            dispatch(setCurrentAddress(result.data.results[0].address_line2 || result.data.results[0].address_line1));

        }, (error) => {

            if (error.code === 2) {
                console.log("Location unavailable, switching to manual mode");
            } else if (error.code === 1) {
                console.log("Permission denied");
            } else if (error.code === 3) {
                console.log("Location timeout");
            }

        })
    }, [userData])

}

export default useGetCurrentcityHook;