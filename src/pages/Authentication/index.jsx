import React from "react";
import classNames from "./authentication.module.scss";

//assets
import loginBackground from "../../assets/images/Login/loginbackground.webp";

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
  return <div className={classNames.login}></div>;
};
