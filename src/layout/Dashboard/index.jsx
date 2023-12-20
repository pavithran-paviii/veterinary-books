import React, { useContext, useState } from "react";
import classNames from "./dashboardLayout.module.scss";

//assets
import logoWhite from "../../assets/images/veterinarylogowhite.svg";
import { dashboardItems } from "../../assets/data/mapItems";
import { IoIosSettings } from "react-icons/io";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const DashboardLayout = ({ child }) => {
  const { email } = useContext(GlobalContext);
  const [selectedSidebar, setSelectedSidebar] = useState("Dashboard");

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
                  eachItem?.name === selectedSidebar
                    ? classNames.selectedItem
                    : ""
                }`}
                key={eachItem?.name + index}
                onClick={() => {
                  setSelectedSidebar(eachItem?.name);
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
        </div>
      </div>
      <div className={classNames.rightLayout}>{child}</div>
    </section>
  );
};

export default DashboardLayout;
