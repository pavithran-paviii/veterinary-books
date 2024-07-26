import axios from "axios";
import { BACKENDURL } from "../data/constant";

export async function isLoginValid() {
  try {
    let response = await axios.get(BACKENDURL + "/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("VBtoken")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response, "Is login valid response");
    if (response?.data?.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error?.message, "Is login valid error!");
  }
}

export function capitalizeFirstLetter(word) {
  if (!word) return word; // Handle empty strings or null
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function filterByDateRange(dataArray, startDate, endDate) {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate
    ? new Date(new Date(endDate).setHours(23, 59, 59, 999))
    : null;

  return dataArray.filter((item) => {
    const createdAtDate = new Date(item.createdAt);
    if (start && end) {
      return createdAtDate >= start && createdAtDate <= end;
    } else if (start) {
      return createdAtDate >= start;
    } else if (end) {
      return createdAtDate <= end;
    }
    return true;
  });
}
