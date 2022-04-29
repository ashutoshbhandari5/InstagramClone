import React from 'react';
import ImageShowCase from '../../components/Layout/ImageShowCase/ImageShowCase';
import LoginCard from '../../components/Layout/LoginCard/loginCard';

const LoginPage = () => {
  return (
    <div className='login-page'>
        <ImageShowCase/>
        <LoginCard/>
    </div>
  )
}

export default LoginPage;