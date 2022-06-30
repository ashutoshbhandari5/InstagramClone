import React from "react";
import Logo from "../../assets/logo.png";
import GoogleLoginButton from "../Common/GoogleLoginButton";
import Divider from "../Common/Divider";
import { useFormik } from "formik";
import Input from "../Common/Input";

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
    <div className="register-card">
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
          People who use our service may have uploaded your contact information
          to Instagram.{" "}
          <span className="font-bold color-dark-gray ">Learn More</span>
        </h6>
      </form>
    </div>
  );
};

export default RegisterCard;
