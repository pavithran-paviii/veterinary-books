import { BiSolidDashboard } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTruckRampBox, FaRegMoneyBill1 } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { FaBriefcaseMedical } from "react-icons/fa";

export const dashboardItems = [
  { name: "Dashboard", icon: <BiSolidDashboard /> },
  { name: "Inventory", icon: <FaTruckRampBox /> },
  { name: "Billing", icon: <FaRegMoneyBill1 /> },
  { name: "Case", icon: <FaBriefcaseMedical /> },
  { name: "Clients", icon: <BsFillPeopleFill /> },
  { name: "Pets", icon: <MdOutlinePets /> },
  { name: "Records", icon: <IoBookSharp /> },
  { name: "Bills", icon: <GiMoneyStack /> },
];

export const settingsNavigations = [
  "General",
  "Constant",
  "Subscription",
  "Support",
];
