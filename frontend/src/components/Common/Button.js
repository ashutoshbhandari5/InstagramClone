import React from "react";
import googelLogo from "../../assets/google.png";
import Loading from "./Loading";
const Button = ({ disabled, usedFor, onClick, type, text, loading }) => {
  if (usedFor === "googleLogin") {
    return (
      <div onClick={onClick} className="google-login">
        <img src={googelLogo} alt="Google Logo" />
        <p className="font-medium">Log in with Google</p>
      </div>
    );
  }
  return (
    <div className="button">
      <button type={type} disabled={disabled}>
        {loading ? (
          <span>
            <Loading />
          </span>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default Button;
