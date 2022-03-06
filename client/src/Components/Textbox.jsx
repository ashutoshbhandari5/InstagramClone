import React, { useState } from 'react'

const Textbox = (props) => {

   const [Value, setValue] = useState("");


const onchnageValue=(e)=>{
      setValue(e.target.value)
   };


  return (
    <>
    <input type={props.type}
    placeholder={props.placeholder} 
    style={{margin:'4px'}} 
    onChange={onchnageValue}
    value={Value}
    />
    </>
  )
}

export default Textbox