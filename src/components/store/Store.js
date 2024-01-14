import { configureStore } from "@reduxjs/toolkit";
import Authreducers from "./AuthSlice";
import Postreducer from "./PostSlice";
export const Store = configureStore({
    reducer:{
       auth: Authreducers,
       post: Postreducer,

    } 
})