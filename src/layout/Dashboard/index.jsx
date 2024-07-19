import React, { useContext } from "react";
import classNames from "./dashboardLayout.module.scss";

//assets
import logoWhite from "../../assets/images/veterinarylogowhite.svg";
import { dashboardItems } from "../../assets/data/mapItems";
import { IoIosSettings } from "react-icons/io";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";
import { IoLogOut } from "react-icons/io5";
import useWindowSize from "../../hooks/useWindowSize";
import { MaterialUISwitch } from "../../components/MUI";
import { useTheme } from "../../context/ThemeContext";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { capitalizeFirstLetter } from "../../assets/functions";

const DashboardLayout = ({ child }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userDetails } = useContext(GlobalContext);
  const { height } = useWindowSize();
  const { theme, toggleTheme } = useTheme();

  //functions

  function logoutFunc() {
    localStorage.clear();
    navigate("/");
  }

  const handleModeChange = (event) => {
    toggleTheme();
  };

  if (!email) {
    return <Navigate to="/signin" />;
  }
  return (
    <section
      className={classNames.dashboardLayout}
      style={{ background: theme === "dark" ? "var(--primary-color)" : "" }}
    >
      <div className={classNames.leftSidebar}>
        <div className={classNames.dashItems}>
          <div className={classNames.welcomeTitle}>
            <div>Welcome back,</div>
            <div>
              {userDetails?.username &&
                capitalizeFirstLetter(userDetails?.username) + "!"}
            </div>
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
                  <span>{eachItem.icon}</span>
                  <span>{eachItem?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classNames.settingsMenu}>
          <div
            className={`${classNames.sidebarItem} ${classNames.otherItems} ${
              location?.pathname?.includes("settings")
                ? classNames.selectedItem
                : ""
            }`}
            onClick={() => {
              navigate(`/settings`);
            }}
          >
            <span>
              <IoIosSettings />
            </span>
            Settings
          </div>
          <div
            className={`${classNames.sidebarItem} ${classNames.logoutBtn}`}
            onClick={logoutFunc}
          >
            <span>
              <IoLogOut />
            </span>
            Logout
          </div>
          {height > 700 && height > 500 && (
            // <MaterialUISwitch
            //   sx={{ width: 60, margin: "0 auto" }}
            //   checked={theme === "dark" ? true : false}
            //   onChange={handleModeChange}
            // />
            <div
              className={classNames.UISwitch}
              style={{ marginBottom: height > 900 ? "2rem" : "0" }}
              onClick={handleModeChange}
            >
              {theme === "dark" ? (
                <>
                  <span>Dark Theme</span>
                  <FaRegMoon />
                </>
              ) : (
                <>
                  <span>Light Theme</span>
                  <FiSun />
                </>
              )}
            </div>
          )}
          {height > 900 && (
            <div className={classNames.needHelp}>
              <div className={classNames.title}>Need help?</div>
              <div className={classNames.desc}>
                Wanted new features or having trouble?
              </div>
              <div className={classNames.submitBtn}>Write us here</div>
            </div>
          )}
        </div>
      </div>
      <div className={classNames.rightLayout}>{child}</div>
    </section>
  );
};

export default DashboardLayout;
