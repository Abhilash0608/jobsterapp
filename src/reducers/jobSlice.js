import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../utils/axios';
import { getUserFromLocalStorage } from '../utils/localStorage';
import { logoutUser } from './userSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};
export const createJob=createAsyncThunk('job/createJob',
async(job,thunkAPI)=>{
  try {
    const reps= await customFetch.post('/jobs',job,{
      headers:{
        authorization:`Bearer ${thunkAPI.getState().user.user.token}`
      }
    })
    thunkAPI.dispatch(clearValues())
    return reps.data
  } catch (error) {
    if(error.response.status === 401){
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('UnAuthorized loggin Out')
    }
    return checkForUnauthorizedResponse(error,thunkAPI)
  }
})
export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ jobId, job }, thunkAPI) => {
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error,thunkAPI)
    }
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers:{
    handleChange:(state,{payload:{name,value}})=>{
      state[name]=value
    },
    clearValues:()=>{
      return initialState
    },
    clearAllJobsState:()=>initialState
  },
  extraReducers:{
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success('Job Modified...');
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [createJob.pending]:(state)=>{
      state.isLoading=true
    },
    [createJob.fulfilled]:(state)=>{
      state.isLoading=false;
      toast.success("Job Created")
    },
    [createJob.rejected]:(state,{payload})=>{
      state.isLoading=false;
      toast.error(payload)
    }

  }
});
export const  {handleChange,clearValues,clearAllJobsState}=jobSlice.actions
export default jobSlice.reducer;