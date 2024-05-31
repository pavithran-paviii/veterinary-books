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
