import React from "react";
import Logo from "../../../assets/logo.png";
import BorderLine from "../../Common/BorderLine/BorderLine";
import Button from "../../Common/Button/Button";
import Input from "../../Common/Input/Input";
import LinkTo from "../../Common/LinkTo/LinkTo";
import URL from "../../Common/URL/URL";
import GooglePlayImg from "../../../assets/GooglePlay.png";
import AppStoreImg from "../../../assets/AppStore.png";

console.log(process.env.hello);

const LoginCard = () => {
  return (
    <div>
      <div className="login-card-container">
        <div className="heading-logo">
          <img className="heading-logo-image" src={Logo} alt="Heading logo" />
        </div>
        <form className="login-form">
          <Input
            type={"text"}
            placeholder={"Phone number, username and email"}
          />
          <Input type={"password"} placeholder={"Password"} />
          <Button text={"Log In"} />
          <div className="divider">
            <BorderLine />
            <span className="uppercase">or</span>
            <BorderLine />
          </div>
          <Button type={"googleLogin"} />
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
        <URL
          img={AppStoreImg}
          url={
            "https://itunes.apple.com/app/instagram/id389801252?pt=428156&ct=igweb.loginPage.badge&mt=8&vt=lo"
          }
        />
        <URL
          img={GooglePlayImg}
          url={
            "https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D1D0B799E-0FC5-4CF1-B766-40D3A8FBC120%26utm_content%3Dlo%26utm_medium%3Dbadge"
          }
        />
      </div>
    </div>
  );
};

export default LoginCard;
