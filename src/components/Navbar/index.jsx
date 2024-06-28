import React, { useState } from "react";
import classNames from "./navbar.module.scss";

//assets
// import fullLogo from "../../assets/images/Veterinary.svg";
import { ReactComponent as FullLogo } from "../../assets/images/fullLogo.svg";

const Navbar = ({ isAppearing }) => {
  const [selectedNavigation, setSelectedNavigation] = useState("Work");

  return (
    <div
      className={classNames.navbar}
      style={{ top: isAppearing ? "" : "-100px" }}
    >
      <div className={classNames.wrapper}>
        <div className={classNames.logo}>
          {/* <img src={fullLogo} alt="fullLogo" /> */}
          <FullLogo />
        </div>
        <div className={classNames.navigations}>
          <div>
            <button
              className={
                selectedNavigation === "Work"
                  ? classNames.selectedNavigation
                  : ""
              }
              onClick={(event) =>
                setSelectedNavigation(event?.target?.innerText)
              }
            >
              Work
            </button>
            <button
              className={
                selectedNavigation === "Services"
                  ? classNames.selectedNavigation
                  : ""
              }
              onClick={(event) =>
                setSelectedNavigation(event?.target?.innerText)
              }
            >
              Services
            </button>
            <button
              className={
                selectedNavigation === "Blogs"
                  ? classNames.selectedNavigation
                  : ""
              }
              onClick={(event) =>
                setSelectedNavigation(event?.target?.innerText)
              }
            >
              Blogs
            </button>
          </div>
          <div>
            <button>Sign In/Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
