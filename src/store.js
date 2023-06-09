import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import jobReducer from './reducers/jobSlice'
export const store=configureStore({
   reducer:{
     user:userReducer,
     job:jobReducer,
    }
})
