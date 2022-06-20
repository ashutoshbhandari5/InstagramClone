import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../../redux/authSlice";
import useForm from "../../../hooks/useForm";
import Logo from "../../../assets/logo.png";
import BorderLine from "../../Common/BorderLine/BorderLine";
import Button from "../../Common/Button/Button";
import Input from "../../Common/Input/Input";
import LinkTo from "../../Common/LinkTo/LinkTo";
import URL from "../../Common/URL/URL";
import GooglePlayImg from "../../../assets/GooglePlay.png";
import AppStoreImg from "../../../assets/AppStore.png";
import { gapi } from "gapi-script";
import GoogleLoginButton from "../../Common/Button/GoogleLoginButton";

const LoginCard = () => {
  const GClientID = process.env.REACT_APP_GOOGLE_CLINET_ID;

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: GClientID,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  });
  const { values, handleChange, disableLoginButton } = useForm();
  const { username, password } = values;
  const dispatch = useDispatch();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );
  // if (isLoading) {
  //   console.log(isLoading);
  // }
  // if (isSuccess) {
  //   console.log(isSuccess);
  // }
  // if (user) {
  //   console.log(user);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(login(user));
  };
  const handleGoogleLogin = (response) => {
    console.log("Success");
    console.log(response);
  };
  const handleGoogleLoginFailure = (response) => {
    console.log("Failed");
    console.log(response);
  };

  return (
    <div>
      <div className="login-card-container">
        <div className="heading-logo">
          <img className="heading-logo-image" src={Logo} alt="Heading logo" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            type={"text"}
            name={"username"}
            value={username}
            placeholder={"Phone number, username and email"}
            onInputChange={handleChange}
          />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            value={password}
            onInputChange={handleChange}
          />
          <Button
            disabled={disableLoginButton()}
            type={"submit"}
            text={"Log In"}
          />
          <div className="divider">
            <BorderLine />
            <span className="uppercase">or</span>
            <BorderLine />
          </div>
          <GoogleLoginButton
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginFailure}
          />
          <div className="forget-password">
            <LinkTo linkTo={"/resetpassword"}>
              <span className="text-size-small color-link">
                Forget password?
              </span>
            </LinkTo>
          </div>
        </form>
      </div>
      <div className="white-color sign-up">
        <div>
          <p className="text-size-medium color-dark">Don't have an account?</p>
          <LinkTo linkTo={"/signup"}>
            <span className="text-size-medium ml-lg color-blue font-bold">
              Sign Up
            </span>
          </LinkTo>
        </div>
      </div>
      <h3 className="text-size-medium font-medium text-center mtb-lg">
        Get the app.
      </h3>
      <div className="download-link">
        <URL img={AppStoreImg} url={process.env.REACT_APP_APPLE_STORE_IMAGE} />
        <URL
          img={GooglePlayImg}
          url={process.env.REACT_APP_GOOGLE_PLAY_STORE_IMAGE}
        />
      </div>
    </div>
  );
};

export default LoginCard;
