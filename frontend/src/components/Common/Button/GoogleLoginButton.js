import React from "react";
import GoogleLogin from "react-google-login";
import Button from "./Button";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLINET_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          usedFor={"googleLogin"}
        />
      )}
    />
  );
};

export default GoogleLoginButton;
