import React from 'react'
import Image from '../Components/Image'
import LoginFooter from '../Components/LoginFooter'
import Loginform from '../Components/Loginform'
import '../LoginCss/Login.css'

const Login = () => {
  return (
    <>
      <div className='LoginContainer' style={{ padding: '30px', marginLeft: '250px' }}>
        <Image />
        <Loginform />
      </div>
      <LoginFooter />
    </>
  )
}

export default Login