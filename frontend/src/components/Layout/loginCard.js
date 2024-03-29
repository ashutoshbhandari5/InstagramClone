import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import useForm from "../../hooks/useForm";
import Logo from "../../assets/logo.png";
import Button from "../Common/Button";
import Input from "../Common/Input";
import LinkTo from "../Common/LinkTo";
import GoogleLoginButton from "../Common/GoogleLoginButton";
import { gapi } from "gapi-script";
import axios from "axios";
import Divider from "../Common/Divider";
import Store from "../Common/Store";

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
  //TODO
  //Add the following request to redux
  //Add user to localstorage
  const handleGoogleLogin = async (response) => {
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
          <Divider />
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
      <Store />
    </div>
  );
};

export default LoginCard;
