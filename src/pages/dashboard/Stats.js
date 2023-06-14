import React, { useEffect } from 'react'
import { ChartsContainer, StatsContainer } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { showStats } from '../../reducers/allJobsSlice';
const Stats = () => {
  const {isLoading,monthlyApplications}=useSelector((state)=>state.allJobs)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(showStats())
  },[])
  return (
    <div>Stats
      <StatsContainer/>
      {monthlyApplications.length > 0 && <ChartsContainer/>}
    </div>
  )
}

export default Stats