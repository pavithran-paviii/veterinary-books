import React, { useState } from "react";
import classNames from "./authentication.module.scss";

//assets
import loginBackground from "../../assets/images/Login/loginbackground.webp";
import CustomInput, {
  CustomButton,
  CustomCheckbox,
} from "../../components/Custom";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Authentication = () => {
  return (
    <section className={classNames.landing}>
      <div className={classNames.wrapper}>
        <div className={classNames.leftContainer}>
          <Login />
        </div>
        <div className={classNames.rightContainer}>
          <img src={loginBackground} alt="loginBackground" />
        </div>
      </div>
    </section>
  );
};

export default Authentication;

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({});

  return (
    <div className={classNames.login}>
      <div className={classNames.title}>Sign In</div>
      <h3>
        <span>Create an account</span>
        or enter your credentials
      </h3>
      <div className={classNames.credentialsContainer}>
        <CustomInput
          title="Email"
          placeHolder="enter a email"
          name="email"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
        <CustomInput
          title="Password"
          placeHolder="enter a password"
          name="password"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
        <div className={classNames.flexContainer}>
          <CustomCheckbox
            title="Remember me"
            name="isPasswordRemember"
            stateValue={userCredentials}
            setState={setUserCredentials}
          />
          <Link to="#">Forgot password?</Link>
        </div>
      </div>
      <CustomButton buttonText="Sign In" bg="black" color="white" />
      <div className={classNames.divider}>
        <span>OR</span>
      </div>
      <CustomButton buttonText="Sign In with Google" svg={FcGoogle} />
    </div>
  );
};
