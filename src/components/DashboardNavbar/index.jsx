import React, { useState, useContext } from "react";
import classNames from "./dashboardnavbar.module.scss";
import { useTheme } from "../../context/ThemeContext";
import { GlobalContext } from "../../context/globalContext";

//assets
import { LiaSearchSolid } from "react-icons/lia";
import { IoMdNotifications } from "react-icons/io";

const DashboardNavbar = () => {
  const { theme } = useTheme();
  const { userDetails, setSearchQuery } = useContext(GlobalContext);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div
      className={classNames.dashboardNav}
      style={{ background: theme === "dark" ? "var(--secondary-color)" : "" }}
    >
      <div
        className={`${classNames.searchContainer} ${
          searchOpen && classNames.containerOpen
        }`}
      >
        <LiaSearchSolid
          onClick={() => {
            setSearchOpen((prev) => !prev);
          }}
        />
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <div className={classNames.settingsContainer}>
        <IoMdNotifications />
        <div className={classNames.profileImage}>
          {userDetails?.username
            ? userDetails?.username?.charAt(0)?.toUpperCase()
            : "V"}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
