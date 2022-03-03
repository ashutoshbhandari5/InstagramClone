import React from 'react'
import '../LoginCss/Login.css'
import img from '../Images/mobile.png'
const Image = () => {
  return (
   <>
   <div className='imagecontainer'> 
   {/* <img alt = "instaCLone"src="https://images.pexels.com/photos/5052877/pexels-photo-5052877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=&w=130"/> */}
   <img className="imagecontainer" src={img} alt="InstaClone"/>
   </div>
   </>
  )
}

export default Image