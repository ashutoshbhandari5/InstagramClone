import React from 'react'
import '../LoginCss/Login.css'
import playstore from '../Images/playstore.png'
// import { useState } from 'react'
import Textbox from './Textbox'
const Loginform = () => {

  return (
    <div className='loginMain'>
       <div className='form'>
      <form className='form-content'>
         <h1>InstaGram</h1>

         <Textbox placeholder="username email or phone " type="text" />
         <Textbox placeholder="password" type="password" />
         
         

         <input type='button' 
         className='loginButton' 
         value='log in' />
         
         <div style={{display:"flex"}}>
            <hr className='hor'/>
             <p>OR</p>
             <hr className='hor'/></div>
         </form> 
         <div>
            <a href='facebook.com' style={{textDecoration:"none", marginTop:"2px"}}>Login to Facebook</a>
         </div>
         <span style={{fontSize:"10px"}}> 
            <a href="facebook.com">forgot password</a>
         </span>
       </div>
       <div className='dha'>
          <span>Don't have and account? </span><a href="facebook.com">SignUp</a>
       </div>
       <div className='dha'>
          <div ></div>
          <img src={playstore} alt="download app from here" style={{width:"200px",height:"30px"}}></img>
       </div>
       </div>
  )
}

export default Loginform