import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import jobReducer from './reducers/jobSlice'
import allJobsSlice from "./reducers/allJobsSlice";
export const store=configureStore({
   reducer:{
     user:userReducer,
     job:jobReducer,
     allJobs:allJobsSlice
    }
})
