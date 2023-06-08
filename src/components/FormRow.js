import React from 'react'

const FormRow = ({type,name,handleChange,value,labelText}) => {
    if(name === "password"){
        return(
            <div className='form-row'>  
            <label htmlFor={name} className='form-label'>{name || labelText}</label>
            <input type={type} placeholder={`enter your ${name}`}  autoComplete='current-password' name={name} id={name} value={value} className='form-input'onChange={handleChange}/>
            </div>  
        )
    }
  return (
    <div className='form-row'>
                <label htmlFor={name} className='form-label'>{name || labelText}</label>
                <input type={type} placeholder={`enter your ${name}`}   name={name} id={name} value={value} className='form-input'onChange={handleChange}/>
            </div>
  )
}

export default FormRow