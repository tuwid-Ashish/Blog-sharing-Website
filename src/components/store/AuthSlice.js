import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state,action)=>{
            state.status=true,
            state.userData = action.payload
            console.log("how its render");
        },

        logout:(state)=>{
            state.status = false
            state.userData = null
        }
    }
})

export const { login,logout} = AuthSlice.actions

const Authreducers = AuthSlice.reducer
export default Authreducers