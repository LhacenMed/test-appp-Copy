import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the Theme Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Default values for the context
const defaultContextValues: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {}, // This will be implemented later
};

// Create the Context
const ThemeContext = createContext<ThemeContextType>(defaultContextValues);

// Create the ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);
