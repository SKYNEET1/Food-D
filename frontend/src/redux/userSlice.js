import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        currentAddress: null,
        currentCity: null,
        currentState: null,
        loading: true
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.loading = false;
        },
        clearUserData: (state) => {
            state.userData = null;
            state.loading = false;
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload;
        },
        setCurrentCity: (state, action) => {
            state.currentCity = action.payload;
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload;
        }
    }
})

export const { setUserData, setCurrentCity, setCurrentState, setCurrentAddress, clearUserData } = userSlice.actions;
export default userSlice.reducer;