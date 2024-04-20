import React, { useState } from "react";
import { createContext } from "react";

export const authContext = createContext([]);

export function AuthProvider(props) {
  const [user, setUser] = useState()
  
  return (
    <authContext.Provider value={[user, setUser]}>
      {props.children}
    </authContext.Provider>
  );
}
