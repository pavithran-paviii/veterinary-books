import React, { useState } from "react";
import classNames from "./navbar.module.scss";

//assets
import fullLogo from "../../assets/images/fullLogo.png";
import { ReactComponent as FullLogo } from "../../assets/images/fullLogo.svg";

const Navbar = () => {
  const [selectedNavigation, setSelectedNavigation] = useState("Work");

  return (
    <div className={classNames.navbar}>
      <div className={classNames.logo}>
        <img src={fullLogo} alt="fullLogo" />
      </div>
      <div className={classNames.navigations}>
        <div>
          <button
            className={
              selectedNavigation === "Work" ? classNames.selectedNavigation : ""
            }
            onClick={(event) => setSelectedNavigation(event?.target?.innerText)}
          >
            Work
          </button>
          <button
            className={
              selectedNavigation === "Services"
                ? classNames.selectedNavigation
                : ""
            }
            onClick={(event) => setSelectedNavigation(event?.target?.innerText)}
          >
            Services
          </button>
        </div>
        <div>
          <button>Sign In/Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
