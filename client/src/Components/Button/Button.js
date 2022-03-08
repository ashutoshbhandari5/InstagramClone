import React from 'react';
import "./Button.scss"

const Button = ({buttonType, buttonAction, buttonStyle}) => {

    const handleClick = () => {
        console.log("Clicked!!!")
    }

  return (
    <button className='login-btn' onClick={handleClick} style={{...buttonStyle}}>
        {buttonType}
    </button>
  )
}

export default Button