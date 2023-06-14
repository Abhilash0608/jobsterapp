import { toast } from "react-toastify";
import customFetch, { checkForUnauthorizedResponse } from "../utils/axios"; 
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice";

export const getAllJobsThunk = async(_,thunkAPI)=>{
    const { page, search, searchStatus, searchType, sort } =
     thunkAPI.getState().allJobs;
     let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
     if (search) {
   url = url + `&search=${search}`;
 }
     try {
         const resp=await customFetch.get(url,{
             headers:{
                 authorization:`Bearer ${thunkAPI.getState().user.user.token}`
             }
         })
         return resp.data
     } catch (error) {
         return checkForUnauthorizedResponse(error,thunkAPI)
     }
 }
export const showStatsThunk= async (_, thunkAPI) => {
    try {
        const resp=await customFetch.get(`jobs/stats`,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return resp.data
      } catch (error) {
        return checkForUnauthorizedResponse(error,thunkAPI)
      }
}
export const deleteJobsThunk=async(jobId,thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    try {
        const resp=await customFetch.delete(`jobs/${jobId}`,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs())
        toast.success("Job Removed")
        return resp.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return checkForUnauthorizedResponse(error,thunkAPI)
    }
}