import React, {useState} from 'react';
import './LoginForm.scss';
import Input from '../../Components/Input/Textbox';
import Button from '../../Components/Button/Button';
import Divider from '../../Components/Divider/Divider';

const Loginform = () => {

  const [userName, setUserName] = useState(" ");
  const [password, setPassword] = useState(" ");

  const buttonStyle = {"width": "108%"};

  return (
   <div className='login-container'>
     <div className='login-card'>
       <h3 className='logo'>
         Instagram
       </h3>
       <form className='login-form'>
         <Input type={"text"} placeholder={"Phone number, username or email"} onChange={setUserName} />
         <Input type={"password"} placeholder={"Password"} onChange={setPassword} />
         <Button buttonType={"Log In"} buttonStyle={buttonStyle}/>
         <div className='form-divider'>
           <Divider/>
           <span>OR</span>
           <Divider/>
         </div>
       </form>
     </div>
   </div>
  )
}

export default Loginform


