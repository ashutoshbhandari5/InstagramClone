import React from 'react';
import "./Input.scss";


const Textbox = ({type, placeholder, onChange}) => {

const handleChange = ({target}) => {
      onChange(target.value)
     }; 


  return (
    <input
      className='form-input'
      type = {type}
      placeholder = {placeholder}
      onChange = {(e) => handleChange(e)}
    />
  )
}

export default Textbox; 