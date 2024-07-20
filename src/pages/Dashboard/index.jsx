import React, { useContext, useEffect, useState } from "react";
import classNames from "./dashboard.module.scss";
import axios from "axios";
import { BACKENDURL } from "../../assets/data/constant";
import { GlobalContext } from "../../context/globalContext";
import { CustomSelectOne } from "../../components/Custom";

const Dashboard = () => {
  const { token } = useContext(GlobalContext);
  const [selectedDashboard, setSelectedDashboard] = useState({
    dashItem: "Financial",
  });
  const [dashboardStats, setDashboardStats] = useState({});

  //functions

  async function getDashboard() {
    try {
      let response = await axios.get(BACKENDURL + "/inventory/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response?.data?.status) {
        setDashboardStats(response?.data?.data);
      }
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
        <div>
          <div className={classNames.title}>Revenue</div>
          <div className={classNames.value}>
            ₹{" "}
            {dashboardStats?.totalSales
              ? Number(dashboardStats?.totalSales)?.toFixed(2)
              : "0.00"}
          </div>
        </div>
        <CustomSelectOne
          stateValue={selectedDashboard}
          setState={setSelectedDashboard}
          name="dashItem"
          allOptions={[
            { name: "Financial" },
            { name: "Inventory" },
            { name: "Pets" },
            { name: "Clients" },
          ]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
