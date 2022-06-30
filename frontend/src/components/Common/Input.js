// import React, { useState } from "react";

const Input = ({ type, placeholder, name, onInputChange, formik }) => {
  // const [showPassword, setShowPassword] = useState(false);

  return formik ? (
    <div className="input-box">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={formik.handleChange}
        value={formik?.values?.name}
      />
      {/* todo
      Show and hide pw  */}
      {/* {type === "passoword" && showPassword && (
        <span className="input-toggle"> {showPassword ? "Hide" : "Show"} </span>
      )} */}
    </div>
  ) : (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onInputChange(e.target)}
      />
      {/* todo
      Show and hide pw  */}
      {/* {type === "passoword" && showPassword && (
        <span className="input-toggle"> {showPassword ? "Hide" : "Show"} </span>
      )} */}
    </div>
  );
};

export default Input;
