import React from 'react'
import "./HomeScreen.scss"
import HeroImage from '../../Components/HeroImage/HeroImage'
import Loginform from '../LoginForm/Loginform'

const HomeScreen = () => {
  return (
    <div className='home-screen'>
        <HeroImage/>
        <Loginform/>
    </div>
  )
}

export default HomeScreen