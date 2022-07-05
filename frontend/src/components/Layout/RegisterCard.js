import React from "react";
import Logo from "../../assets/logo.png";
import GoogleLoginButton from "../Common/GoogleLoginButton";
import Divider from "../Common/Divider";
import { useFormik } from "formik";
import Input from "../Common/Input";
import Button from "../Common/Button";
import LinkTo from "../Common/LinkTo";

const RegisterCard = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <div className="register-card ">
        <img className="heading-logo-image" src={Logo} alt="Heading logo" />
        <h3 className="text-size-large font-bold color-dark-gray">
          Sign up to see photos and videos from your friends.
        </h3>
        <GoogleLoginButton />
        <Divider />
        <form className="register-card-form">
          <Input
            type={"email"}
            name={"email"}
            placeholder={"Mobile Number or Email"}
            formik={formik}
          />
          <Input
            type={"text"}
            name={"name"}
            placeholder={"Full Name"}
            formik={formik}
          />
          <Input
            type={"text"}
            name={"username"}
            placeholder={"Username"}
            formik={formik}
          />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            formik={formik}
          />
          <Input
            type={"password"}
            name={"confirmPassword"}
            placeholder={"Confirm Password"}
            formik={formik}
          />
          <h6 className="font-medium text-size-small color-dark-gray">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="font-bold color-dark-gray ">Learn More</span>
          </h6>
          <h6 className="font-medium text-size-small color-dark-gray mld-lg ">
            By signing up, you agree to our{" "}
            <span className="font-bold color-dark-gray ">
              Terms, Data Policy
            </span>{" "}
            and{" "}
            <span className="font-bold color-dark-gray">Cookies Policy .</span>
          </h6>

          <Button type={"submit"} text={"Sign Up"} />
        </form>
      </div>
      <div className="register-card-login white-color">
        <p>Have an account? </p>
        <LinkTo linkTo={"/login"}>
          <span className="text-size-medium ml-lg color-blue font-bold">
            Log In
          </span>
        </LinkTo>
      </div>
    </>
  );
};

export default RegisterCard;
