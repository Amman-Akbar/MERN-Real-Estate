import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error: null
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatestart: (state) => {
            state.loading = true;
        },
        updatefailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updatesuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        }
    }
})

export const { loginStart, loginSuccess, loginFailure, updatestart, updatefailure, updatesuccess } = userSlice.actions;
export default userSlice.reducer