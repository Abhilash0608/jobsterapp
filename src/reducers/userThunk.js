import customFetch, { checkForUnauthorizedResponse } from "../utils/axios";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "./jobSlice";
import { clearValues } from "./jobSlice";
import thunk from "redux-thunk";
export const registerUserThunk=async (user,thunkAPI)=>{
    try {
        const resp=await customFetch.post('/auth/register',user)
        return resp.data
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)
       
    }  
}
export const updateUserThunk=async (user,thunkAPI)=>{
    try {
        const resp=await customFetch.patch('/auth/updateUser',user,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`,
            },
        })
        return resp.data
    } catch (error) {
    
        if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser());
          return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
        }
        return checkForUnauthorizedResponse(error,thunkAPI)
      } 
}

export const loginUserThunk=async(user,thunkAPI)=>{
    try {
        const resp=await customFetch.post('/auth/login',user)
        return resp.data
    } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)
       
    }  
}
export const clearStoreThunk=async(message,thunkAPI)=>{
    try {
       thunkAPI.dispatch(logoutUser(message)) 
       thunkAPI.dispatch(clearAllJobsState())
       thunkAPI.dispatch(clearValues())
       return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}