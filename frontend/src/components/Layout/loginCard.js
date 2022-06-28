import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import useForm from "../../hooks/useForm";
import Logo from "../../assets/logo.png";
import BorderLine from "../Common/BorderLine";
import Button from "../Common/Button";
import Input from "../Common/Input";
import LinkTo from "../Common/LinkTo";
import URL from "../Common/URL";
import GooglePlayImg from "../../assets/GooglePlay.png";
import AppStoreImg from "../../assets/AppStore.png";
import GoogleLoginButton from "../Common/GoogleLoginButton";
import { gapi } from "gapi-script";
import axios from "axios";

const LoginCard = ({ loading }) => {
  const GClientID = process.env.REACT_APP_GOOGLE_CLINET_ID;

  const { values, handleChange, disableLoginButton } = useForm();
  const { username, password } = values;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };
    dispatch(login(user));
  };
  const handleGoogleLogin = async (response) => {
    console.log("Success");
    const token = response.tokenId;
    const { data } = await axios.post("/api/v1/user/googleLogin", { token });
    console.log(data);
  };
  const handleGoogleLoginFailure = (response) => {};

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: GClientID,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, [GClientID]);

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
            loading={loading}
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
