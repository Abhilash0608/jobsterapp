import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../utils/axios";
import { findAllByTestId } from "@testing-library/react";
import { getUserFromLocalStorage,removeUserFromLocalStorage,addUserToLocalStorage } from "../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk,clearStoreThunk } from "./userThunk";
const initialState={
    isLoading:false,
    isSidebarOpen:false,
    user:getUserFromLocalStorage()
}
export const registerUser=createAsyncThunk('user/registerUser',registerUserThunk)
export const updateUser=createAsyncThunk('user/updateUser',updateUserThunk)
export const loginUser=createAsyncThunk('user/loginUser',loginUserThunk)
export const clearStore=createAsyncThunk('user/clearStore',clearStoreThunk)
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        logoutUser:(state,{payload})=>{
            state.user=null
            state.isSidebarOpen=false
            removeUserFromLocalStorage()
            if(payload){
                toast.success(payload)
            }
        },
        toggleSidebar:(state)=>{
            state.isSidebarOpen=!state.isSidebarOpen
        }
    },
    extraReducers:{
        
        [registerUser.pending]:(state)=>{
            state.isLoading=true
        },
        [registerUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            user && addUserToLocalStorage(user)
            toast.success(`Hello There${user.name}`)
            console.log(user?.name,"fulfilled")
        },
        [registerUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
            console.log(payload && payload,"rehected")
        },
        [loginUser.pending]:(state)=>{
            state.isLoading=true
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            toast.success(`Welcome back ${user.name}`)
            console.log(user?.name,"fulfilled")
        },
        [loginUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
            console.log(payload && payload,"rehected")
        },
        [updateUser.pending]:(state)=>{
            state.isLoading=true
        },
        [updateUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            user && addUserToLocalStorage(user)
            toast.success("User Updated")

        },
        [updateUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
            console.log(payload && payload,"rehected")
        },
        [clearStore.rejected]:()=>{
            toast.error('There was an error...')
        }
    }

})
export const {toggleSidebar,logoutUser}=userSlice.actions 
export default userSlice.reducer