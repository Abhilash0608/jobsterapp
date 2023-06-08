import React, { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Logo } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
const initialState={
    name:'',
    email:'',
    password:'',
    isMember:true
}
const Register = () => {
    const [values,setValues]=useState(initialState)
    const navigate=useNavigate()
    const{isLoading,user}=useSelector((store)=>store.user)
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        let name=e.target.name
        let value=e.target.value
        setValues((prev)=>{
            return {...prev,[name]:value}
        })
    }
    const handleSubmit=(e)=>{
        const {name,email,password,isMember}=values
        e.preventDefault()
        if(!password || !email ||(!name && !isMember)){
            toast.error("Fill all the Fields")
        }
        if(isMember){
            dispatch(loginUser({password:password,email:email}))
        }
        if(!isMember){
        dispatch(registerUser({name:name,email:email,password:password}))
        let data={name:name,email:email,password:password}
        console.log('dispatach registerUser',data)
        }

    }
    const toggleMember=()=>{
        setValues((prev)=>{
            return {...prev,isMember:!values.isMember}
        })
    }
    useEffect(()=>{
        if(user){
            setTimeout(()=>{
                navigate('/')
            },2000)
        }
    },[user])
  return (
    <Wrapper className="full-page">
        <form className="form" onSubmit={handleSubmit}>
            <Logo/>
            <h1>{values.isMember ?'Login':'Register'}</h1>
            {!values.isMember && <FormRow name="name" value={values.name} handleChange={handleChange} type="text" labelText="name"/>}
            <FormRow name="email" value={values.email} handleChange={handleChange} type="email" labelText="Email"/>
            <FormRow name="password" value={values.password} handleChange={handleChange} type="password" labelText="Password"/>
            <button type="submit" disabled={isLoading}className='btn btn-block'>{isLoading?'loading..':'submit'}</button>
            <p>{values.isMember?'Not a Member? ':'Already a User? '}<button type='button' className='member-btn' onClick={toggleMember}>{values.isMember?'Register':'Login'}</button></p>
        </form>
    </Wrapper>
  )
}

export default Register