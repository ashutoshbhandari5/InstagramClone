import React, { useState } from "react";

const Input = ({ type, placeholder, onInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (value) => {
    onInputChange(value);
    value !== "" ? setShowPassword(true) : setShowPassword(false);
  };

  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        onChangeCapture={(e) => handleInputChange(e.target.value)}
      />
      {type === "passoword" && showPassword && (
        <span className="input-toggle"> {showPassword ? "Hide" : "Show"} </span>
      )}
    </div>
  );
};

export default Input;
