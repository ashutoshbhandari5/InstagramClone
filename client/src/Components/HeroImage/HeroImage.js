import React from 'react';
import "./Image.scss";
import img from "../../images/mobile.png"

const Image = () => {
  return (
   <>
   <div className='home-image'> 
     <img className="image-container" src={img} alt="InstaClone"/>
   </div>
   </>
  )
}

export default Image