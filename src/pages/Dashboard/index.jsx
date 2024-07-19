import React, { useContext, useEffect } from "react";
import classNames from "./dashboard.module.scss";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";

const Dashboard = () => {
  const { token } = useContext(GlobalContext);

  //functions

  async function getDashboard() {
    try {
      let response = await axios.get(BACKENDURL + "/inventory/getbills", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response, "Get dashboard stats response");
    } catch (error) {
      console.log(error?.message, "Get dashboard stats error");
    }
  }

  //renderings

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div className={classNames.dashboard}>
      <div className={classNames.header}>
        <div className={classNames.title}>Revenue</div>
        <div className={classNames.value}></div>
      </div>
    </div>
  );
};

export default Dashboard;
