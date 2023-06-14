import React, { useEffect } from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector,useDispatch } from 'react-redux'
import { getAllJobs } from '../reducers/allJobsSlice'
import PageBtnContainer from './PageBtnContainer'
const JobsContainer = () => {

  const { jobs, isLoading,sort,search,searchType,searchStatus, page, totalJobs, numOfPages } = useSelector(
    (store) => store.allJobs
  );
  const dispatch=useDispatch()
 
    
  useEffect(()=>{
    dispatch(getAllJobs())
  },[search,page,searchType,searchStatus,sort])
  if(isLoading){
    return <div className='loading loading-center'>
  
    </div>
  }
  if(jobs.length === 0){
    <Wrapper>
      <h1>No jobs Found ...</h1>
    </Wrapper>
  }
  return (
    <Wrapper>
    <h5>
    {totalJobs} job{jobs.length > 1 && 's'} found
  </h5>
    <div className='jobs'>
      {jobs && jobs.map((job)=>{
  
        return <Job key={job._id} {...job}/>
      })}
    </div>
    {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer