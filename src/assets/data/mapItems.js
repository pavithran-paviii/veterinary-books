import { BiSolidDashboard } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaTruckRampBox } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";

export const dashboardItems = [
  { name: "Dashboard", icon: <BiSolidDashboard /> },
  { name: "Inventory", icon: <FaTruckRampBox /> },
  { name: "Clients", icon: <BsFillPeopleFill /> },
  { name: "Pets", icon: <MdOutlinePets /> },
  { name: "Records", icon: <IoBookSharp /> },
];
