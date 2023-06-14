import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FormRowSelect from '../../components/FormRowSelect';
import { clearValues, createJob, editJob, handleChange, } from '../../reducers/jobSlice';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }if (isEditing) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return;
    }
    dispatch(createJob({position,company,jobLocation,jobType,status}))
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name,value}))
  };
  useEffect(()=>{
    if(!isEditing){
      dispatch(
        handleChange({
          name:'jobLocation',
          value:user.location
        })
      )
    }
  })
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
      <h3>{isEditing?'Edit Job':"Add Job"}</h3>
        <div className='form-center'>
          <FormRow handleChange={handleJobInput} type="text" name="position" value={position} labelText="position"/>
          <FormRow handleChange={handleJobInput} type="text" name="company" value={company} labelText="company"/>
          <FormRow handleChange={handleJobInput} type="text" name="jobLocation" value={jobLocation} labelText="jobLocation"/>
          <FormRowSelect handleChange={handleJobInput} name="status" value={status} labelText="status" list={statusOptions}/>
          <FormRowSelect handleChange={handleJobInput} name="jobType" value={jobType} labelText="status" list={jobTypeOptions}/>
          <div className='btn-container'>
            <button type="button" className='btn btn-block clear-btn' onClick={()=>dispatch(clearValues())}>
              Clear
            </button>
            <button type="submit" className='btn btn-block submit-btn'>
              Save
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob