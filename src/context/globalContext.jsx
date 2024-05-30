import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [email, setEmail] = useState("" || localStorage.getItem("VBemail"));
  const [token, setToken] = useState("" || localStorage.getItem("VBtoken"));
  return (
    <GlobalContext.Provider value={{ email, setEmail, token, setToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
