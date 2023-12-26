import React, { useContext, useState } from "react";
import classNames from "./dashboardLayout.module.scss";

//assets
import logoWhite from "../../assets/images/veterinarylogowhite.svg";
import { dashboardItems } from "../../assets/data/mapItems";
import { IoIosSettings } from "react-icons/io";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import { IoLogOut } from "react-icons/io5";
import { logoutFunc } from "../../assets/functions";

const DashboardLayout = ({ child }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = useContext(GlobalContext);

  //functions
  function logoutFunc() {
    localStorage.clear();
    navigate("/");
  }

  if (!email) {
    return <Navigate to="/signin" />;
  }
  return (
    <section className={classNames.dashboardLayout}>
      <div className={classNames.leftSidebar}>
        <div className={classNames.logo}>
          <img src={logoWhite} alt="logoWhite" />
        </div>
        <div className={classNames.dashItems}>
          {dashboardItems?.map((eachItem, index) => {
            return (
              <div
                className={`${classNames.sidebarItem} ${
                  location?.pathname?.includes(eachItem?.name?.toLowerCase())
                    ? classNames.selectedItem
                    : ""
                }`}
                key={eachItem?.name + index}
                onClick={() => {
                  navigate(`/${eachItem?.name?.toLowerCase()}`);
                }}
              >
                {eachItem.icon}
                <span>{eachItem?.name}</span>
              </div>
            );
          })}
          <div className={`${classNames.sidebarItem} ${classNames.otherItems}`}>
            <IoIosSettings />
            Settings
          </div>
          <div
            className={`${classNames.sidebarItem} ${classNames.logoutBtn}`}
            onClick={logoutFunc}
          >
            <IoLogOut />
            Logout
          </div>
        </div>
      </div>
      <div className={classNames.rightLayout}>{child}</div>
    </section>
  );
};

export default DashboardLayout;
