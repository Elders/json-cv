"use client";
import { createContext, useState } from "react";

export const CVContext = createContext(null);

export default function ContextProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <CVContext.Provider value={{ data, setData }}>
      {children}
    </CVContext.Provider>
  );
}
