import React, { useState } from "react";
import classNames from "./authentication.module.scss";

//assets
import loginBackground from "../../assets/images/Login/loginbackground.webp";
import CustomInput, {
  CustomButton,
  CustomCheckbox,
  CustomDropdown,
  Toastify,
} from "../../components/Custom";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";

const Authentication = ({ child }) => {
  return (
    <section className={classNames.landing}>
      <div className={classNames.wrapper}>
        <div className={classNames.leftContainer}>{child}</div>
        <div className={classNames.rightContainer}>
          <img src={loginBackground} alt="loginBackground" />
        </div>
      </div>
    </section>
  );
};

export default Authentication;

export const Login = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({});

  function loginUser() {
    axios
      .post(BACKENDURL + "/user/signin", userCredentials)
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "error");
          localStorage.setItem("VBemail", userCredentials?.email);
          localStorage.setItem(
            "VBrememberme",
            userCredentials?.isPasswordRemember
          );
          // navigate("/dashboard");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "Login user response");
      })
      .catch((error) => {
        console.log(error?.message, "Login user error");
      });
  }

  return (
    <div className={classNames.login}>
      <div className={classNames.title}>Sign In</div>
      <h3>
        <span
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create an account
        </span>
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
          type="password"
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
      <CustomButton
        buttonText="Sign In"
        bg="black"
        color="white"
        func={loginUser}
      />
      <div className={classNames.divider}>
        <span>OR</span>
      </div>
      <CustomButton buttonText="Sign In with Google" svg={<FcGoogle />} />
    </div>
  );
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({});

  function createUser() {
    if (userCredentials?.password !== userCredentials?.confirmPassword) {
      Toastify("Password doesn't match!", "error");
    }

    // console.log(userCredentials, "create user credentials");
    delete userCredentials.confirmPassword;
    axios
      .post(BACKENDURL + "/user/signup", userCredentials)
      .then((response) => {
        if (response?.data?.status) {
          Toastify(response?.data?.message, "error");
          localStorage.setItem("VBemail", userCredentials?.email);
          navigate("/dashboard");
        } else {
          Toastify(response?.data?.message, "error");
        }
        console.log(response, "create user response");
      })
      .catch((error) => {
        console.log(error?.message, "create user error");
      });
  }

  return (
    <div className={classNames.login}>
      <div className={classNames.title}>Sign Up</div>
      <h3>Create an new account</h3>
      <div className={classNames.credentialsContainer}>
        <CustomInput
          title="Email"
          placeHolder="enter a email"
          name="email"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
        <CustomInput
          title="Username"
          placeHolder="enter a username"
          name="username"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
        <CustomDropdown
          dropdown={["Docter", "Client"]}
          name="role"
          title="Select role"
          stateValue={userCredentials}
          setState={setUserCredentials}
          topTitle="true"
          type="single"
        />
        <CustomInput
          title="Password"
          placeHolder="enter a password"
          name="password"
          type="password"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
        <CustomInput
          title="Confirm Password"
          placeHolder="enter a password"
          name="confirmPassword"
          type="password"
          stateValue={userCredentials}
          setState={setUserCredentials}
        />
      </div>
      <CustomButton
        buttonText="Sign Up"
        bg="black"
        color="white"
        func={createUser}
      />
    </div>
  );
};
