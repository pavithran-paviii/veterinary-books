import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [email, setEmail] = useState("" || localStorage.getItem("VBemail"));
  const [token, setToken] = useState("" || localStorage.getItem("VBtoken"));
  const [userDetails, setUserDetails] = useState({});

  //renderings

  useEffect(() => {
    if (token || localStorage.getItem("VBtoken")) {
      setUserDetails(jwtDecode(token || localStorage.getItem("VBtoken")));
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ email, setEmail, token, setToken, userDetails, setUserDetails }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
