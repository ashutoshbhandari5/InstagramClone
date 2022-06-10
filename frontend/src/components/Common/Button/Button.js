import React from "react";
import googelLogo from "../../../assets/google.png";

const Button = ({ disabled, type, text }) => {
  if (type === "googleLogin") {
    return (
      <div className="google-login">
        <img src={googelLogo} alt="Google Logo" />
        <p className="font-medium">Log in with Google</p>
      </div>
    );
  }
  return (
    <div className="button">
      <button disabled={disabled}>{text}</button>
    </div>
  );
};

export default Button;
